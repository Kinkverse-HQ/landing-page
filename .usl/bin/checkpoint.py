"""Verify explicitly staged work, commit with both identities, and push its branch."""
import argparse
import re
import shlex
import subprocess
import sys
from policy import ROOT, git, policy, require_branch, require_message, require_identity, ensure


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--message", required=True)
    parser.add_argument("--agent", required=True, help="Actual coding agent name, e.g. Codex")
    parser.add_argument("--check", action="append", required=True, help="Verification command; shell operators are not supported")
    args = parser.parse_args()
    config = policy()
    ensure(config["git"] == {"auto_commit": True, "auto_push": "non-default"}, "Automatic checkpoint policy is disabled")
    branch = require_branch(git("branch", "--show-current"))
    ensure(git("config", "core.hooksPath") == ".usl/hooks", "Run .usl/bin/setup.py first")
    ensure(re.fullmatch(r"[A-Za-z][A-Za-z0-9 ._-]*", args.agent), "Invalid agent name")
    email = require_identity()
    message = args.message + f"\n\nCo-authored-by: {args.agent} <{config['github']['agent_email']}>\n"
    require_message(message, email)
    staged = set(git("diff", "--cached", "--name-only", "-z").split("\0")) - {""}
    ensure(staged, "Stage only the reviewed task paths first")
    def unmixed():
        unstaged = set(git("diff", "--name-only", "-z").split("\0"))
        ensure(not staged & unstaged, "Staged paths also have unstaged edits; isolate them first")
    unmixed()
    repository = config["github"]["repository"]
    origin = git("remote", "get-url", "origin")
    ensure(origin in (f"git@github.com:{repository}.git", f"https://github.com/{repository}.git", f"https://github.com/{repository}"), "Origin differs from repository policy")
    def gh(*arguments):
        return subprocess.check_output(["gh", *arguments], cwd=ROOT, text=True).strip()
    ensure(gh("api", "user", "--jq", ".login") == config["github"]["login"], "Wrong GitHub account")
    ensure(gh("api", f"repos/{repository}", "--jq", ".permissions.push") == "true", "GitHub write access is unavailable")
    if any(path.startswith(".github/workflows/") for path in staged):
        headers = gh("api", "--include", "user").split("\n\n", 1)[0]
        scopes = re.search(r"^x-oauth-scopes:\s*(.*)$", headers, re.MULTILINE | re.IGNORECASE)
        if scopes:  # Fine-grained credentials may omit this classic/OAuth-token header.
            ensure("workflow" in {scope.strip() for scope in scopes.group(1).split(",")},
                   "GitHub token lacks workflow scope; refresh gh auth before committing CI files")
    default = gh("api", f"repos/{repository}", "--jq", ".default_branch")
    ensure(branch != default, "Cannot checkpoint the remote default branch")
    ensure(not git("config", "--get-all", "remote.origin.pushurl", check=False),
           "Origin has a separate push URL; reconcile it explicitly before checkpointing")
    command = ["git", "-c", "url.https://github.com/.insteadOf=git@github.com:",
               "-c", "credential.helper=", "-c", "credential.helper=!gh auth git-credential"]
    def sync(*arguments):
        subprocess.run([*command, *arguments], cwd=ROOT, check=True)
    sync("fetch", "origin")
    remote_ref = "refs/remotes/origin/" + branch
    if git("rev-parse", "--verify", remote_ref, check=False):
        git("merge-base", "--is-ancestor", remote_ref, "HEAD")
    tree = git("write-tree")
    for check in args.check:
        subprocess.run(shlex.split(check), cwd=ROOT, check=True)
    ensure(git("write-tree") == tree, "Verification changed staged content; review again")
    unmixed()
    subprocess.run(["git", "commit", "-F", "-"], input=message, text=True, cwd=ROOT, check=True)
    sync("fetch", "origin")
    sync("push", "--set-upstream", "origin", branch)
    print(f"Committed {git('rev-parse', '--short', 'HEAD')} and pushed origin/{branch}.")


if __name__ == "__main__":
    try:
        main()
    except (AssertionError, ValueError, subprocess.CalledProcessError) as error:
        sys.exit(f"Checkpoint stopped: {error}. Inspect git status/log; do not bypass or retry blindly.")
