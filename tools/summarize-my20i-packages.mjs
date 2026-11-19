#!/usr/bin/env node
/**
 * Local-only, redacted summarizer for an export of documented 20i GET /package.
 * No API client, authentication, network, credential storage, or provider mutation.
 * Never print package IDs, domains, stack-user IDs, package labels, or raw records.
 */
import { closeSync, constants, fstatSync, lstatSync, openSync, readSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const MAX_INPUT_BYTES = 2 * 1024 * 1024;
const CHUNK_BYTES = 64 * 1024;
const MAX_PACKAGES = 5000;
const MAX_ALIASES_PER_PACKAGE = 100;
const CATEGORIES = Object.freeze(['WordPress', 'Linux', 'Windows', 'Cloud', 'VPS', 'Other']);

function blocked(code) {
  return {
    result: 'BLOCKED', errors: [code],
    source: 'LOCAL_UNVERIFIED_EXPORT',
    provider_authenticated: false, provider_verified: false,
    account_capacity_verified: false, staging_target_verified: false,
    upload_authorized: false, provider_mutation: false
  };
}

function categoryFor(type) {
  if (/wordpress/i.test(type)) return 'WordPress';
  if (/linux/i.test(type)) return 'Linux';
  if (/windows/i.test(type)) return 'Windows';
  if (/cloud/i.test(type)) return 'Cloud';
  if (/\bvps\b/i.test(type)) return 'VPS';
  return 'Other';
}

/**
 * Pure validation and redaction. This code intentionally discards all
 * identifying fields: names, package IDs, domain names and StackCP users.
 * Summary is not evidence that the input came from 20i.
 */
export function summarizePackageExport(input) {
  if (!Array.isArray(input)) return blocked('PACKAGE_RESPONSE_NOT_ARRAY');
  if (input.length > MAX_PACKAGES) return blocked('PACKAGE_COUNT_LIMIT_EXCEEDED');
  const seen = new Set();
  const categories = Object.fromEntries(CATEGORIES.map(k => [k, { total: 0, enabled: 0, disabled: 0 }]));
  let enabledCount = 0, aliasesCount = 0;
  for (const packageItem of input) {
    if (!packageItem || typeof packageItem !== 'object' || Array.isArray(packageItem)) {
      return blocked('PACKAGE_ROW_INVALID');
    }
    // These field shapes are documented by 20i for GET /package.
    // Reject schema drift rather than making claims about an unexpected payload.
    const id = packageItem.id;
    if (!Number.isSafeInteger(id) || id <= 0) return blocked('PACKAGE_ID_INVALID');
    if (seen.has(id)) return blocked('DUPLICATE_PACKAGE_ID');
    seen.add(id);
    if (typeof packageItem.enabled !== 'boolean') return blocked('PACKAGE_ENABLED_INVALID');
    if (typeof packageItem.packageTypeName !== 'string' ||
        packageItem.packageTypeName.length < 1 || packageItem.packageTypeName.length > 128) {
      return blocked('PACKAGE_TYPE_INVALID');
    }
    if (!Array.isArray(packageItem.names) ||
        packageItem.names.length === 0 ||
        packageItem.names.length > MAX_ALIASES_PER_PACKAGE ||
        !packageItem.names.every(x => typeof x === 'string' && x.length > 0 && x.length <= 253)) {
      return blocked('PACKAGE_DOMAINS_SHAPE_INVALID');
    }
    if (packageItem.stackUsers !== undefined &&
        (!Array.isArray(packageItem.stackUsers) ||
         !packageItem.stackUsers.every(x => typeof x === 'string'))) {
      return blocked('PACKAGE_USERS_SHAPE_INVALID');
    }
    const key = categoryFor(packageItem.packageTypeName);
    categories[key].total++;
    categories[key][packageItem.enabled ? 'enabled' : 'disabled']++;
    if (packageItem.enabled) enabledCount++;
    aliasesCount += packageItem.names.length;
  }
  return {
    result: 'LOCAL_PACKAGE_SUMMARY_NOT_PROVIDER_VERIFIED',
    errors: [], source: 'LOCAL_UNVERIFIED_EXPORT',
    package_count: input.length, enabled_count: enabledCount,
    disabled_count: input.length - enabledCount, total_domain_entries: aliasesCount,
    type_categories: categories,
    provider_authenticated: false, provider_verified: false,
    account_capacity_verified: false, staging_target_verified: false,
    wordpress_installations_verified: false, domain_ownership_verified: false,
    charges_verified: false, private_access_verified: false, rollback_verified: false,
    upload_authorized: false, provider_mutation: false,
    note: 'Synthetic/offline package counts only. No names, domains, IDs or account secrets included. Check My20i source authenticity, package quotas, actual staging target and privacy/rollback separately.'
  };
}

/**
 * JSON.parse uses last-key-wins semantics. Reject duplicate object property
 * names (including different JSON escape spellings of the same name) so an
 * untrusted export cannot silently overwrite package evidence.
 * JSON.parse validates syntax separately; this scan only identifies keys.
 */
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

export function readLocalExport(filename) {
  if (typeof filename !== 'string' || !filename) return blocked('INPUT_PATH_REQUIRED');
  let descriptor;
  try {
    const pathInfo = lstatSync(filename);
    if (!pathInfo.isFile()) return blocked('INPUT_NOT_REGULAR_FILE');
    if (pathInfo.size > MAX_INPUT_BYTES) return blocked('INPUT_TOO_LARGE');
    descriptor = openSync(filename, constants.O_RDONLY |
      (constants.O_NOFOLLOW ?? 0) | (constants.O_NONBLOCK ?? 0));
    const before = fstatSync(descriptor);
    if (!before.isFile() || before.dev !== pathInfo.dev || before.ino !== pathInfo.ino) {
      return blocked('INPUT_CHANGED_DURING_OPEN');
    }
    if (before.size > MAX_INPUT_BYTES) return blocked('INPUT_TOO_LARGE');
    const buffer = Buffer.alloc(CHUNK_BYTES), chunks = [];
    let count = 0, n;
    while ((n = readSync(descriptor, buffer, 0, buffer.length, null)) > 0) {
      count += n;
      if (count > MAX_INPUT_BYTES) return blocked('INPUT_TOO_LARGE');
      chunks.push(Buffer.from(buffer.subarray(0, n)));
    }
    const after = fstatSync(descriptor), pathAfter = lstatSync(filename);
    if (count !== before.size || before.size !== after.size ||
        before.mtimeMs !== after.mtimeMs || before.ctimeMs !== after.ctimeMs ||
        !pathAfter.isFile() || pathAfter.dev !== after.dev || pathAfter.ino !== after.ino) {
      return blocked('INPUT_CHANGED_DURING_READ');
    }
    let source;
    try { source = new TextDecoder('utf-8', {fatal: true}).decode(Buffer.concat(chunks, count)); }
    catch { return blocked('INPUT_INVALID_UTF8'); }
    let data;
    try { data = JSON.parse(source); }
    catch { return blocked('INPUT_INVALID_JSON'); }
    if (hasDuplicateJsonObjectKeys(source)) return blocked('INPUT_DUPLICATE_JSON_KEY');
    return summarizePackageExport(data);
  } catch {
    return blocked('INPUT_UNREADABLE_OR_CHANGED');
  } finally {
    if (descriptor !== undefined) closeSync(descriptor);
  }
}

function main() {
  if (process.argv.length !== 3) {
    process.stderr.write('usage: node tools/summarize-my20i-packages.mjs <private-GET-package-response.json>\n');
    process.stdout.write(JSON.stringify(blocked('CLI_ARGUMENTS_INVALID')) + '\n');
    process.exitCode = 2;
    return;
  }
  const result = readLocalExport(process.argv[2]);
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  if (result.result === 'BLOCKED') process.exitCode = 2;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
