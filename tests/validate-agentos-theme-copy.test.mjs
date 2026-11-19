import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditTheme } from '../tools/validate-agentos-theme-copy.mjs';

const script = fileURLToPath(new URL('../tools/validate-agentos-theme-copy.mjs', import.meta.url));
function fixture(fn) {
  const dir = mkdtempSync(join(tmpdir(), '20i-agentos-claims-'));
  try {
    for (const name of ['style.css','functions.php','front-page.php','index.php']) {
      writeFileSync(join(dir,name), name === 'style.css' ? 'Theme Name: Candidate' : '<?php // This is a nonpublic staging draft');
    }
    return fn(dir);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
function checked(text, code) {
  return fixture(dir => {
    writeFileSync(join(dir, 'front-page.php'), '<?php // staging draft\n' + text + '\n');
    const output = auditTheme(dir);
    assert.equal(output.result, 'BLOCKED', JSON.stringify(output));
    assert.equal(output.publish_authorized, false);
    assert.equal(output.upload_authorized, false);
    assert(output.errors.some(x => x.includes(code)), JSON.stringify(output));
  });
}

test('no source directory is BLOCKED', () => {
  assert.equal(auditTheme(null).result, 'BLOCKED');
});
test('nonexistent directory is BLOCKED', () => {
  assert.equal(auditTheme('/path/which/never/existed/agentos-theme').result, 'BLOCKED');
});
test('minimal source is scan complete but never accepted or authorized', () => fixture(dir => {
  const r = auditTheme(dir);
  assert.equal(r.result, 'COPY_SCAN_COMPLETE_NOT_ACCEPTED', JSON.stringify(r));
  assert.equal(r.upload_authorized, false);
  assert.equal(r.publish_authorized, false);
}));
test('missing WordPress entry file blocks', () => fixture(dir => {
  rmSync(join(dir, 'functions.php'));
  const r = auditTheme(dir);
  assert.equal(r.result, 'BLOCKED');
  assert(r.errors.includes('WORDPRESS_THEME_FILE_MISSING:functions.php'));
}));
test('obsolete Pro-required monthly add-on claims block', () => checked(
  'Subscription requires Pro and is an add-on to annual membership.', 'SUPERSEDED_ADDON'
));
test('historical Co-worker and Operator pricing blocks', () => checked(
  'Co-worker $39 and Operator tier are available.', 'SUPERSEDED_TIER'
));
test('superseded monetary offer blocks', () => checked(
  'Pay $49 for the Standard plan.', 'SUPERSEDED_PRICE'
));
test('unapproved trial promise blocks', () => checked(
  'Start your 30-day free trial today.', 'UNAPPROVED_TRIAL'
));
test('live/certification product claims block', () => checked(
  'AgentOS is production-ready and independently certified.', 'UNVERIFIED_LIVE'
));
test('approved USD tiers still require copy/tax review before publication', () => checked(
  'Pro US$99/year, Subscription US$22/month', 'UNAPPROVED_PRICE_PRESENTATION'
));
test('active signup and checkout forms block', () => checked(
  '<form method="POST" action="/signup">', 'ACTIVE_PAYMENT_OR_SIGNUP'
));
test('approved project-count information can be drafted without implying release', () => fixture(dir => {
  writeFileSync(join(dir,'front-page.php'), '<?php // Free has three project slots; Pro has 25, Subscription has 100. In development.');
  const r = auditTheme(dir);
  assert.equal(r.result, 'COPY_SCAN_COMPLETE_NOT_ACCEPTED', JSON.stringify(r));
  assert.equal(r.publish_authorized, false);
}));
test('invalid UTF-8 in a template blocks', () => fixture(dir => {
  writeFileSync(join(dir,'front-page.php'), Buffer.from([0xff,0xff]));
  const r = auditTheme(dir);
  assert(r.errors.includes('SOURCE_INVALID_UTF8:front-page.php'));
  assert.equal(r.result, 'BLOCKED');
}));
test('nested symlink source is blocked', { skip: process.platform === 'win32' }, () => fixture(dir => {
  const nested = join(dir,'assets');
  mkdirSync(nested);
  symlinkSync(join(dir,'front-page.php'),join(nested,'symlink.php'));
  const r=auditTheme(dir);
  assert.equal(r.result,'BLOCKED');
  assert(r.errors.includes('SYMLINK_FORBIDDEN:assets/symlink.php'));
}));
test('non-source binary assets are not interpreted as marketing copy', () => fixture(dir => {
  mkdirSync(join(dir,'assets'));
  writeFileSync(join(dir,'assets','logo.png'),Buffer.from([0xff,0x00]));
  const r=auditTheme(dir);
  assert.equal(r.result,'COPY_SCAN_COMPLETE_NOT_ACCEPTED');
}));
test('CLI without source exits 2 with structured blocked status', () => {
  const p=spawnSync(process.execPath,[script],{encoding:'utf8'});
  assert.equal(p.status,2);
  const r=JSON.parse(p.stdout);
  assert.equal(r.result,'BLOCKED');
  assert.equal(r.upload_authorized,false);
});
test('CLI with safe fixture exits 0 yet never authorizes upload', () => fixture(dir => {
  const p=spawnSync(process.execPath,[script,dir],{encoding:'utf8'});
  assert.equal(p.status,0,p.stderr+p.stdout);
  const r=JSON.parse(p.stdout);
  assert.equal(r.result,'COPY_SCAN_COMPLETE_NOT_ACCEPTED');
  assert.equal(r.upload_authorized,false);
  assert.equal(r.publish_authorized,false);
}));
