"""Mechanical collaboration rules; no network or Git mutations on import."""
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[2]
TYPES = r"feat|fix|docs|refactor|test|chore|build|ci|perf|revert"
BRANCH = re.compile(rf"[a-z][a-z0-9-]*/({TYPES})/[a-z0-9]+(?:-[a-z0-9]+)*")
SUBJECT = re.compile(rf"({TYPES})(\([^()\n]+\))?!?: [^\s].*")


def git(*args, check=True):
    return subprocess.run(["git", *args], cwd=ROOT, check=check,
                          text=True, capture_output=True).stdout.strip()


def policy():
    return json.loads((ROOT / ".usl/agent-policy.json").read_text())


def require_branch(branch):
    default = policy()["github"]["default_branch"]
    remote_head = git("symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD", check=False)
    protected = {"main", "master", default, remote_head.removeprefix("origin/")}
    if branch in protected or not BRANCH.fullmatch(branch):
        raise ValueError("Use <agent>/<type>/<kebab-topic> on a non-default branch.")
    return branch


def require_message(message, author_email):
    if not message or not SUBJECT.fullmatch(message.splitlines()[0]):
        raise ValueError("Commit subject must be a Conventional Commit.")
    email = policy()["github"]["agent_email"]
    trailers = subprocess.run(["git", "interpret-trailers", "--parse"], input=message,
                              text=True, capture_output=True, check=True).stdout
    pattern = rf"Co-authored-by: [^<>\n]+ <{re.escape(email)}>"
    if not any(re.fullmatch(pattern, line, re.IGNORECASE) for line in trailers.splitlines()):
        raise ValueError("Add the actual coding agent's Co-authored-by trailer.")
    if not author_email or author_email.casefold() == email.casefold():
        raise ValueError("Keep the driving human as Git author with their regular identity.")


def require_push(lines, branch):
    require_branch(branch)
    for line in lines.splitlines():
        local_ref, local_sha, remote_ref, remote_sha = line.split()
        expected = "refs/heads/" + branch
        if local_ref != expected or remote_ref != expected or set(local_sha) == {"0"}:
            raise ValueError("Push only the current working branch to its same-name remote branch.")
        if set(remote_sha) != {"0"}:
            result = subprocess.run(["git", "merge-base", "--is-ancestor", remote_sha, local_sha], cwd=ROOT, capture_output=True)
            if result.returncode:
                raise ValueError("Non-fast-forward or unknown remote history: fetch and resolve explicitly.")


def setup_path(path):
    exact = {"AGENTS.md", "CLAUDE.md", "GEMINI.md", "docs/README.md",
             ".agents/skills", ".claude/skills", ".github/copilot-instructions.md",
             ".github/pull_request_template.md", ".github/workflows/agent-contract.yml",
             ".cursor/rules/agent-contract.mdc"}
    return path in exact or path.startswith((".usl/", "docs/agents/"))


def require_identity():
    name, email = git("config", "user.name"), git("config", "user.email")
    ensure(name and email, "The human's regular Git identity must be configured")
    for role in ("AUTHOR", "COMMITTER"):
        ensure(git("var", f"GIT_{role}_IDENT").startswith(f"{name} <{email}> "),
               "Unexpected Git identity override")
    return email


def ensure(condition, message):
    if not condition:
        raise ValueError(message)
