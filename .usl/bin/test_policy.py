"""Isolated Git integration checks; never use real accounts or network remotes."""
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
import policy
from policy import require_branch, require_message, require_push, setup_path

BRANCH = "codex/chore/fixture"
EMAIL = "318050048+elio-usl@users.noreply.github.com"
MESSAGE = f"chore(agents): verify fixture\n\nCo-authored-by: Codex <{EMAIL}>\n"


class GitFixture(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.original_root = policy.ROOT
        self.addCleanup(setattr, policy, "ROOT", self.original_root)
        self.env = {k: v for k, v in os.environ.items() if not k.startswith(("GIT_", "PYTHON"))}
        self.env.update(GIT_CONFIG_NOSYSTEM="1", GIT_CONFIG_GLOBAL=os.devnull)
        self.call("git", "init", "-q", "--initial-branch=" + BRANCH)
        self.call("git", "config", "user.name", "Fixture Human")
        self.call("git", "config", "user.email", "human@example.test")
        self.call("git", "config", "commit.gpgsign", "false")
        shutil.copytree(policy.ROOT / ".usl/bin", self.root / ".usl/bin", ignore=shutil.ignore_patterns("__pycache__"))
        shutil.copytree(policy.ROOT / ".usl/hooks", self.root / ".usl/hooks")
        shutil.copy2(policy.ROOT / ".usl/agent-policy.json", self.root / ".usl/agent-policy.json")
        # This fixture tests dispatch, not instruction content (check.py verifies the real tree separately).
        (self.root / ".usl/bin/check.py").write_text("print('fixture content check')\n")
        (self.root / "existing.txt").write_text("baseline\n")
        self.call("git", "add", ".")
        self.call("git", "commit", "-q", "-m", MESSAGE)
        self.call("git", "config", "core.hooksPath", ".usl/hooks")
        policy.ROOT = self.root

    def call(self, *args, check=True, **kwargs):
        return subprocess.run(args, cwd=self.root, env=self.env, text=True,
                              capture_output=True, check=check, **kwargs)

    def stage(self, path="AGENTS.md"):
        (self.root / path).write_text("fixture change\n")
        self.call("git", "add", "--", path)


class PolicyTests(GitFixture):
    def test_branch_rejects_defaults_detached_and_nonconventional_names(self):
        self.assertEqual(require_branch(BRANCH), BRANCH)
        for value in ["main", "master", "", "feature", "codex/topic", "codex/feat/Bad_name"]:
            with self.subTest(value=value), self.assertRaises(ValueError):
                require_branch(value)

    def test_actual_remote_default_is_protected(self):
        self.call("git", "symbolic-ref", "refs/remotes/origin/HEAD", "refs/remotes/origin/" + BRANCH)
        with self.assertRaises(ValueError):
            require_branch(BRANCH)

    def test_requires_conventional_subject_agent_trailer_and_human_author(self):
        require_message(MESSAGE, "human@example.test")
        for message, email in [("change things", "human@example.test"),
                               ("fix: change things", "human@example.test"),
                               (MESSAGE + "\nAn ordinary paragraph after the trailer.\n", "human@example.test"),
                               (MESSAGE, EMAIL)]:
            with self.subTest(message=message), self.assertRaises(ValueError):
                require_message(message, email)

    def test_push_rejects_base_tags_deletion_and_unrelated_destinations(self):
        sha = self.call("git", "rev-parse", "HEAD").stdout.strip()
        zero = "0" * 40
        require_push(f"refs/heads/{BRANCH} {sha} refs/heads/{BRANCH} {zero}", BRANCH)
        for target in ["refs/heads/main", "refs/tags/v1", "refs/heads/codex/fix/other"]:
            with self.subTest(target=target), self.assertRaises(ValueError):
                require_push(f"refs/heads/{BRANCH} {sha} {target} {zero}", BRANCH)
        with self.assertRaises(ValueError):
            require_push(f"(delete) {zero} refs/heads/{BRANCH} {sha}", BRANCH)
        with self.assertRaises(ValueError):
            require_push(f"refs/heads/{BRANCH} {sha} refs/heads/{BRANCH} {'f' * 40}", BRANCH)

    def test_commit_hook_rejects_invalid_subject_and_identity_override(self):
        self.stage()
        self.assertNotEqual(self.call("git", "commit", "-m", "bad", check=False).returncode, 0)
        self.env["GIT_AUTHOR_EMAIL"] = EMAIL
        self.assertNotEqual(self.call("git", "commit", "-m", MESSAGE, check=False).returncode, 0)

    def test_product_hook_runs_for_mixed_scope_and_propagates_failure(self):
        hook = self.root / ".githooks/pre-commit"
        hook.parent.mkdir()
        hook.write_text("#!/bin/sh\nprintf tested > product-hook-ran\nexit 7\n")
        self.stage()
        self.call("git", "commit", "-q", "-m", MESSAGE)
        self.assertFalse((self.root / "product-hook-ran").exists())
        self.stage("runtime.py")
        self.stage("AGENTS.md")
        result = self.call("git", "commit", "-m", MESSAGE, check=False)
        self.assertNotEqual(result.returncode, 0)
        self.assertTrue((self.root / "product-hook-ran").exists())
        for path in ["client/app/page.tsx", ".claude/hooks/guard.sh", "scripts/test.sh"]:
            self.assertFalse(setup_path(path))


if __name__ == "__main__":
    unittest.main()
