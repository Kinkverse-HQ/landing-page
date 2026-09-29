# Local tools

Requires Python 3.10+, Git and authenticated GitHub CLI. Run from the repository root:

```sh
python3 -B .usl/bin/setup.py
python3 -B .usl/bin/check.py
python3 -B -m unittest discover -s .usl/bin -p 'test_*.py' -v
```

Setup installs `.usl/hooks` in this clone, leaving the human's Git identity intact. It refuses unknown hook configurations instead of replacing them.
The hooks reject nonconventional/default branches, invalid commit subjects, missing agent attribution, identity overrides, default-branch pushes, tags, deletions and non-fast-forward updates.
The pre-commit dispatcher calls the existing `.githooks/pre-commit` when staged paths include product work. A change confined to the explicit agent-configuration paths runs agent checks only. Mixed changes still run the product hook.
Use this installer for agent work; running an older installer can replace `core.hooksPath`. The checkpoint command refuses a different hooks path. New worktrees/clones must check their setup.

## Verified checkpoints

Review and stage only owned paths, then run the relevant verification commands through the helper:

```sh
python3 -B .usl/bin/checkpoint.py \
  --agent Codex \
  --message 'chore(agents): maintain development contracts' \
  --check 'python3 -B .usl/bin/check.py' \
  --check 'python3 -B -m unittest discover -s .usl/bin -p test_*.py'
```

Those example checks apply to tooling changes. For product work, supply the relevant commands from [verification](contracts/verification.md). Commands are parsed as arguments, not shell programs; use separate `--check` options rather than pipes or command chaining.
The helper checks policy, human identity, `elio-usl` access, the remote/base boundary and staged/unstaged overlap; fetches; verifies; commits; and pushes the named branch with its upstream. It never stages files, forces, rebases or merges.
GitHub transport uses HTTPS with the GitHub CLI credential helper, including when `origin` is SSH. A separate configured push URL requires explicit reconciliation. When staged changes include workflow files, the helper checks the OAuth scope header before committing; GitHub requires `workflow` scope for classic/OAuth credentials. Refresh the signed-in account with `gh auth refresh -h github.com -s workflow` if that check fails.
If a push fails after commit, keep the commit and diagnose the failure. Do not rerun blindly or create an empty replacement checkpoint; fetch and push the same branch after resolving the cause.

## Enforcement limits

These are local hooks and PR checks, not a security boundary or server-side branch protection. They cannot prove the supplied checks are sufficient, prevent intentional bypass, or authorize a merge. Agents must follow the contracts and critically review their work.
The workflow has read-only permissions, uses `pull_request`, and checks the PR head/history. Product build/smoke jobs may use GitHub's merge revision. Tests use synthetic Git repositories and file-only transport; no real GitHub account is used by the fixtures.
