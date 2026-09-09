"""Exercise commit-and-push transactions against a disposable bare Git repository."""
from pathlib import Path
import json
import shutil
import sys
import unittest
from test_policy import GitFixture, BRANCH, EMAIL


class CheckpointTests(GitFixture):
    def setUp(self):
        super().setUp()
        self.remote = self.root / "remote.git"
        self.call("git", "init", "--bare", "-q", str(self.remote))
        config = json.loads((self.root / ".usl/agent-policy.json").read_text())
        self.call("git", "remote", "add", "origin", "https://github.com/" + config["github"]["repository"] + ".git")
        binaries = self.root / "test-bin"
        binaries.mkdir()
        self.env["GIT_ALLOW_PROTOCOL"] = "file"
        real_git = shutil.which("git")
        # Only network transport is replaced; commits, hooks, fetches and pushes use real Git.
        wrapper = f'''#!{sys.executable}
import os,sys
args=sys.argv[1:]
rest=list(args)
while rest and rest[0]=='-c':rest=rest[2:]
if rest and rest[0]=='push' and os.environ.get('KV_FIXTURE_REJECT_PUSH'):sys.exit(1)
if rest and rest[0] in ('fetch','push'):
 args=['-c','url.file://{self.remote}.insteadOf=https://github.com/{config["github"]["repository"]}.git',*rest]
os.execv({real_git!r},[{real_git!r},*args])
'''
        (binaries / "git").write_text(wrapper)
        (binaries / "gh").write_text(f'''#!{sys.executable}
import sys
values={{'.login':'elio-usl','.permissions.push':'true','.default_branch':'main','user':'X-OAuth-Scopes: repo'}}
print(values[sys.argv[-1]])
''')
        for path in binaries.iterdir():
            path.chmod(0o755)
        self.env["PATH"] = str(binaries) + ":" + self.env["PATH"]

    def checkpoint(self, verification=None):
        return self.call(sys.executable, "-B", ".usl/bin/checkpoint.py", "--message",
                         "chore(agents): test transaction", "--agent", "Codex", "--check",
                         verification or f"{sys.executable} -B .usl/bin/check.py", check=False)

    def test_success_pushes_only_reviewed_stage_and_records_both_identities(self):
        self.stage()
        (self.root / "existing.txt").write_text("preserve this unstaged human edit\n")
        result = self.checkpoint()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        local = self.call("git", "rev-parse", "HEAD").stdout
        remote = self.call("git", "--git-dir", str(self.remote), "rev-parse", "refs/heads/" + BRANCH).stdout
        self.assertEqual(local, remote)
        self.assertEqual(self.call("git", "show", "HEAD:existing.txt").stdout, "baseline\n")
        self.assertIn("preserve", (self.root / "existing.txt").read_text())
        self.assertIn("human@example.test", self.call("git", "show", "-s", "--format=%ae").stdout)
        self.assertIn(f"Codex <{EMAIL}>", self.call("git", "show", "-s", "--format=%B").stdout)
        self.assertEqual(self.call("git", "rev-parse", "--abbrev-ref", "@{upstream}").stdout.strip(), "origin/" + BRANCH)

    def test_failed_verification_creates_no_commit_or_push(self):
        self.stage()
        before = self.call("git", "rev-parse", "HEAD").stdout
        result = self.checkpoint(f'{sys.executable} -c "raise SystemExit(1)"')
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(before, self.call("git", "rev-parse", "HEAD").stdout)
        self.assertEqual(self.call("git", "--git-dir", str(self.remote), "for-each-ref").stdout, "")

    def test_missing_workflow_scope_creates_no_commit(self):
        (self.root / ".github/workflows").mkdir(parents=True)
        self.stage(".github/workflows/fixture.yml")
        before = self.call("git", "rev-parse", "HEAD").stdout
        result = self.checkpoint()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("workflow scope", result.stderr)
        self.assertEqual(before, self.call("git", "rev-parse", "HEAD").stdout)

    def test_failed_push_preserves_the_verified_local_commit(self):
        self.stage()
        before = self.call("git", "rev-parse", "HEAD").stdout
        self.env["KV_FIXTURE_REJECT_PUSH"] = "1"
        result = self.checkpoint()
        self.assertNotEqual(result.returncode, 0)
        self.assertNotEqual(before, self.call("git", "rev-parse", "HEAD").stdout)
        self.assertEqual(self.call("git", "diff", "--cached", "--name-only").stdout, "")
        self.assertEqual(self.call("git", "--git-dir", str(self.remote), "for-each-ref").stdout, "")

    def test_mixed_staged_file_is_rejected(self):
        self.stage()
        (self.root / "AGENTS.md").write_text("another person's edit\n")
        result = self.checkpoint()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("isolate", result.stderr)

    def test_setup_preserves_unknown_hooks(self):
        self.call("git", "config", "core.hooksPath", "custom-hooks")
        result = self.call(sys.executable, "-B", ".usl/bin/setup.py", check=False)
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.call("git", "config", "core.hooksPath").stdout.strip(), "custom-hooks")


if __name__ == "__main__":
    unittest.main()
