import {
  APP_URL,
  BLUESKY_URL,
  COMMUNITY_URL,
  INSTAGRAM_URL,
  LEGAL_URL,
  LOCKTOBER_RULES_URL,
  PRIVACY_URL,
  TERMS_URL,
} from "../constants";

const LINKS = [
  { href: APP_URL, label: "open the app", external: true },
  { href: COMMUNITY_URL, label: "community", external: true },
  { href: INSTAGRAM_URL, label: "Instagram", external: true },
  { href: BLUESKY_URL, label: "Bluesky", external: true },
  { href: LOCKTOBER_RULES_URL, label: "Locktober rules", external: false },
  { href: PRIVACY_URL, label: "privacy", external: false },
  { href: TERMS_URL, label: "terms", external: false },
  { href: LEGAL_URL, label: "legal", external: false },
] as const;

export function Footer() {
  return (
    <footer className="border-t-[1.5px] border-kv-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg text-kv-lavender">Kinkverse</p>
          <p className="mt-1 text-sm text-kv-muted">Link your kinks.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="focus-ring text-kv-muted underline-offset-2 hover:text-kv-lavender hover:underline"
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
