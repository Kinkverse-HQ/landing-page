/** Primary app URL — change here to update all CTAs */
export const APP_URL = "https://app.kinkverse.org";

/** Legal documents are built from content/legal/ (see scripts/build-legal.mjs). */
export const PRIVACY_URL = "/legal/en/kinkverse-privacy";
export const TERMS_URL = "/legal/en/kinkverse-terms";
export const LEGAL_URL = "/legal/";
export const LOCKTOBER_RULES_URL = "/legal/en/locktober-2026-rules/";
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
 * The Kinkverse+ early-bird year, in stages (owner, 16 October 2026): €31 through
 * November 1st, then €42 through January 15th, 2027. Each stage closes at 00:00 UTC
 * the next day (Kinkverse+ terms, section 3). Registration for Locktober itself stays
 * open until 30 October (Locktober rules, section 2), so the page names the stage's
 * last day as the reason to act and never calls it a closing date for the challenge.
 */
export const EARLY_BIRD_STAGES = [
  { price: "€31", until: "November 1st", closes: new Date(Date.UTC(2026, 10, 2)) },
  { price: "€42", until: "January 15th", closes: new Date(Date.UTC(2027, 0, 16)) },
] as const;

/** The stage whose price and last day are still true statements, or null after the last. */
export function earlyBirdStage(now: Date = new Date()) {
  return EARLY_BIRD_STAGES.find((stage) => now < stage.closes) ?? null;
}

