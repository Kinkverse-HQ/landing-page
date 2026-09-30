/** Primary app URL — change here to update all CTAs */
export const APP_URL = "https://app.kinkverse.org";

/** Legal documents are built from content/legal/ (see scripts/build-legal.mjs). */
export const PRIVACY_URL = "/legal/en/kinkverse-privacy";
export const TERMS_URL = "/legal/en/kinkverse-terms";
export const LEGAL_URL = "/legal/";
export const CONTACT_EMAIL = "hello@kinkverse.org";

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
