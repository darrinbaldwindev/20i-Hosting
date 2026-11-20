#!/usr/bin/env node
/**
 * Read-only, conservative check of WordPress AgentOS commercial-theme source.
 * Does not inspect a live site, establish source custody, approve claims,
 * authenticate a 20i target, or authorize publication/upload.
 */
import { closeSync, constants, fstatSync, lstatSync, openSync, readSync, readdirSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const EXPECTED_FILES = Object.freeze([
  'style.css', 'functions.php', 'front-page.php', 'index.php'
]);
const TEXT_SUFFIX = /\.(?:php\d*|phtml|phar|inc|tpl|twig|html?|[mc]?jsx?|[mc]?tsx?|md|txt|json|css|s[ac]ss|less|svg|xml|ya?ml)$/i;
const MAX_TEXT_FILE_BYTES = 1024 * 1024;
const MAX_ENTRIES = 256;
const MAX_DIAGNOSTICS = 100;
const MAX_DEPTH = 32;
const READ_CHUNK = 64 * 1024;
const RULES = Object.freeze([
  ['SUPERSEDED_ADDON', /\b(?:add[- ]on|pro\s*\+\s*subscription|subscription\s+requires\s+pro|pro\s+required\s+for\s+subscription)\b/i],
  ['SUPERSEDED_TIER', /\b(?:co[- ]worker|ai\s+plus|operator\s+tier|standard\s+tier)\b/i],
  ['SUPERSEDED_PRICE', /(?:US\$|\$|USD\s*)\s*(?:29|39|49)(?!\d)(?:\b|\/)/i],
  ['UNAPPROVED_TRIAL', /\b(?:30[- ]day\s+(?:free\s+)?trial|free\s+trial|trial\s+included|auto(?:matic(?:ally)?)?\s+convert(?:s|ed)?\s+to\s+paid)\b/i],
  ['UNVERIFIED_LIVE', /\b(?:production[- ]ready|fully\s+operational|already\s+live|available\s+now|independently\s+certified|guaranteed\s+(?:results|savings))\b/i],
  ['UNAPPROVED_PRICE_PRESENTATION', /(?:US\$|\$|USD\s*)\s*(?:0|22|99)(?!\d)(?:\b|\/)/i],
  ['ACTIVE_PAYMENT_OR_SIGNUP', /\b(?:buy\s+now|subscribe\s+now|pay\s+now|start\s+your\s+(?:free\s+)?trial|open\s+checkout)\b|<form\b|https?:\/\/(?:checkout\.stripe\.com|buy\.stripe\.com)\b/i]
]);

function blocked(errors, filesChecked=0) {
  return {
    result: 'BLOCKED', errors, files_checked: filesChecked,
    upload_authorized: false, publish_authorized: false,
    note: 'This scanner does not establish canonical source custody, claim acceptance, WordPress compatibility, 20i provider access, or staging permission.'
  };
}

export function auditTheme(sourceDir) {
  if (typeof sourceDir !== 'string' || !sourceDir.trim()) {
    return blocked(['SOURCE_DIRECTORY_REQUIRED']);
  }
  const root = resolve(sourceDir);
  try {
    if (!lstatSync(root).isDirectory()) return blocked(['SOURCE_DIRECTORY_INVALID']);
  } catch { return blocked(['SOURCE_DIRECTORY_UNREADABLE']); }

  const errors = [];
  // Preserve fail-closed status but cap hostile/accidental report amplification.
  // The sentinel records that further specific findings were suppressed.
  function recordError(message) {
    if (errors.length < MAX_DIAGNOSTICS) errors.push(message);
    else if (errors.length === MAX_DIAGNOSTICS) errors.push('DIAGNOSTICS_TRUNCATED');
  }
  const checked = [];
  for (const name of EXPECTED_FILES) {
    try {
      if (!lstatSync(join(root, name)).isFile()) recordError('WORDPRESS_THEME_FILE_INVALID:' + name);
    } catch { recordError('WORDPRESS_THEME_FILE_MISSING:' + name); }
  }
  // Pure local source scanner. An opened descriptor, not a checked path, supplies text.
  // O_NOFOLLOW reduces symlink substitution risks on supported platforms.
  function readCheckedText(path, name, inspected) {
    let fd;
    try {
      fd = openSync(path, constants.O_RDONLY |
        (constants.O_NOFOLLOW ?? 0) | (constants.O_NONBLOCK ?? 0));
      const before = fstatSync(fd);
      if (!before.isFile() || before.dev !== inspected.dev ||
          before.ino !== inspected.ino) {
        recordError('SOURCE_CHANGED_DURING_SCAN:' + name);
        return null;
      }
      if (before.size > MAX_TEXT_FILE_BYTES) {
        recordError('SOURCE_TEXT_TOO_LARGE:' + name);
        return null;
      }
      const chunk = Buffer.alloc(READ_CHUNK), chunks = [];
      let total = 0, n;
      while ((n = readSync(fd, chunk, 0, chunk.length, null)) > 0) {
        total += n;
        if (total > MAX_TEXT_FILE_BYTES) {
          recordError('SOURCE_TEXT_TOO_LARGE:' + name);
          return null;
        }
        chunks.push(Buffer.from(chunk.subarray(0, n)));
      }
      const after = fstatSync(fd), current = lstatSync(path);
      if (total !== before.size || before.size !== after.size ||
          before.mtimeMs !== after.mtimeMs || before.ctimeMs !== after.ctimeMs ||
          !current.isFile() || current.dev !== after.dev ||
          current.ino !== after.ino) {
        recordError('SOURCE_CHANGED_DURING_SCAN:' + name);
        return null;
      }
      try { return new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks, total)); }
      catch { recordError('SOURCE_INVALID_UTF8:' + name); return null; }
    } catch { recordError('SOURCE_READ_FAILED:' + name); return null; }
    finally { if (fd !== undefined) closeSync(fd); }
  }

  function scan() {
    // Count directories as well as files; avoid recursive stack growth.
    const pending = [{dir: root, depth: 0}];
    let entriesSeen = 0;
    while (pending.length) {
      const {dir, depth} = pending.pop();
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (++entriesSeen > MAX_ENTRIES) throw new Error('SOURCE_ENTRY_LIMIT_EXCEEDED');
        const path = join(dir, entry.name);
        const name = relative(root, path).split(sep).join('/');
        const info = lstatSync(path);
        if (entry.isSymbolicLink() || info.isSymbolicLink()) {
          recordError('SYMLINK_FORBIDDEN:' + name);
          continue;
        }
        if (entry.isDirectory()) {
          if (!info.isDirectory()) { recordError('SOURCE_CHANGED_DURING_SCAN:' + name); continue; }
          if (depth >= MAX_DEPTH) throw new Error('SOURCE_DEPTH_LIMIT_EXCEEDED');
          pending.push({dir: path, depth: depth + 1});
          continue;
        }
        if (!entry.isFile() || !info.isFile()) {
          recordError('NONREGULAR_OR_CHANGED_FILE:' + name);
          continue;
        }
        checked.push(name);
        if (!TEXT_SUFFIX.test(name)) continue;
        const source = readCheckedText(path, name, info);
        if (source === null) continue;
        const lines = source.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          for (const [id, pattern] of RULES) {
            if (pattern.test(lines[i])) recordError('COPY_REVIEW_REQUIRED:' + id + ':' + name + ':' + (i + 1));
          }
        }
      }
    }
  }
  try { scan(); }
  catch (error) {
    recordError(['SOURCE_ENTRY_LIMIT_EXCEEDED','SOURCE_DEPTH_LIMIT_EXCEEDED'].includes(error.message)
      ? error.message : 'SOURCE_SCAN_UNREADABLE');
  }

  return errors.length ? blocked(errors, checked.length) : {
    result: 'COPY_SCAN_COMPLETE_NOT_ACCEPTED',
    errors: [], files_checked: checked.length,
    upload_authorized: false, publish_authorized: false,
    note: 'Negative-pattern scan only. Independent claim review, original source custody, private staging controls, exact provider evidence and separate release authority are still mandatory.'
  };
}

function main() {
  if (process.argv.length !== 3) {
    process.stderr.write('usage: node tools/validate-agentos-theme-copy.mjs <source-dir>\n');
    process.stdout.write(JSON.stringify(blocked(['CLI_ARGUMENTS_INVALID'])) + '\n');
    process.exitCode = 2;
    return;
  }
  const out = auditTheme(process.argv[2]);
  process.stdout.write(JSON.stringify(out, null, 2) + '\n');
  if (out.result === 'BLOCKED') process.exitCode = 2;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
