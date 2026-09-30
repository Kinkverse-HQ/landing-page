/** Primary app URL — change here to update all CTAs */
export const APP_URL = "https://app.kinkverse.org";

/** Legal documents are built from content/legal/ (see scripts/build-legal.mjs). */
export const PRIVACY_URL = "/legal/en/kinkverse-privacy";
export const TERMS_URL = "/legal/en/kinkverse-terms";
export const LEGAL_URL = "/legal/";
export const LOCKTOBER_RULES_URL = "/legal/en/locktober-2026-rules";
export const CONTACT_EMAIL = "hello@kinkverse.org";

/**
 * community.kinkverse.org, built from apps/community in the kinkverse repo
 * (Kinkverse-HQ/kinkverse#619). Until that site is deployed these links 404.
 */
export const COMMUNITY_URL = "https://community.kinkverse.org/";
export const COMMUNITY_LINKS = {
  why: `${COMMUNITY_URL}blog/why-were-opening-kinkverse/`,
  blog: `${COMMUNITY_URL}blog/`,
  people: `${COMMUNITY_URL}people/`,
  contribute: `${COMMUNITY_URL}contribute/`,
} as const;
export const BLUESKY_URL = "https://bsky.app/profile/kinkverse.org";
export const INSTAGRAM_URL = "https://www.instagram.com/kinkverse.app/";

/** Locktober 2026 — Telegram bot that runs the challenge and sends daily cagechecks */
export const TELEGRAM_BOT_HANDLE = "kinkverseappbot";

/**
 * Deep link into the bot. Hitting /start hands the bot the visitor's Telegram
 * handle, so no signup form is needed. The start payload identifies this site
 * as the source, separating it from the goodboys.club storefront banner.
 */
export const TELEGRAM_BOT_URL = `https://t.me/${TELEGRAM_BOT_HANDLE}?start=locktober_kv`;

/**
 * Challenge window, constructed in the visitor's own timezone: `new Date(y, m, d)`
 * is local midnight by definition (month index 9 is October).
 * The banner counts down to the start and removes itself after the end.
 */
export const LOCKTOBER_START = new Date(2026, 9, 1);
export const LOCKTOBER_END = new Date(2026, 10, 1);

/**
 * The date the page asks players to lock in by. Registration itself stays open
 * until 30 October (Locktober rules, section 2). 16 October is the last day of
 * the €31 Kinkverse+ early-bird year (Kinkverse+ terms), so the page gives that
 * as the reason and never calls it a closing date.
 */
export const LOCK_IN_BY = "october 16";

/** The early-bird year closes 17 October 2026 at 00:00 UTC (Kinkverse+ terms). */
export const EARLY_BIRD_END = new Date(Date.UTC(2026, 9, 17));

/** True while "lock in by october 16" and the €31 year are still true statements. */
export function earlyBirdOpen(now: Date = new Date()): boolean {
  return now < EARLY_BIRD_END;
}
