# Pull request contract

## Creation

Open a draft PR once a coherent checkpoint is pushed. Confirm its base and inspect the complete base-to-head diff.
Prepare the explanation for the maintainer deciding whether this change solves the stated problem safely.
Identify the subject, audience, reader's question, governing answer, shared situation and complication; organize the strongest supporting arguments and factual evidence (up to three of each where useful).
Publish the resulting plain English explanation, not that planning scaffold. Lead with the problem and resulting behavior, then evidence, validation and material limits. Do not pad a small change or invent support.
Use the installed `structuring-pyramidal-writing` and `editing-clear-prose` skills when preparing the PR.
Update title/body to describe the final change, including scope changes and known failures.

## Review and readiness

Before marking ready, critically review the complete diff for correctness, authorization, privacy, compatibility, failure paths, unnecessary complexity and missing verification.
Fix actionable findings, rerun affected checks, push the fixes and review again. Record a concise review outcome and remaining risks in the PR.
Ready requires passing relevant checks on the latest revision, adequate behavioral evidence for changed behavior, and no unresolved blocking findings. Missing checks keep the PR draft unless the human explicitly accepts that limitation.
Do not mistake a green narrow check for validation of untested product behavior.

## Visible UI changes

Include relevant screenshots directly in the description, with concise captions and expandable sections when helpful. Use synthetic or disposable QA fixtures.
Personally inspect each image and embedded metadata before publication for private data, credentials, real contacts, financial details, document contents, address bars and local paths. Recapture or reliably redact and reinspect sensitive captures.
State capture date, QA context and tested revision; label older illustrative captures. A still image is not functional proof.
Keep images in the repository or another access-appropriate location. Never widen access or use credential-bearing URLs to embed them. Avoid unrelated screenshots for backend or tooling changes.

## Merge boundary

Merging requires an explicit human instruction for the PR. Draft creation, review completion, green CI and permission to push are not merge authorization.
Do not enable auto-merge, push merge results to the base branch, or deploy as a substitute for that instruction.
