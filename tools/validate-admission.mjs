#!/usr/bin/env node
/**
 * Offline structural preflight for READY_TO_UPLOAD_20I/v1.
 * Never grants READY or upload authority. All evidence is supplied by the caller;
 * authoritative source, reviewer and provider checks remain separate.
 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const SHA40 = /^[a-f0-9]{40}$/i;
const SHA64 = /^[a-f0-9]{64}$/i;
const REQUIRED_EVIDENCE = Object.freeze([
  'source_custody', 'source_currentness', 'dependency_review',
  'platform_compatibility', 'bootstrap', 'configuration_secrets',
  'rewrites_https', 'asset_licences', 'reproducible_build',
  'fresh_backup', 'rollback_rehearsal', 'independent_smoke',
  'independent_review', 'provider_target', 'private_access_control',
  'zero_or_approved_charge'
]);
const UNKNOWN = /^(?:unknown|tbd|not_run|not_verified|pending|n\/a)$/i;

function nonempty(value) {
  return typeof value === 'string' && value.trim().length > 0 &&
    !UNKNOWN.test(value.trim());
}
export function assess(manifest, artifactBytes) {
  const errors = [];
  const fail = (reason) => errors.push(reason);
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    return { result: 'BLOCKED', errors: ['MANIFEST_OBJECT_REQUIRED'], upload_authorized: false };
  }
  if (manifest.contract !== 'READY_TO_UPLOAD_20I/v1') fail('CONTRACT_MISMATCH');
  if (!nonempty(manifest.site)) fail('SITE_UNKNOWN');
  if (typeof manifest.repository !== 'string' ||
      !/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?$/.test(manifest.repository)) {
    fail('CANONICAL_REPOSITORY_UNVERIFIED');
  }
  if (!SHA40.test(manifest.source_commit_sha ?? '')) fail('FULL_SOURCE_SHA_REQUIRED');
  if (!SHA64.test(manifest.artifact_sha256 ?? '')) fail('ARTIFACT_SHA256_REQUIRED');
  if (manifest.target_environment !== 'staging') fail('STAGING_ONLY');
  if (!nonempty(manifest.provider_target_id)) fail('PROVIDER_TARGET_UNKNOWN');
  if (!nonempty(manifest.provider_region)) fail('PROVIDER_REGION_UNKNOWN');
  if (!nonempty(manifest.package_type)) fail('PACKAGE_TYPE_UNKNOWN');
  if (!nonempty(manifest.rollback_artifact_sha256) ||
      !SHA64.test(manifest.rollback_artifact_sha256 ?? '')) fail('ROLLBACK_HASH_REQUIRED');
  if (!nonempty(manifest.verified_by)) fail('VERIFIER_UNKNOWN');
  if (typeof manifest.verified_at_utc !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(manifest.verified_at_utc) ||
      !Number.isFinite(Date.parse(manifest.verified_at_utc))) fail('UTC_TIMESTAMP_REQUIRED');
  if (manifest.result !== 'BLOCKED') fail('SELF_DECLARED_READY_FORBIDDEN');
  if (!Array.isArray(manifest.unknowns) || manifest.unknowns.length !== 0) fail('UNRESOLVED_UNKNOWNS');
  if (!Buffer.isBuffer(artifactBytes)) fail('ARTIFACT_BYTES_ARGUMENT_INVALID');
  else {
    const computed = createHash('sha256').update(artifactBytes).digest('hex');
    if (computed !== manifest.artifact_sha256?.toLowerCase()) fail('ARTIFACT_HASH_MISMATCH');
  }
  const evidence = manifest.evidence;
  if (!evidence || typeof evidence !== 'object' || Array.isArray(evidence)) {
    fail('EVIDENCE_MAP_REQUIRED');
  } else {
    for (const gate of REQUIRED_EVIDENCE) {
      const entry = evidence[gate];
      if (!entry || typeof entry !== 'object' || Array.isArray(entry) ||
          entry.state !== 'PASS' || !nonempty(entry.reference) ||
          !nonempty(entry.verifier) ||
          !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(entry.checked_at_utc ?? '') ||
          !Number.isFinite(Date.parse(entry.checked_at_utc ?? ''))) {
        fail('EVIDENCE_MISSING_OR_UNVERIFIED:' + gate);
      }
    }
  }
  return {
    result: errors.length ? 'BLOCKED' : 'PRECHECK_COMPLETE_NOT_AUTHORIZED',
    errors,
    upload_authorized: false,
    note: 'Offline manifest checks only. Independent provider/source verification, READY_TO_UPLOAD_20I decision and separate exact-target owner upload approval remain mandatory.'
  };
}

function main() {
  if (process.argv.length !== 4) {
    console.error('usage: node tools/validate-admission.mjs manifest.json artifact.zip');
    process.exitCode = 2;
    return;
  }
  try {
    const manifest = JSON.parse(readFileSync(process.argv[2], 'utf8'));
    const bytes = readFileSync(process.argv[3]);
    const output = assess(manifest, bytes);
    console.log(JSON.stringify(output, null, 2));
    process.exitCode = output.result === 'BLOCKED' ? 2 : 0;
  } catch (error) {
    console.log(JSON.stringify({
      result: 'BLOCKED', upload_authorized: false,
      errors: ['INPUT_UNREADABLE_OR_INVALID:' + (error.code ?? 'INPUT_ERROR')]
    }));
    process.exitCode = 2;
  }
}
import { pathToFileURL } from 'node:url';
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
