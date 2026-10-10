---
name: editing-clear-prose
description: "Edits human-facing prose to be clear, concise, concrete, and faithful to the author's intent. Use when the user explicitly asks to revise, tighten, copyedit, simplify, or remove vague and inflated language. Do not trigger merely because another task includes prose."
license: MIT
metadata:
  usl-owner: unstatic-labs
  usl-version: "0.1.0"
  usl-status: experimental
  usl-risk: low
  usl-source: "https://github.com/softaworks/agent-toolkit/tree/3027f20f3181758385a1bb8c022d4041dfb4de84/skills/writing-clearly-and-concisely"
---

# Editing Clear Prose

Make the text easier to understand without sanding away meaning or voice.

## Preserve before tightening

Identify the intended reader, purpose, factual claims, required terminology, uncertainty, voice, dialect, and structural constraints. Do not simplify a technical or legal distinction into inaccuracy. Ask only when an ambiguity would materially change the revision.

## Edit by information value

- Put the main point where the reader needs it; make paragraph order follow the argument or action.
- Prefer concrete subjects and strong verbs. Use active voice when the actor matters, not as a universal conversion rule.
- Replace abstract nominalizations and vague references with the actual action, object, condition, or measure.
- Cut throat-clearing, repeated conclusions, empty transitions, unearned intensifiers, and claims of importance that the evidence does not support.
- Keep qualifiers that express real uncertainty, scope, or risk. Concision must not become false confidence.
- Use parallel structure and sentence length deliberately. Preserve lists, headings, examples, and emphasis only when they help scanning or comprehension.

Do not use word blacklists, punctuation bans, or supposed AI-writing tells as evidence of bad prose. Judge each phrase by meaning, precision, rhythm, and fit with the author's voice.

## Output contract

Return the clean revision. Note substantive meaning changes, unresolved ambiguity, or intentional terminology choices when they matter; do not bury the edited text under a style lecture.
