import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync, symlinkSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readLocalExport, summarizePackageExport } from '../tools/summarize-my20i-packages.mjs';

const SCRIPT = fileURLToPath(new URL('../tools/summarize-my20i-packages.mjs', import.meta.url));
const row = (id=12, overrides={}) => ({
  id, created: '2026-01-10T00:00:00+00:00',
  enabled: true, name: 'myprivate.example',
  names: ['myprivate.example', 'private-alias.example'],
  packageTypeName: 'Linux Unlimited',
  stackUsers: ['stack-user:98765'],
  packageLabels: ['PRIVATE ACCOUNT LABEL'],
  ...overrides
});
function temp(fn) {
  const dir = mkdtempSync(join(tmpdir(), '20i-private-export-'));
  try { return fn(join(dir, 'private-input.json'), dir); }
  finally { rmSync(dir, {recursive:true,force:true}); }
}
function expectBlocked(item, code) {
  assert.equal(item.result, 'BLOCKED');
  assert(item.errors.includes(code), JSON.stringify(item));
  assert.equal(item.provider_authenticated, false);
  assert.equal(item.provider_verified, false);
  assert.equal(item.upload_authorized, false);
  assert.equal(item.provider_mutation, false);
}
function assertRedacted(out) {
  const str = JSON.stringify(out);
  for (const value of ['myprivate.example','private-alias.example','stack-user:98765','PRIVATE ACCOUNT LABEL']) {
    assert(!str.includes(value), 'private identifier leaked');
  }
}

test('official documented package-row shape produces private offline counts only', () => {
  const result = summarizePackageExport([row(12), row(13,{enabled:false,packageTypeName:'WordPress Hosting'})]);
  assert.equal(result.result,'LOCAL_PACKAGE_SUMMARY_NOT_PROVIDER_VERIFIED');
  assert.equal(result.package_count,2);
  assert.equal(result.enabled_count,1);
  assert.equal(result.disabled_count,1);
  assert.equal(result.total_domain_entries,4);
  assert.equal(result.type_categories.Linux.total,1);
  assert.equal(result.type_categories.WordPress.disabled,1);
  assert.equal(result.provider_verified,false);
  assert.equal(result.wordpress_installations_verified,false);
  assert.equal(result.account_capacity_verified,false);
  assert.equal(result.upload_authorized,false);
  assertRedacted(result);
});
test('empty package list remains non-authorizing and explicitly unverified', () => {
  const result=summarizePackageExport([]);
  assert.equal(result.package_count,0);
  assert.equal(result.provider_authenticated,false);
  assert.equal(result.staging_target_verified,false);
  assert.equal(result.charges_verified,false);
});
test('unexpected API object response is blocked', () =>
  expectBlocked(summarizePackageExport({result:[row()]}),'PACKAGE_RESPONSE_NOT_ARRAY'));
test('malformed package row blocks without dumping input', () =>
  expectBlocked(summarizePackageExport([{secret:'never-log-me'}]),'PACKAGE_ID_INVALID'));
test('duplicate package IDs block instead of double-counting', () =>
  expectBlocked(summarizePackageExport([row(12),row(12)]),'DUPLICATE_PACKAGE_ID'));
test('non-integer package ID blocks', () =>
  expectBlocked(summarizePackageExport([row('12')]),'PACKAGE_ID_INVALID'));
test('invalid enabled flag blocks', () =>
  expectBlocked(summarizePackageExport([row(12,{enabled:'true'})]),'PACKAGE_ENABLED_INVALID'));
test('missing package type blocks', () =>
  expectBlocked(summarizePackageExport([row(12,{packageTypeName:null})]),'PACKAGE_TYPE_INVALID'));
test('missing domains array blocks', () =>
  expectBlocked(summarizePackageExport([row(12,{names:undefined})]),'PACKAGE_DOMAINS_SHAPE_INVALID'));
test('malformed user array blocks without user identifiers', () =>
  expectBlocked(summarizePackageExport([row(12,{stackUsers:89})]),'PACKAGE_USERS_SHAPE_INVALID'));
test('unknown category cannot surface custom private type label', () => {
  const result=summarizePackageExport([row(12,{packageTypeName:'PRIVATE CUSTOM CATEGORY SECRET'})]);
  assert.equal(result.type_categories.Other.total,1);
  assert(!JSON.stringify(result).includes('PRIVATE CUSTOM CATEGORY SECRET'));
});
test('local CLI summarizes synthetic package export without private identifiers', () => temp(file => {
  writeFileSync(file,JSON.stringify([row()]));
  const p=spawnSync(process.execPath,[SCRIPT,file],{encoding:'utf8'});
  assert.equal(p.status,0,p.stderr+p.stdout);
  const out=JSON.parse(p.stdout);
  assert.equal(out.package_count,1);
  assertRedacted(out);
}));
test('CLI absent file exits 2 and never dumps the private path', () => temp((file) => {
  const p=spawnSync(process.execPath,[SCRIPT,file],{encoding:'utf8'});
  assert.equal(p.status,2);
  const out=JSON.parse(p.stdout);
  expectBlocked(out,'INPUT_UNREADABLE_OR_CHANGED');
  assert(!p.stdout.includes(file));
}));
test('CLI wrong argument count exits 2 with usage', () => {
  const p=spawnSync(process.execPath,[SCRIPT],{encoding:'utf8'});
  assert.equal(p.status,2);
  expectBlocked(JSON.parse(p.stdout),'CLI_ARGUMENTS_INVALID');
  assert.match(p.stderr,/usage:/i);
});
test('extra CLI arguments are not treated as a successful scan', () => temp((file) => {
  writeFileSync(file,JSON.stringify([row()]));
  const p=spawnSync(process.execPath,[SCRIPT,file,'extra'],{encoding:'utf8'});
  assert.equal(p.status,2);
  expectBlocked(JSON.parse(p.stdout),'CLI_ARGUMENTS_INVALID');
}));
test('source directory instead of response file blocked', () => temp((_file,dir) =>
  expectBlocked(readLocalExport(dir),'INPUT_NOT_REGULAR_FILE')));
test('invalid JSON blocked with no source echoes', () => temp(file => {
  writeFileSync(file,'{ "private": "TOKEN-SECRET", BAD JSON');
  const result=readLocalExport(file);
  expectBlocked(result,'INPUT_INVALID_JSON');
  assert(!JSON.stringify(result).includes('TOKEN-SECRET'));
}));
test('invalid UTF-8 bytes blocked with no replacement', () => temp(file => {
  writeFileSync(file,Buffer.from([0xff,0xc0,0xaf]));
  expectBlocked(readLocalExport(file),'INPUT_INVALID_UTF8');
}));
test('input larger than 2 MiB blocked before processing', () => temp(file => {
  writeFileSync(file,Buffer.alloc(2*1024*1024+1,0x20));
  expectBlocked(readLocalExport(file),'INPUT_TOO_LARGE');
}));
test('symbolic link to private export blocked rather than followed',
 {skip:process.platform==='win32'}, () => temp((file,dir) => {
  const data=join(dir,'data.json');
  writeFileSync(data,JSON.stringify([row()]));
  symlinkSync(data,file);
  expectBlocked(readLocalExport(file),'INPUT_NOT_REGULAR_FILE');
}));
test('twenty-I schema cannot prove WordPress install count, quotas or region', () => {
  const r=summarizePackageExport([row()]);
  assert.equal(r.wordpress_installations_verified,false);
  assert.equal(r.account_capacity_verified,false);
  assert.equal(r.staging_target_verified,false);
  assert.equal(r.private_access_verified,false);
  assert.equal(r.rollback_verified,false);
});

test('RED: package with empty domain list is schema drift, not zero actual domains', () =>
  expectBlocked(summarizePackageExport([row(12,{names:[]})]),'PACKAGE_DOMAINS_SHAPE_INVALID'));
