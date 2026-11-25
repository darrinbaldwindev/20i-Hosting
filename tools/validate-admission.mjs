#!/usr/bin/env node
/**
 * Offline structural preflight for READY_TO_UPLOAD_20I/v1.
 * Never grants READY or upload authority. All evidence is supplied by the caller;
 * authoritative source, reviewer and provider checks remain separate.
 */
import { closeSync, constants, fstatSync, lstatSync, openSync, readSync } from 'node:fs';
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

/** Parse real UTC calendar dates without truncating evidence chronology.
 * Date.parse normalizes impossible days and loses sub-millisecond precision;
 * retain arbitrary fractional digits to compare exact declared event ordering.
 */
function parseUtcTimestamp(value) {
  if (typeof value !== 'string') return null;
  const match = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.(\d+))?Z$/.exec(value);
  if (!match) return null;
  const millis = Date.parse(match[1] + 'Z');
  if (!Number.isFinite(millis) ||
      new Date(millis).toISOString().slice(0, 19) !== match[1]) return null;
  return { seconds: millis / 1000, fraction: match[2] ?? '' };
}

/** Compare fractional digits lexicographically after equal-width zero padding.
 * .1, .10 and .100000 represent the same instant; .100001 is later.
 */
function isLaterTimestamp(candidate, baseline) {
  if (candidate.seconds !== baseline.seconds) return candidate.seconds > baseline.seconds;
  const width = Math.max(candidate.fraction.length, baseline.fraction.length);
  return candidate.fraction.padEnd(width, '0') > baseline.fraction.padEnd(width, '0');
}

function nonempty(value) {
  return typeof value === 'string' && value.trim().length > 0 &&
    !UNKNOWN.test(value.trim());
}
function assessObservedDigest(manifest, observedDigest) {
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
  if (typeof manifest.source_commit_sha !== 'string' || !SHA40.test(manifest.source_commit_sha)) fail('FULL_SOURCE_SHA_REQUIRED');
  if (typeof manifest.artifact_sha256 !== 'string' || !SHA64.test(manifest.artifact_sha256)) fail('ARTIFACT_SHA256_REQUIRED');
  if (manifest.target_environment !== 'staging') fail('STAGING_ONLY');
  if (!nonempty(manifest.provider_target_id)) fail('PROVIDER_TARGET_UNKNOWN');
  if (!nonempty(manifest.provider_region)) fail('PROVIDER_REGION_UNKNOWN');
  if (!nonempty(manifest.package_type)) fail('PACKAGE_TYPE_UNKNOWN');
  if (typeof manifest.rollback_artifact_sha256 !== 'string' ||
      !SHA64.test(manifest.rollback_artifact_sha256)) fail('ROLLBACK_HASH_REQUIRED');
  if (!nonempty(manifest.verified_by)) fail('VERIFIER_UNKNOWN');
  const verifiedTime = parseUtcTimestamp(manifest.verified_at_utc);
  if (verifiedTime === null) fail('UTC_TIMESTAMP_REQUIRED');
  if (manifest.result !== 'BLOCKED') fail('SELF_DECLARED_READY_FORBIDDEN');
  if (!Array.isArray(manifest.unknowns) || manifest.unknowns.length !== 0) fail('UNRESOLVED_UNKNOWNS');
  if (observedDigest === null) fail('ARTIFACT_BYTES_ARGUMENT_INVALID');
  else if (typeof manifest.artifact_sha256 !== 'string' ||
           observedDigest !== manifest.artifact_sha256.toLowerCase()) {
    fail('ARTIFACT_HASH_MISMATCH');
  }
  const evidence = manifest.evidence;
  if (!evidence || typeof evidence !== 'object' || Array.isArray(evidence)) {
    fail('EVIDENCE_MAP_REQUIRED');
  } else {
    for (const gate of REQUIRED_EVIDENCE) {
      const entry = evidence[gate];
      const checkedTime = entry && typeof entry === 'object' && !Array.isArray(entry)
        ? parseUtcTimestamp(entry.checked_at_utc) : null;
      if (!entry || typeof entry !== 'object' || Array.isArray(entry) ||
          entry.state !== 'PASS' || !nonempty(entry.reference) ||
          !nonempty(entry.verifier) || checkedTime === null) {
        fail('EVIDENCE_MISSING_OR_UNVERIFIED:' + gate);
      } else if (verifiedTime !== null && isLaterTimestamp(checkedTime, verifiedTime)) {
        fail('EVIDENCE_AFTER_VERIFICATION:' + gate);
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

/** Public API still checks real bytes; callers cannot submit an unchecked digest. */
export function assess(manifest, artifactBytes) {
  const digest = Buffer.isBuffer(artifactBytes)
    ? createHash('sha256').update(artifactBytes).digest('hex')
    : null;
  return assessObservedDigest(manifest, digest);
}

/** Read only regular files with descriptor checks and bounded memory.
 * A read may detect size/mtime/ctime changes, but cannot certify a source
 * against adversarial same-size replacement during hashing.
 */
const MAX_MANIFEST_BYTES = 1024 * 1024;
const READ_CHUNK_BYTES = 64 * 1024;

function inputError(code) {
  const error = new Error('Invalid or changed input');
  error.code = code;
  return error;
}

function sameIdentity(a, b) {
  return a.dev === b.dev && a.ino === b.ino;
}

function withRegularInput(filename, kind, consume) {
  const pathBefore = lstatSync(filename, { bigint: true });
  if (!pathBefore.isFile()) throw inputError(kind + '_NOT_REGULAR_FILE');
  const flags = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0) |
    (constants.O_NONBLOCK ?? 0);
  let fd;
  try {
    fd = openSync(filename, flags);
    const before = fstatSync(fd, { bigint: true });
    if (!before.isFile()) throw inputError(kind + '_NOT_REGULAR_FILE');
    if (!sameIdentity(pathBefore, before)) throw inputError(kind + '_IDENTITY_CHANGED');
    if (pathBefore.size !== before.size || pathBefore.mtimeNs !== before.mtimeNs ||
        pathBefore.ctimeNs !== before.ctimeNs) throw inputError(kind + '_CHANGED_DURING_READ');
    const output = consume(fd, before.size);
    const after = fstatSync(fd, { bigint: true });
    let pathAfter;
    try { pathAfter = lstatSync(filename, { bigint: true }); }
    catch { throw inputError(kind + '_IDENTITY_CHANGED'); }
    if (!pathAfter.isFile() || !sameIdentity(before, after) ||
        !sameIdentity(after, pathAfter)) throw inputError(kind + '_IDENTITY_CHANGED');
    if (before.size !== after.size || before.mtimeNs !== after.mtimeNs ||
        before.ctimeNs !== after.ctimeNs || after.size !== pathAfter.size ||
        after.mtimeNs !== pathAfter.mtimeNs || after.ctimeNs !== pathAfter.ctimeNs) {
      throw inputError(kind + '_CHANGED_DURING_READ');
    }
    return output;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}

function readBoundedManifest(filename) {
  return withRegularInput(filename, 'MANIFEST', (fd, expectedSize) => {
    if (expectedSize > MAX_MANIFEST_BYTES) throw inputError('MANIFEST_TOO_LARGE');
    const chunks = [];
    const chunk = Buffer.alloc(READ_CHUNK_BYTES);
    let total = 0;
    let bytesRead;
    while ((bytesRead = readSync(fd, chunk, 0, chunk.length, null)) > 0) {
      total += bytesRead;
      if (total > MAX_MANIFEST_BYTES) throw inputError('MANIFEST_TOO_LARGE');
      chunks.push(Buffer.from(chunk.subarray(0, bytesRead)));
    }
    if (BigInt(total) !== expectedSize) throw inputError('MANIFEST_CHANGED_DURING_READ');
    // Buffer.toString('utf8') silently inserts replacement characters for
    // invalid bytes. Fail closed rather than accepting rewritten evidence.
    try {
      return new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks, total));
    } catch {
      throw inputError('MANIFEST_INVALID_UTF8');
    }
  });
}

function hashRegularArtifact(filename) {
  return withRegularInput(filename, 'ARTIFACT', (fd, expectedSize) => {
    const hash = createHash('sha256');
    const chunk = Buffer.alloc(READ_CHUNK_BYTES);
    let total = 0n;
    let bytesRead;
    while ((bytesRead = readSync(fd, chunk, 0, chunk.length, null)) > 0) {
      total += BigInt(bytesRead);
      hash.update(chunk.subarray(0, bytesRead));
    }
    if (total !== expectedSize) throw inputError('ARTIFACT_CHANGED_DURING_READ');
    return hash.digest('hex');
  });
}

// JSON.parse validates syntax but discards duplicate property names. Reject
// ambiguity at every nesting level, comparing decoded key spellings.
function hasDuplicateJsonObjectKeys(source) {
  const stack = [];
  for (let i = 0; i < source.length;) {
    const ch = source[i];
    if (ch === '{') { stack.push(new Set()); i++; continue; }
    if (ch === '[') { stack.push(null); i++; continue; }
    if (ch === '}' || ch === ']') { stack.pop(); i++; continue; }
    if (ch !== '"') { i++; continue; }

    const start = i;
    i++;
    while (i < source.length) {
      if (source[i] === '\\') { i += 2; continue; }
      if (source[i] === '"') break;
      i++;
    }
    const end = i;
    i++;
    let next = i;
    while (next < source.length && /\s/.test(source[next])) next++;
    const current = stack[stack.length - 1];
    if (source[next] !== ':' || !(current instanceof Set)) continue;
    // Decode JSON escapes before comparing names, e.g. "id" and "\u0069d".
    const key = JSON.parse(source.slice(start, end + 1));
    if (current.has(key)) return true;
    current.add(key);
  }
  return false;
}

function main() {
  if (process.argv.length !== 4) {
    console.error('usage: node tools/validate-admission.mjs manifest.json artifact.zip');
    process.exitCode = 2;
    return;
  }
  try {
    const source = readBoundedManifest(process.argv[2]);
    const manifest = JSON.parse(source);
    if (hasDuplicateJsonObjectKeys(source)) throw inputError('MANIFEST_DUPLICATE_JSON_KEY');
    const artifactDigest = hashRegularArtifact(process.argv[3]);
    const output = assessObservedDigest(manifest, artifactDigest);
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
