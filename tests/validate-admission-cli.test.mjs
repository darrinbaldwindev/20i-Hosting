import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../tools/validate-admission.mjs', import.meta.url));
const payload = Buffer.from('20i offline CLI regression fixture');
const hash = createHash('sha256').update(payload).digest('hex');
const gates = [
  'source_custody', 'source_currentness', 'dependency_review',
  'platform_compatibility', 'bootstrap', 'configuration_secrets',
  'rewrites_https', 'asset_licences', 'reproducible_build',
  'fresh_backup', 'rollback_rehearsal', 'independent_smoke',
  'independent_review', 'provider_target', 'private_access_control',
  'zero_or_approved_charge'
];

function manifest() {
  return {
    contract: 'READY_TO_UPLOAD_20I/v1',
    site: 'test-only',
    repository: 'https://github.com/example/source',
    source_commit_sha: 'a'.repeat(40),
    artifact_sha256: hash,
    target_environment: 'staging',
    provider_target_id: 'test-only-redacted',
    provider_region: 'fixture',
    package_type: 'test-static',
    rollback_artifact_sha256: hash,
    verified_by: 'test-only-verifier',
    verified_at_utc: '2026-11-18T09:30:00Z',
    result: 'BLOCKED',
    unknowns: [],
    evidence: Object.fromEntries(gates.map(gate => [gate, {
      state: 'PASS',
      reference: 'test-only-fixture',
      verifier: 'test-only-verifier',
      checked_at_utc: '2026-11-18T09:30:00Z'
    }]))
  };
}

function runCli(...args) {
  const proc = spawnSync(process.execPath, [cli, ...args], {
    encoding: 'utf8', timeout: 15000, maxBuffer: 1024 * 1024
  });
  assert.equal(proc.error, undefined, String(proc.error));
  return proc;
}

function inScratch(testBody) {
  const dir = mkdtempSync(join(tmpdir(), '20i-admission-cli-'));
  try {
    const manifestPath = join(dir, 'manifest.json');
    const artifactPath = join(dir, 'artifact.zip');
    writeFileSync(manifestPath, JSON.stringify(manifest()));
    writeFileSync(artifactPath, payload);
    return testBody({ dir, manifestPath, artifactPath });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('CLI rejects missing arguments with nonzero exit', () => {
  const proc = runCli();
  assert.equal(proc.status, 2);
  assert.match(proc.stderr, /usage:/i);
});

test('CLI fails closed on invalid JSON without exposing file bytes', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    writeFileSync(manifestPath, '{ invalid');
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert.match(out.errors.join(','), /INPUT_UNREADABLE_OR_INVALID/);
  })
);

test('CLI rejects missing artifact with exit two', () =>
  inScratch(({ manifestPath, dir }) => {
    const proc = runCli(manifestPath, join(dir, 'missing.zip'));
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
  })
);

test('CLI detects artifact digest mismatch with exit two', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    writeFileSync(artifactPath, Buffer.from('tampered'));
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('ARTIFACT_HASH_MISMATCH'));
  })
);

test('CLI exits zero on complete fixture but never grants upload authority', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 0);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'PRECHECK_COMPLETE_NOT_AUTHORIZED');
    assert.equal(out.upload_authorized, false);
    assert.deepEqual(out.errors, []);
  })
);
