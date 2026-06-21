import { APP_URL, PRIVACY_URL, TERMS_URL } from "../constants";

export function Footer() {
  return (
    <footer className="border-t border-kv-border/60 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg text-kv-lavender">KinkVerse</p>
          <p className="mt-1 text-sm text-kv-muted">Link your kinks.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <a
                href={APP_URL}
                className="text-kv-lavender/90 underline-offset-2 hover:text-kv-purple-bright hover:underline focus-ring rounded-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open app
              </a>
            </li>
            <li>
              <a
                href={PRIVACY_URL}
                className="text-kv-muted underline-offset-2 hover:text-kv-lavender hover:underline focus-ring rounded-sm"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href={TERMS_URL}
                className="text-kv-muted underline-offset-2 hover:text-kv-lavender hover:underline focus-ring rounded-sm"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href={`https://www.instagram.com/goodboysobey/`}
                className="text-kv-muted underline-offset-2 hover:text-kv-lavender hover:underline focus-ring rounded-sm"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
