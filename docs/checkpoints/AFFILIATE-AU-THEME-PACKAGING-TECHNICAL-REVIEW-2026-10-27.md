# Affiliate AU theme deployment-member review — logical Overseer technical packet

Status: TECHNICAL CLASSIFICATION COMPLETE / INDEPENDENT REVIEW ACK STILL MISSING  
Date: 2026-10-27  
Purpose: reduce Affiliate-Websites #41 ambiguity without claiming independent worker execution or implementation authority.

## Exact source

Repository:
`darrinbaldwindev/Affiliate-Websites`

Observed source:
`7277f3fa178be430e990132670e19b0112cc9c87`

Theme root:
`wp-content/themes/affiliate-master`

Packaging workflow:
`.github/workflows/theme-validate.yml`

Observed workflow blob:
`f600044aaec79761b4f4cfd090944055bfc3abf2`

Historical theme artifact:
- workflow `37081857188`
- artifact `11258622460`
- inner SHA-256 `e51bb5b8f4b594c821e3b7324bb8f66f67de1265734c5230665430178e4847ee`
- 57 members
- 10 members under `affiliate-master/tests/`

The historical artifact remains **NOT CLEARED FOR UPLOAD**.

## Current source-tree classification

Recursive Git-tree inspection of the exact source found:

- total theme files: **57**
- regular Git blobs mode `100644`: **57**
- non-`100644` entries: **0**
- current symlink entries: **0**
- development test files: **10**
- non-test theme/runtime files: **47**

Therefore:

`CURRENT_SOURCE_SYMLINK_PRESENT = NO`

`CONFIRMED_PACKAGING_DEFECT = DEVELOPMENT_TEST_FILES_INCLUDED`

`PACKAGER_DESIGN_WEAKNESS = NO_FAIL_CLOSED_MEMBER_TYPE_OR_ALLOWLIST_GATE`

The absence of a current symlink does not make the packager safe against future unexpected members.

## Runtime-positive allowlist

The deployment package should include only these reviewed runtime roots/files:

Top-level:
- `functions.php`
- `style.css`
- `theme.json`

Runtime directories:
- `inc/**`
- `parts/**`
- `patterns/**`
- `templates/**`

Explicitly excluded:
- `tests/**`
- hidden cache/temp files;
- backup/swap files;
- dotfiles unless separately approved;
- secrets/config credentials;
- generated local artifacts;
- symlinks;
- non-regular filesystem entries;
- files outside the canonical theme root;
- duplicate/case-colliding archive members;
- any new root/path not on the reviewed runtime allowlist.

At the current exact source, the allowlist selects **47 files** and excludes exactly the **10 test files**.

## Current 10 excluded development files

- `tests/commercial-presentation-test.php`
- `tests/country-context-test.php`
- `tests/country-route-presentation-test.php`
- `tests/earning-card-renderer-test.php`
- `tests/earning-presentation-test.php`
- `tests/editorial-page-test.php`
- `tests/program-collection-test.php`
- `tests/program-detail-test.php`
- `tests/program-filter-controls-test.php`
- `tests/static-performance-budget.py`

These tests should continue to execute from repository source in CI. They should not be deployment ZIP members.

## Minimal packaging-only change design

A maintainer implementation should:

1. Keep all existing validation/test steps unchanged.
2. Build package members from a positive allowlist, not `root.rglob('*')` alone.
3. Before reading bytes:
   - use `lstat` semantics;
   - reject symlinks;
   - reject non-regular entries;
   - resolve and verify canonical containment under the theme root.
4. Normalize archive member paths to POSIX form.
5. Reject:
   - absolute paths;
   - `..` traversal;
   - duplicate normalized paths;
   - case-colliding members;
   - hidden/cache/backup/secret patterns;
   - `tests/`;
   - unapproved new roots.
6. Require WordPress minimum files:
   - `style.css`;
   - `theme.json`;
   - `functions.php`.
7. Generate a deterministic source/member manifest recording for every included file:
   - relative source path;
   - Git blob or source hash;
   - byte size;
   - archive path;
   - SHA-256.
8. Build deterministic ZIP metadata.
9. Re-open the ZIP after build and verify:
   - exact member set equals manifest;
   - no extra members;
   - each extracted member hash equals manifest;
   - compression/file-type metadata is expected.
10. Record:
    - exact source commit;
    - manifest SHA-256;
    - inner ZIP SHA-256;
    - outer Actions artifact SHA-256.

## Required adversarial cases

Proposed tests, not executed here:

- `tests/foo.php` -> package build must fail or omit according to explicit policy; preferred fail closed if discovered outside approved runtime roots.
- symlink inside theme root pointing outside -> fail before bytes read.
- symlink inside theme root pointing to allowed internal file -> fail.
- broken symlink -> fail.
- FIFO/socket/device/non-regular entry -> fail.
- `../escape.php` or absolute archive path -> fail.
- unexpected nested file under unapproved directory -> fail.
- case collision such as `Inc/Foo.php` vs `inc/foo.php` -> fail.
- hidden cache / `.DS_Store` / backup suffix -> fail.
- legitimate new runtime asset under a newly intended root -> fail until allowlist/review is deliberately updated.
- changed runtime file after manifest generation -> source-currentness gate fails.
- forged ZIP member type/compression metadata -> post-build verification fails.

## Acceptance recommendation

The confirmed narrow remediation is:

**runtime-positive package allowlist + fail-closed filesystem/member validation + deterministic post-build manifest verification.**

No theme runtime code change is required merely to remove the 10 development files.

## Authority / evidence boundary

This packet is a logical 20i Overseer technical classification.

It is **not**:
- an independent reviewer ACK;
- a code implementation;
- an executed new test suite;
- a regenerated artifact;
- a `READY_TO_UPLOAD_20I` PASS;
- deployment authority.

Affiliate-Websites #41 remains open until an authorized maintainer/reviewer produces attributable implementation/review evidence and a new accepted artifact.
