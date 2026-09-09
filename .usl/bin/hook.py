"""Git hook dispatcher; preserves the application's existing product pre-commit hook."""
from pathlib import Path
import subprocess
import sys
from policy import ROOT, git, require_branch, require_message, require_identity, require_push, setup_path


def main():
    event = sys.argv[1]
    branch = require_branch(git("branch", "--show-current"))
    if event == "commit-msg":
        require_message(Path(sys.argv[2]).read_text(), require_identity())
    elif event == "pre-push":
        if sys.argv[2] != "origin":
            raise ValueError("The configured collaboration remote is origin.")
        require_push(sys.stdin.read(), branch)
    elif event == "pre-commit":
        subprocess.run([sys.executable, "-B", str(ROOT / ".usl/bin/check.py")], check=True)
        paths = git("diff", "--cached", "--name-only", "-z").split("\0")
        product_hook = ROOT / ".githooks/pre-commit"
        if product_hook.exists() and not all(setup_path(p) for p in paths if p):
            subprocess.run(["bash", str(product_hook)], cwd=ROOT, check=True)
    else:
        raise ValueError("Unknown hook event")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, subprocess.CalledProcessError) as error:
        sys.exit(f"Agent guard: {error}")
