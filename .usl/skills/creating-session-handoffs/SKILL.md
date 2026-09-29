---
name: creating-session-handoffs
description: "Creates and validates evidence-rich handoffs for continuing work across agent sessions. Use when the user asks to save task state, pause substantial work, hand work to another agent, or resume from a handoff. Do not use for durable architecture decisions or general retrospectives."
license: MIT
metadata:
  usl-owner: unstatic-labs
  usl-version: "0.1.0"
  usl-status: experimental
  usl-risk: low
  usl-source: "https://github.com/softaworks/agent-toolkit/tree/3027f20f3181758385a1bb8c022d4041dfb4de84/skills/session-handoff"
---

# Creating Session Handoffs

Preserve enough verified state for a fresh agent to continue without treating transient context as durable documentation.

## Create

1. Establish the task objective, requested scope, and current completion state from the conversation and workspace.
2. Capture a reproducible state anchor when available: repository, branch, HEAD, modified and untracked files, relevant checks, and external state that cannot be preserved.
3. Record completed work, decisions that constrain the next step, unresolved assumptions, blockers, and the first executable next action.
4. Point to critical files and evidence instead of copying large code or command output.
5. Use [the handoff format](references/handoff-format.md) when a persistent artifact is requested. Follow an existing repository convention; otherwise return the handoff in the response unless the user chooses a storage location.

Never include credentials, secret values, personal data unrelated to the task, or claims that a process, terminal, login, or remote resource will remain available.

## Resume

Read the handoff completely, then compare its state anchor with the current workspace. Current repository and external state always override the document. Identify stale claims, changed files, branch divergence, resolved blockers, and invalid assumptions before acting.

If the handoff remains usable, continue from the first still-valid next action. If material state cannot be reconciled safely, report the mismatch and obtain only the decision needed to proceed.

## Boundaries

- A handoff describes transient continuation state. Put durable technical rationale in the repository's decision documentation.
- A handoff may mention lessons but does not generalize them into reusable policy or skills.
- Creation must be user-directed; do not generate accumulating handoff files merely because work is substantial.

## Output contract

Deliver a concise handoff with verified state, completed and pending work, rationale needed for continuation, blockers, uncertainties, and one unambiguous next action. When resuming, state what was revalidated and what changed.
