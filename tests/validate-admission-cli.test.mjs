import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
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

test('RED: artifact symlink is rejected even with matching bytes', { skip: process.platform === 'win32' }, () =>
  inScratch(({ dir, manifestPath, artifactPath }) => {
    const link = join(dir, 'artifact-link.zip');
    symlinkSync(artifactPath, link);
    const proc = runCli(manifestPath, link);
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('INPUT_UNREADABLE_OR_INVALID:ARTIFACT_NOT_REGULAR_FILE'));
  })
);

test('RED: manifest symlink is rejected even with otherwise complete evidence', { skip: process.platform === 'win32' }, () =>
  inScratch(({ dir, manifestPath, artifactPath }) => {
    const link = join(dir, 'manifest-link.json');
    symlinkSync(manifestPath, link);
    const proc = runCli(link, artifactPath);
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('INPUT_UNREADABLE_OR_INVALID:MANIFEST_NOT_REGULAR_FILE'));
  })
);

test('RED: FIFO artifact is rejected promptly rather than blocking the preflight', { skip: process.platform === 'win32' }, (t) =>
  inScratch(({ dir, manifestPath }) => {
    const fifo = join(dir, 'artifact-fifo.zip');
    try { execFileSync('mkfifo', [fifo]); }
    catch { t.skip('mkfifo unavailable on this host'); return; }
    const proc = spawnSync(process.execPath, [cli, manifestPath, fifo], {
      encoding: 'utf8', timeout: 1100, maxBuffer: 1024 * 1024
    });
    assert.equal(proc.error, undefined, 'preflight hung on nonregular input: ' + proc.error);
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('INPUT_UNREADABLE_OR_INVALID:ARTIFACT_NOT_REGULAR_FILE'));
  })
);

test('CLI rejects artifact directory on every platform', () =>
  inScratch(({ dir, manifestPath }) => {
    const proc = runCli(manifestPath, dir);
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('INPUT_UNREADABLE_OR_INVALID:ARTIFACT_NOT_REGULAR_FILE'));
  })
);

test('CLI rejects manifest directory on every platform', () =>
  inScratch(({ dir, artifactPath }) => {
    const proc = runCli(dir, artifactPath);
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('INPUT_UNREADABLE_OR_INVALID:MANIFEST_NOT_REGULAR_FILE'));
  })
);

test('RED: oversized otherwise-valid manifest is blocked before JSON admission', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    writeFileSync(manifestPath, JSON.stringify(manifest()) + ' '.repeat(1024 * 1024 + 1));
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('INPUT_UNREADABLE_OR_INVALID:MANIFEST_TOO_LARGE'));
  })
);

test('large regular artifact is hashed accurately without changing authority', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    const large = Buffer.alloc(8 * 1024 * 1024, 0x6b);
    const m = manifest();
    m.artifact_sha256 = createHash('sha256').update(large).digest('hex');
    writeFileSync(manifestPath, JSON.stringify(m));
    writeFileSync(artifactPath, large);
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 0, proc.stdout + proc.stderr);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'PRECHECK_COMPLETE_NOT_AUTHORIZED');
    assert.equal(out.upload_authorized, false);
  })
);

test('empty artifact is hashed exactly and remains non-authorizing', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    const m = manifest();
    m.artifact_sha256 = createHash('sha256').update(Buffer.alloc(0)).digest('hex');
    writeFileSync(manifestPath, JSON.stringify(m));
    writeFileSync(artifactPath, Buffer.alloc(0));
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 0);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'PRECHECK_COMPLETE_NOT_AUTHORIZED');
    assert.equal(out.upload_authorized, false);
  })
);

test('manifest exactly at the 1 MiB byte boundary remains structurally valid', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    const content = JSON.stringify(manifest());
    const remaining = 1024 * 1024 - Buffer.byteLength(content);
    assert(remaining > 0);
    writeFileSync(manifestPath, content + ' '.repeat(remaining));
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 0, proc.stdout + proc.stderr);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'PRECHECK_COMPLETE_NOT_AUTHORIZED');
    assert.equal(out.upload_authorized, false);
  })
);

test('streaming hash detects mutation in the final chunk of a large artifact', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    const original = Buffer.alloc(8 * 1024 * 1024, 0x6b);
    const m = manifest();
    m.artifact_sha256 = createHash('sha256').update(original).digest('hex');
    writeFileSync(manifestPath, JSON.stringify(m));
    original[original.length - 1] ^= 1;
    writeFileSync(artifactPath, original);
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 2);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('ARTIFACT_HASH_MISMATCH'));
  })
);

test('RED: invalid UTF-8 in provider identifier is blocked, not silently rewritten', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    const bytes = Buffer.from(JSON.stringify(manifest()));
    const offset = bytes.indexOf(Buffer.from('test-only-redacted'));
    assert(offset >= 0);
    bytes[offset + 4] = 0xff;
    writeFileSync(manifestPath, bytes);
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 2, proc.stdout);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('INPUT_UNREADABLE_OR_INVALID:MANIFEST_INVALID_UTF8'));
  })
);

test('RED: overlong UTF-8 sequence inside evidence is rejected without replacement', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    const bytes = Buffer.from(JSON.stringify(manifest()));
    const offset = bytes.indexOf(Buffer.from('test-only-fixture'));
    assert(offset >= 0);
    bytes[offset] = 0xc0;
    bytes[offset + 1] = 0xaf;
    writeFileSync(manifestPath, bytes);
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 2, proc.stdout);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'BLOCKED');
    assert.equal(out.upload_authorized, false);
    assert(out.errors.includes('INPUT_UNREADABLE_OR_INVALID:MANIFEST_INVALID_UTF8'));
  })
);

test('legitimate Unicode site text is accepted without granting upload permission', () =>
  inScratch(({ manifestPath, artifactPath }) => {
    const m = manifest();
    m.site = 'Café — Australian staging';
    writeFileSync(manifestPath, JSON.stringify(m));
    const proc = runCli(manifestPath, artifactPath);
    assert.equal(proc.status, 0, proc.stdout + proc.stderr);
    const out = JSON.parse(proc.stdout);
    assert.equal(out.result, 'PRECHECK_COMPLETE_NOT_AUTHORIZED');
    assert.equal(out.upload_authorized, false);
  })
);
