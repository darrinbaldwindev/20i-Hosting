# Affiliate AU staging — independent artifact membership and byte audit (2026-10-25)

**Scope:** Read-only GitHub Actions artifact retrieval and ZIP inspection for RewardFinder/Affiliate-Websites. No provider session, upload, WordPress execution, backup mutation, approval, or deployment. Evidence time: 2026-10-25 Brisbane (AEST). This is a source/package evidence note, **not** a `READY_TO_UPLOAD_20I` admission or permission to deploy.

## Evidence identities

Repository: `darrinbaldwindev/Affiliate-Websites`; observed default-branch head: `7277f3fa178be430e990132670e19b0112cc9c87`.

**Support**: workflow `37169425502`, source `eeb05366347ab77a751f75565841294931354bd9`, artifact `11290703976` (`rewardfinder-staging-files`, GitHub reported not expired). Retrieved outer ZIP: **35,941 bytes**, SHA-256 `d9b87617415487e7d8bc40d2a07677947b8ddb2bd3e4ce8a748b6bede5ab71a9` (matches GitHub artifact digest). Outer members: `rewardfinder-staging-files.zip` and `rewardfinder-staging-files.zip.sha256`. Inner ZIP: **35,976 bytes**, SHA-256 `9fc95be766f85142a2aa5a9d33d8cb303abca4bdf68b1e87f6957d2094d71517` (matches packaged sidecar). Outer and inner ZIP CRC checks passed.

Support inner ZIP has **six** members (not a standalone WordPress theme):
- `docs/POST-UPLOAD-SMOKE-TEST-2026-09-30.md` — SHA-256 `9401c9948abb5299b8a95169823ad5af29bb78043cdd04061306cf798aeb9b11`
- `docs/PRE-UPLOAD-MANIFEST-2026-09-30.md` — `43f79b01e91838ba1db9602525ff18965bf1234324ad63e0336d374f3e5a13b0`
- `fixtures/earning-program/earning-programs.au-us.json` — `b21cd6061c4121ed764358be8a71ea7cf270897af5b487bc80b51804c4f2e24f`
- `fixtures/earning-program/earning-programs.uk.json` — `e253cc554547bc8178b20d30c994f4169411d3047bb24194c7d8c06e08da5658`
- `fixtures/rewardfinder-editorial/page-payloads.current.json` — `10b535644965422d493c3cd0a3180be39c5c247faa4363f4da424a0f038d6da4`
- `wp-content/mu-plugins/rewardfinder-staging-adapter.php` — `b3ec96fc61ad02db093ec5d49ecf1f1805bbbfabaddd6cb1848f8030f3d837ef`

**Theme (separate artifact)**: workflow `37081857188`, source `162e87755038e011225ffb773a5bd4e65f7dcb96`, artifact `11258622460` (`affiliate-master-theme`, GitHub reported not expired). Retrieved outer ZIP: **49,864 bytes**, SHA-256 `7c944b1ce651e662ba84a3c5cf8cc2c2c2aaefb827d72003f72f677dc0a568a3` (matches GitHub artifact digest). Outer members: `affiliate-master.zip` and `affiliate-master.zip.sha256`. Inner theme ZIP: **56,205 bytes**, SHA-256 `e51bb5b8f4b594c821e3b7324bb8f66f67de1265734c5230665430178e4847ee` (matches sidecar and earlier documented theme hash). Both ZIP CRC checks passed; inner theme has **57** members. Required theme elements `functions.php`, `style.css`, `theme.json`, `inc/`, `parts/`, `patterns/`, `templates/` are present.

## Source drift classification

GitHub compare `eeb053663...7277f3fa...`: **14 commits ahead, zero behind**, 12 changed paths; **none of the six support ZIP source member paths changed** in the compare result. GitHub compare `162e877550...7277f3fa...`: **68 commits ahead, zero behind**; no `wp-content/themes/affiliate-master/` changed paths in the compare result. This supports **no listed upload-member source drift** at the observed head, not byte-for-byte equivalence of every archived file to Git blobs. Recheck immediately before any authorized staging mutation.

## New packaging/admission concern — P1 maintainer disposition required

The inner `affiliate-master.zip` includes **10 development/test files under `affiliate-master/tests/`**: nine `*-test.php` files and `static-performance-budget.py`. The 20i `docs/contracts/READY_TO_UPLOAD_20I.md` section 1 requires the deployable package to exclude development-only data. These tests appear to be development-only and would reside inside the theme directory if uploaded unmodified. **Do not infer exploitation or secrets exposure; none was demonstrated.** Maintainer/20i must determine whether these files are allowed for a disposable staging-only diagnostic package or must be excluded from the deployable ZIP, then regenerate and rebind the exact artifact if exclusion is required. The existing theme artifact should not be silently edited or re-labelled approved.

The support archive deliberately excludes the theme; the two independently identified artifacts form separate upload components. Do not flag the support ZIP as a missing-theme defect or upload it as a complete site package.

## Gates unchanged

Provider existing-site identity/File Manager/StackCP ingress remains unverified in this run. The historical 2026-10-10 files+database backup is **not** freshly reverified. AU upload, configuration, smoke, runtime acceptance and release receipt are **not** executed. UK and US require separate target/authority evidence. All 75 documented programmes remain commercial HOLD / 0 READY.

Next: (1) maintainer decides development/test-file exclusion for theme package, (2) independent source-to-package member byte comparison and current exact-head check, (3) authorized read-only provider ingress/target inspection, (4) fresh pre-mutation rollback verification, (5) separate owner-authorized staging-only deployment. Keep `READY_TO_UPLOAD_20I = BLOCKED` until every admission item is evidenced; no deployment authorization is granted here.

## Packaging workflow root-cause review — 2026-10-25 18:22 AEST

**Read-only cross-repo finding; no package rebuilt.** At Affiliate-Websites source commit `162e87755038e011225ffb773a5bd4e65f7dcb96` and observed default head `7277f3fa178be430e990132670e19b0112cc9c87`, `.github/workflows/theme-validate.yml` has the identical Git blob `f600044aaec79761b4f4cfd090944055bfc3abf2`. Its `package` job uses `files = sorted(p for p in root.rglob('*') if p.is_file())` with `root = Path('wp-content/themes/affiliate-master')`; no exclusion filter is applied before writing `affiliate-master.zip`. The same workflow deliberately runs PHP and Python tests in its earlier `validate` job. Therefore the 10 `affiliate-master/tests/` entries observed in the archived theme have a **directly verified packaging-code explanation**, not merely a conjectured archive anomaly.

**Bounded maintainer remediation proposal (not applied):** retain the test files in source and run all validation steps; change **only the packaging file-selection logic** to omit `tests/` and any explicitly classified development-only paths. Prefer a positive deployment-member allowlist (e.g. `style.css`, `functions.php`, `theme.json`, `inc/`, `parts/`, `patterns/`, `templates/`, and approved assets) over a brittle blanket extension filter. Add a fail-closed post-build ZIP-member check rejecting `affiliate-master/tests/`, hidden caches, secrets, backups, `.git`, and unexpected member paths; verify mandatory WordPress theme files and ZIP path containment. Do not delete tests from the repository or skip test execution.

**Acceptance evidence required:** maintainer review of runtime assets/allowlist, source commit and successful CI, exact new outer/inner SHA-256 plus sidecar/manifest, independent ZIP CRC/member verification, exact-source file-byte comparison, and fresh current-head upload-member drift check. A new package supersedes the old theme artifact **only after explicit canonical-pointer and 20i admission update**; do not silently reuse old theme artifact `11258622460` or support artifact `11290703976` as a combined site ZIP. This root-cause identification **does not clear** provider ingress, rollback freshness, WordPress runtime, commercial HOLD or `READY_TO_UPLOAD_20I`.
