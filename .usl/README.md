# Agent configuration

Start at [AGENTS.md](../AGENTS.md). Contracts are repository policy; skill procedures apply only to their stated triggers.
The snapshots in `skills/` are discoverable through `.agents/skills` (Codex) and `.claude/skills` (Claude Code). Restart or begin a new agent session after installing or updating skills if discovery is cached.

| Skill | Use |
| --- | --- |
| `committing-and-syncing-work` | Verified automatic checkpoints and explicit synchronization requests. |
| `refactoring-agent-instructions` | Reorganizing instructions while retaining effective policy. |
| `structuring-pyramidal-writing` | Preparing PR arguments; publish natural prose without the scaffold. |
| `editing-clear-prose` | Editing PRs and durable documentation for clarity. |
| `creating-session-handoffs` | A handoff explicitly requested by the human; no automatic diary. |

See [research and tradeoffs](research.md), [skill provenance](skills-lock.json) and [instruction migration](instruction-migration.md).

[Install local hooks and run verified checkpoints](setup.md).
