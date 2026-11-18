import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { assess } from '../tools/validate-admission.mjs';

const payload = Buffer.from('test-only-staging-artifact');
const hash = createHash('sha256').update(payload).digest('hex');
const sha = 'a'.repeat(40);
const gates = [
  'source_custody', 'source_currentness', 'dependency_review',
  'platform_compatibility', 'bootstrap', 'configuration_secrets',
  'rewrites_https', 'asset_licences', 'reproducible_build',
  'fresh_backup', 'rollback_rehearsal', 'independent_smoke',
  'independent_review', 'provider_target', 'private_access_control',
  'zero_or_approved_charge'
];
function valid() {
  return {
    contract: 'READY_TO_UPLOAD_20I/v1',
    site: 'isolated-test-site',
    repository: 'https://github.com/example/source',
    source_commit_sha: sha,
    artifact_sha256: hash,
    target_environment: 'staging',
    provider_target_id: 'redacted-fixture-target',
    provider_region: 'fixture-region',
    package_type: 'fixture-static',
    rollback_artifact_sha256: hash,
    verified_by: 'fixture-verifier',
    verified_at_utc: '2026-11-18T09:30:00Z',
    result: 'BLOCKED',
    unknowns: [],
    evidence: Object.fromEntries(gates.map(g => [g, {
      state: 'PASS', reference: 'fixture-only', verifier: 'fixture-verifier',
      checked_at_utc: '2026-11-18T09:30:00Z'
    }]))
  };
}
function blocked(change, code) {
  const m = valid();
  change(m);
  const out = assess(m, payload);
  assert.equal(out.result, 'BLOCKED');
  assert.equal(out.upload_authorized, false);
  assert(out.errors.some(e => e.startsWith(code)), JSON.stringify(out));
}
test('complete fixture never grants upload authority', () => {
  const out = assess(valid(), payload);
  assert.equal(out.result, 'PRECHECK_COMPLETE_NOT_AUTHORIZED');
  assert.equal(out.upload_authorized, false);
});
test('no manifest fails closed', () => {
  assert.equal(assess(null, payload).result, 'BLOCKED');
});
test('short source SHA blocks', () => blocked(m => m.source_commit_sha = 'a'.repeat(7), 'FULL_SOURCE_SHA'));
test('unknown provider blocks', () => blocked(m => m.provider_target_id = 'UNKNOWN', 'PROVIDER_TARGET_UNKNOWN'));
test('target cannot be production', () => blocked(m => m.target_environment = 'production', 'STAGING_ONLY'));
test('self declared READY forbidden', () => blocked(m => m.result = 'READY', 'SELF_DECLARED_READY_FORBIDDEN'));
test('artifact digest mismatch blocks', () => blocked(m => m.artifact_sha256 = '0'.repeat(64), 'ARTIFACT_HASH_MISMATCH'));
test('missing artifact bytes block', () => assert.equal(assess(valid(), null).result, 'BLOCKED'));
test('missing independent review blocks', () => blocked(m => delete m.evidence.independent_review, 'EVIDENCE_MISSING_OR_UNVERIFIED:independent_review'));
test('missing source currentness blocks', () => blocked(m => m.evidence.source_currentness.state = 'NOT_RUN', 'EVIDENCE_MISSING_OR_UNVERIFIED:source_currentness'));
test('missing private access control blocks', () => blocked(m => m.evidence.private_access_control.reference = 'UNKNOWN', 'EVIDENCE_MISSING_OR_UNVERIFIED:private_access_control'));
test('missing fresh rollback blocks', () => blocked(m => delete m.evidence.rollback_rehearsal, 'EVIDENCE_MISSING_OR_UNVERIFIED:rollback_rehearsal'));
test('unresolved unknowns block', () => blocked(m => m.unknowns = ['provider'], 'UNRESOLVED_UNKNOWNS'));
test('missing verifier blocks', () => blocked(m => m.verified_by = 'PENDING', 'VERIFIER_UNKNOWN'));
test('invalid timestamp blocks', () => blocked(m => m.verified_at_utc = 'yesterday', 'UTC_TIMESTAMP_REQUIRED'));
test('invalid repository blocks', () => blocked(m => m.repository = 'file:///tmp/source', 'CANONICAL_REPOSITORY_UNVERIFIED'));
