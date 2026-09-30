// Build-time Markdown -> static HTML for the legal documents.
// Reads content/legal/{fr,en}/*.md and writes dist/legal/<lang>/<slug>/index.html
// plus dist/legal/index.html, dist/legal/legal.css and dist/sitemap.xml.
// Runs after `vite build` (see the "build" script in package.json).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content", "legal");
const DIST = join(ROOT, "dist");
const SITE = "https://kinkverse.org";

/** Pack order = index order. `pair` is the slug of the other language's version of the same document. */
const DOCS = [
  { lang: "fr", slug: "mentions-legales", pair: "legal-notice", group: "kinkverse",
    desc: "Éditeur, vendeur, hébergeurs et contact juridique de Kinkverse." },
  { lang: "fr", slug: "kinkverse-cgu", pair: "kinkverse-terms", group: "kinkverse",
    desc: "Conditions générales d’utilisation et règles de la communauté Kinkverse." },
  { lang: "fr", slug: "kinkverse-cgv", pair: "kinkverse-plus-terms", group: "kinkverse",
    desc: "Conditions générales de vente de l’abonnement Kinkverse+." },
  { lang: "fr", slug: "kinkverse-confidentialite", pair: "kinkverse-privacy", group: "kinkverse",
    desc: "Politique de confidentialité de Kinkverse : données, finalités, prestataires et vos droits." },
  { lang: "fr", slug: "resiliation-et-remboursements", pair: "cancellation-and-refunds", group: "kinkverse",
    desc: "Résiliation, rétractation et remboursements pour Kinkverse+, les Stars et la Boutique." },
  { lang: "fr", slug: "locktober-2026-reglement", pair: "locktober-2026-rules", group: "kinkverse",
    desc: "Règlement de participation au défi Locktober 2026." },
  { lang: "fr", slug: "stars-et-treats", pair: "stars-and-treats-terms", group: "kinkverse",
    desc: "Conditions économiques et de fidélité des Stars et des Good Boy Treats." },
  { lang: "en", slug: "legal-notice", pair: "mentions-legales", group: "kinkverse",
    desc: "Publisher, seller, hosting providers and legal contact for Kinkverse." },
  { lang: "en", slug: "kinkverse-terms", pair: "kinkverse-cgu", group: "kinkverse",
    desc: "Terms of use and community rules for Kinkverse." },
  { lang: "en", slug: "kinkverse-plus-terms", pair: "kinkverse-cgv", group: "kinkverse",
    desc: "Terms of sale for the Kinkverse+ subscription." },
  { lang: "en", slug: "kinkverse-privacy", pair: "kinkverse-confidentialite", group: "kinkverse",
    desc: "Kinkverse privacy policy: data, purposes, service providers and your rights." },
  { lang: "en", slug: "cancellation-and-refunds", pair: "resiliation-et-remboursements", group: "kinkverse",
    desc: "Cancellation, withdrawal and refunds for Kinkverse+, Stars and the Boutique." },
  { lang: "en", slug: "locktober-2026-rules", pair: "locktober-2026-reglement", group: "kinkverse",
    desc: "Participation rules for the Locktober 2026 challenge." },
  { lang: "en", slug: "stars-and-treats-terms", pair: "stars-et-treats", group: "kinkverse",
    desc: "Economy and loyalty terms for Stars and Good Boy Treats." },
];

const UI = {
  fr: { home: "Accueil Kinkverse", all: "Tous les documents", other: "English version",
    contents: "Sommaire", print: "Imprimer", permalink: "Lien vers cette section", legal: "Documents juridiques", skip: "Aller au contenu" },
  en: { home: "Kinkverse home", all: "All documents", other: "Version française",
    contents: "Contents", print: "Print", permalink: "Link to this section", legal: "Legal documents", skip: "Skip to content" },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const route = (lang, slug) => `/legal/${lang}/${slug}`;
const byKey = new Map(DOCS.map((d) => [`${d.lang}/${d.slug}`, d]));

/** Accent-folded kebab slug: "4. Freezes et interruption" -> "4-freezes-et-interruption". */
function slugify(text) {
  return text
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function render(doc, md) {
  const seen = new Map();
  const toc = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        const plain = tokens.map((t) => t.raw ?? t.text ?? "").join("").replace(/[*_`]/g, "");
        if (depth === 1) return `<h1>${inner}</h1>\n`;
        let id = slugify(plain) || "section";
        const n = seen.get(id) ?? 0;
        seen.set(id, n + 1);
        if (n) id = `${id}-${n + 1}`;
        if (depth === 2) toc.push({ id, text: plain });
        return `<h${depth} id="${id}">${inner}<a class="anchor" href="#${id}" aria-label="${esc(UI[doc.lang].permalink)}">#</a></h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        let url = href;
        const m = /^(?:\.\.\/(fr|en)\/|\.\/)?([a-z0-9-]+)\.md(#.*)?$/.exec(href);
        if (m) {
          const lang = m[1] ?? doc.lang;
          if (!byKey.has(`${lang}/${m[2]}`)) throw new Error(`${doc.lang}/${doc.slug}: link to unknown document ${href}`);
          url = route(lang, m[2]) + (m[3] ?? "");
        }
        const t = title ? ` title="${esc(title)}"` : "";
        const ext = /^https?:/.test(url) ? ' rel="noopener noreferrer"' : "";
        return `<a href="${esc(url)}"${t}${ext}>${text}</a>`;
      },
    },
  });
  return { html: marked.parse(md), toc };
}

const head = (lang, title, desc, canonical, alternates) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<link rel="canonical" href="${SITE}${canonical}" />
${alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${SITE}${a.href}" />`).join("\n")}
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${SITE}${canonical}" />
<meta name="twitter:card" content="summary" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Permanent+Marker&display=swap" rel="stylesheet" />
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="stylesheet" href="/legal/legal.css" />
</head>`;

const chrome = (lang, inner, switchHtml = "") => `<body>
<a class="skip" href="#content">${UI[lang].skip}</a>
<header class="site-header">
  <div class="bar">
    <a class="brand" href="/" aria-label="${UI[lang].home}"><img src="/kinkverse-red-rectangle.png" alt="Kinkverse" height="28" /></a>
    <nav aria-label="Legal">
      <a href="/legal/">${UI[lang].all}</a>${switchHtml}
    </nav>
  </div>
</header>
<main id="content">
${inner}
</main>
<footer class="site-footer">
  <p><a href="/">kinkverse.org</a> · <a href="/legal/">${UI[lang].legal}</a> · <a href="mailto:hello@kinkverse.org">hello@kinkverse.org</a></p>
</footer>
</body>
</html>
`;

function writePage(path, html) {
  const file = join(DIST, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// ---- documents
const problems = [];
const pages = [];
for (const doc of DOCS) {
  const file = join(CONTENT, doc.lang, `${doc.slug}.md`);
  if (!existsSync(file)) throw new Error(`missing ${file}`);
  const md = readFileSync(file, "utf8");
  if (/\{\{|TODO|\bGBT\b|\bGBC\b|odoo|valentin|viennot/i.test(md)) problems.push(`${doc.lang}/${doc.slug}: placeholder or forbidden token`);
  const title = /^# (.+)$/m.exec(md)?.[1];
  const versionLine = /^(Version [^—\n]+— [^.\n]+)/m.exec(md)?.[1];
  if (!title || !versionLine) throw new Error(`${file}: no title or version line`);
  const { html, toc } = render(doc, md);
  const pair = doc.pair ? byKey.get(`${doc.lang === "fr" ? "en" : "fr"}/${doc.pair}`) : null;
  if (doc.pair && !pair) throw new Error(`${file}: pair ${doc.pair} not found`);
  const ui = UI[doc.lang];
  const switchHtml = pair
    ? `<a href="${route(pair.lang, pair.slug)}" hreflang="${pair.lang}" lang="${pair.lang}">${ui.other}</a>`
    : "";
  const alternates = [{ lang: doc.lang, href: route(doc.lang, doc.slug) }];
  if (pair) alternates.push({ lang: pair.lang, href: route(pair.lang, pair.slug) });
  const tocHtml = toc.length > 3
    ? `<nav class="toc" aria-label="${ui.contents}"><details><summary>${ui.contents}</summary><ol>${toc
        .map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join("")}</ol></details></nav>`
    : "";
  const body = html.replace(/<\/h1>\n/, `</h1>\n<p class="version">${esc(versionLine)}</p>\n${tocHtml}\n<article class="doc">\n`) + "</article>";
  const page =
    head(doc.lang, `${title} — Kinkverse`, doc.desc, route(doc.lang, doc.slug), alternates) +
    chrome(doc.lang,
      `<div class="wrap">\n${body}\n<p class="noprint print-link"><button type="button" onclick="window.print()">${ui.print}</button></p></div>`,
      switchHtml);
  writePage(join("legal", doc.lang, doc.slug), page);
  pages.push(route(doc.lang, doc.slug));
  doc.title = title;
  doc.version = versionLine;
}

// ---- index
const li = (d) => `<li><a href="${route(d.lang, d.slug)}" hreflang="${d.lang}">${esc(d.title)}</a><span class="v">${esc(d.version)}</span></li>`;
const list = (lang, group) => `<ul class="docs">${DOCS.filter((d) => d.lang === lang && d.group === group).map(li).join("")}</ul>`;
const indexInner = `<div class="wrap">
<h1>Legal documents · Documents juridiques</h1>
<div class="cols">
<section lang="fr" aria-labelledby="fr-h"><h2 id="fr-h">Français</h2>
<h3>Kinkverse</h3>${list("fr", "kinkverse")}
<p class="note">Documents de la Boutique du Good Boys Club : <a href="https://boutique.goodboys.club/fr/content/cgv">boutique.goodboys.club</a>.</p>
</section>
<section lang="en" aria-labelledby="en-h"><h2 id="en-h">English</h2>
<h3>Kinkverse</h3>${list("en", "kinkverse")}
<p class="note">Good Boys Club Boutique documents: <a href="https://boutique.goodboys.club/fr/content/cgv">boutique.goodboys.club</a>.</p>
</section>
</div></div>`;
writePage("legal", head("en", "Legal documents · Documents juridiques — Kinkverse",
  "Terms, privacy policy, legal notice and rules of Kinkverse, in French and English. Conditions, confidentialité, mentions légales et règlement de Kinkverse.",
  "/legal/", [{ lang: "en", href: "/legal/" }]) + chrome("en", indexInner));
pages.unshift("/legal/");

// ---- stylesheet and sitemap
writeFileSync(join(DIST, "legal", "legal.css"), readFileSync(join(ROOT, "scripts", "legal.css"), "utf8"));
const urls = ["/", ...pages];
writeFileSync(join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join("\n")}\n</urlset>\n`);

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`legal: wrote ${DOCS.length} documents + index`);
