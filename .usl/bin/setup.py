"""Install local hooks without replacing unknown existing hooks or Git identities."""
from pathlib import Path
import subprocess
import sys
from policy import ROOT, git

subprocess.run([sys.executable, "-B", str(ROOT / ".usl/bin/check.py")], check=True)
active = git("config", "--get", "core.hooksPath", check=False)
if active not in ("", ".githooks", ".usl/hooks"):
    sys.exit(f"Preserve existing hooksPath {active!r}; integrate it explicitly before setup.")
for directory in (Path(git("rev-parse", "--git-common-dir")) / "hooks", ROOT / ".githooks"):
    if not directory.is_absolute():
        directory = ROOT / directory
    for hook in directory.glob("*"):
        if hook.is_file() and not hook.name.endswith(".sample"):
            if directory == ROOT / ".githooks" and hook.name == "pre-commit":
                continue  # Called by our dispatcher whenever product paths are staged.
            sys.exit(f"Preserve existing hook {hook}; integrate it before setup.")
for hook in (ROOT / ".usl/hooks").iterdir():
    hook.chmod(hook.stat().st_mode | 0o111)
git("config", "--local", "core.hooksPath", ".usl/hooks")
print("Installed agent hooks; Git identity and the existing product hook are preserved.")
