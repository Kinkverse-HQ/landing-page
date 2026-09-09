# Landing-page boundaries

The maintained repository is `Kinkverse-HQ/landing-page`; source at setup was `origin/main` (`85b7183`). The old local `main` at `ec33fa1` was a transfer notice, not the maintained site.
This is a small React/TypeScript/Vite site. Keep URL constants in `src/constants.ts`; verify claims and CTAs against actual product behavior.
PostHog configuration is environment-driven in `src/main.tsx`. Public client configuration is not evidence of consent or privacy compliance; do not broaden collection as incidental cleanup.
The existing deployment workflow publishes GitHub Pages from `main` or manual dispatch. PR verification must not receive deployment permissions.
Do not overwrite old ignored `dist/` or `node_modules/` merely to inspect maintained source.
