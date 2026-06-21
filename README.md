# KinkVerse Landing Page

Public marketing site for [kinkverse.org](https://kinkverse.org). The app lives at [app.kinkverse.org](https://app.kinkverse.org).

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # optional — preview production build
```

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source**: **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys `dist/`.
4. For the custom domain `kinkverse.org`, DNS should point to GitHub Pages; `public/CNAME` is included in the build output.

`vite.config.ts` uses `base: "/"` for root custom-domain hosting.

## Where to change things

| What | Where |
|------|--------|
| CTA / app URL | `src/constants.ts` → `APP_URL` |
| Page copy | `src/App.tsx` (and section components) |
| Legal / contact links | `src/constants.ts` (`PRIVACY_URL`, `TERMS_URL`, `CONTACT_EMAIL`) |
| SEO / OG tags | `index.html` |
| OG image (TODO) | `index.html` — add `og:image` when asset exists |
| Colors / fonts / effects | `src/index.css` (`@theme`) |
| Logo / images | `public/` — swap favicon or add assets and reference in components |

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Static output — no backend

## Project structure

```
src/
  App.tsx              # Page sections and copy
  constants.ts         # URLs
  components/          # Button, Header, Footer, cards, chips, etc.
  index.css            # Theme tokens and custom utilities
public/
  CNAME                # kinkverse.org for GitHub Pages
.github/workflows/
  deploy.yml           # CI deploy to Pages
```
