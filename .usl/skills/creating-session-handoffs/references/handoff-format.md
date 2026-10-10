# Handoff format

Use only the fields that change continuation decisions.

```markdown
# Handoff: <task>

## Objective and status
<requested outcome, scope, and current state>

## State anchor
- Repository or workspace:
- Branch and HEAD:
- Modified or untracked files:
- Relevant checks and results:
- External state that must be re-established:

## Completed
- <result and evidence>

## Decisions and constraints
- <decision or constraint, rationale, and source>

## Open items
- Blockers:
- Unverified assumptions:
- Deferred or out-of-scope work:

## Next action
1. <first concrete action, including the file or evidence to inspect>
```

Do not add empty sections for appearances. Use paths and immutable identifiers where they aid verification, but never include secret values.
