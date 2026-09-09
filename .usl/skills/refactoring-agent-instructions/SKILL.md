---
name: refactoring-agent-instructions
description: "Refactors AGENTS.md, CLAUDE.md, and related repository instructions without losing policy, precedence, or project-specific knowledge. Use when the user asks to simplify, reorganize, deduplicate, or progressively disclose agent instructions. Do not use for adding one new repository rule."
license: MIT
metadata:
  usl-owner: unstatic-labs
  usl-version: "0.1.0"
  usl-status: experimental
  usl-risk: medium
  usl-source: "https://github.com/softaworks/agent-toolkit/tree/3027f20f3181758385a1bb8c022d4041dfb4de84/skills/agent-md-refactor"
---

# Refactoring Agent Instructions

Reduce instruction cost without changing the repository's operating contract.

## Establish the effective policy

- Find every instruction file that applies to the requested scope, including nested files and linked references. Respect their precedence rather than treating one root file as the whole policy.
- Confirm non-standard commands, directory boundaries, generated files, security rules, authorization limits, and agent-specific adapters against repository evidence.
- Identify contradictions separately from duplication. If precedence and repository evidence do not resolve a contradiction, ask the user before choosing a rule.

## Classify before editing

Classify each instruction as one of:

- always needed at its current scope;
- conditional knowledge better linked from the owning scope;
- enforced by code, CI, permissions, or configuration;
- duplicated without adding a narrower exception;
- stale according to current repository evidence;
- inferable from the task, tools, or codebase and therefore no knowledge delta;
- unresolved because intent or precedence is unclear.

Do not remove security, permission, destructive-action, or compatibility boundaries merely because a capable agent usually knows the safer default.

## Refactor proportionally

- Keep universal overrides and essential orientation in the nearest applicable instruction file.
- Move substantial conditional guidance only when a link will prevent irrelevant context from loading. Use repository-native locations and shallow links.
- Consolidate overlapping rules at their narrowest shared scope. Preserve a local exception when it intentionally differs.
- Remove content only when its replacement, enforcement point, staleness, or lack of knowledge delta is demonstrable.
- Do not optimize for a line count, file count, or a preferred `AGENTS.md`/`CLAUDE.md` layout.

## Verify

Trace every original instruction to its retained location, enforcement point, explicit removal rationale, or unresolved decision. Check links and cited commands. Review the final diff for broadened permissions, lost scope qualifiers, and accidental changes to unrelated policy.

## Output contract

Provide the refactored files plus a concise accounting of conflicts resolved, material moves, removals and their evidence, and any decision still requiring the user.
