# Verification contract

For agent instructions and tooling, verify the policy, links, skill checksums and guard tests. Select additional checks from changed product behavior and disclose unavailable coverage.

Use Node 22 and the committed npm lock: `npm ci`, then `npm run build` (TypeScript and Vite).
There is no established unit-test or lint script. Do not claim those checks ran. Add targeted tests when changed behavior warrants them, rather than introducing a framework for static copy edits.
Exercise changed responsive layouts, links and interactions in a browser using safe fixtures. Inspect screenshots before embedding them in the PR.
Keep analytics disabled or isolated for QA; never send disposable test data to production analytics. Inspect env variable names without printing values.
Existing `dist/` and `node_modules/` may predate the current checkout. Prefer a disposable checkout for a clean build when preserving those artifacts matters.
