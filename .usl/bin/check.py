"""Validate policy, portable skill snapshots, instruction links and optional PR history."""
import hashlib
import json
import os
import re
import sys
from policy import ROOT, git, policy, require_branch, require_message, ensure


def check():
    config = policy()
    ensure(config['version'] == 1, 'Invalid agent configuration')
    ensure(config['git'] == {'auto_commit': True, 'auto_push': 'non-default'}, 'Invalid agent configuration')
    ensure(config['github']['login'] == 'elio-usl', 'Invalid agent configuration')
    ensure(re.fullmatch('[\\w.-]+/[\\w.-]+', config['github']['repository']), 'Invalid agent configuration')
    lock = json.loads((ROOT / ".usl/skills-lock.json").read_text())
    ensure(lock['repository'] == 'https://github.com/unstaticlabs/agent-skills', 'Invalid agent configuration')
    ensure(re.fullmatch('[0-9a-f]{40}', lock['revision']), 'Invalid agent configuration')
    skills = ROOT / ".usl/skills"
    actual = {p.relative_to(skills).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
              for p in skills.rglob("*") if p.is_file()}
    ensure(actual == lock['sha256'], 'Skill content differs from the reviewed snapshot')
    for directory in (".agents", ".claude"):
        link = ROOT / directory / "skills"
        ensure(link.is_symlink() and link.resolve() == skills, f'Broken discovery link: {link}')
    files = [ROOT / name for name in ("AGENTS.md", "CLAUDE.md", "GEMINI.md", ".usl/README.md", ".usl/setup.md")]
    files += list((ROOT / ".usl/contracts").glob("*.md"))
    files += list((ROOT / "docs/agents").glob("*.md"))
    for document in files:
        for link in re.findall(r"\]\(([^)]+)\)", document.read_text()):
            if "://" in link or link.startswith("#"):
                continue
            ensure((document.parent / link.split('#')[0]).exists(), f'Broken link in {document}: {link}')
    git("diff", "--cached", "--check")
    if "--pr" in sys.argv:
        require_branch(os.environ["PR_BRANCH"])
        base = os.environ["PR_BASE_SHA"]
        ensure(re.fullmatch('[0-9a-f]{40}', base), 'Invalid PR base SHA')
        git("diff", "--check", f"{base}...HEAD")
        for revision in git("rev-list", f"{base}..HEAD").splitlines():
            require_message(git("show", "-s", "--format=%B", revision),
                            git("show", "-s", "--format=%ae", revision))
    print("Agent policy, skill snapshots, links and requested history checks passed.")


if __name__ == "__main__":
    check()
