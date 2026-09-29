# Agent setup rationale — 2026-09-09

Use a small entrypoint, scoped contracts, pinned skills and observable verification. These are working choices to reassess against failed tasks and maintenance cost, not claims that instruction volume improves agent performance.

| Evidence | Applied decision | Limit |
| --- | --- | --- |
| [OpenAI, Harness engineering](https://openai.com/index/harness-engineering/) (2026-02-11) | Keep repository knowledge discoverable; use executable checks for mechanical rules. | Its operating model is an experience report. Its permissive merge practices do not override our human merge gate. |
| [Gloaguen et al., Evaluating AGENTS.md](https://arxiv.org/abs/2602.11988) (revision 2026-06-23) | Keep non-obvious constraints; load detailed domain guidance only when relevant. | Context files did not generally improve success in that study and increased average inference cost by over 20%; this is not proof that every repository instruction is harmful. |
| [Anthropic, Steering Claude Code](https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more) | Use skills for reusable procedures and hooks for deterministic guardrails. | Tool-specific guidance; prose and local hooks cannot create server-side permissions. |
| [Simon Willison, More than just code review](https://simonwillison.net/2026/Aug/22/more-than-just-code-review/) (2026-08-22) | Require evidence that changed behavior works, beyond diff inspection. | Practitioner judgment; verification must fit the change. |
| [Claude Code users discussing session handoffs](https://www.reddit.com/r/ClaudeCode/comments/1v60pw9/how_do_you_do_session_handoffs_in_claude_code/) | Prefer short, requested handoffs anchored in paths, decisions and Git revisions. | Anecdotal and partly promotional; mixed experiences do not justify another memory service or automatic growing summaries. |

Skills are reviewed snapshots of [unstaticlabs/agent-skills](https://github.com/unstaticlabs/agent-skills), pinned in `skills-lock.json` with original notices, licenses and references. No dependency installation or remote code execution occurs when reading them. Update deliberately and review upstream changes.

Automatic commits happen after verification and scope review, followed by explicit branch pushes. They are not filesystem watchers. Draft PRs and the human merge gate follow the owner's explicit preference. No remote branch-protection settings are claimed or changed.

CI uses the ordinary [GitHub pull-request event](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request), read-only permissions and pinned action revisions. Branch metadata enters Python through environment variables, never interpolated shell code. Existing deployment workflows retain their own event boundaries.
