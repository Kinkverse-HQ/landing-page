import { useEffect, useState } from "react";
import posthog from "posthog-js";
import {
  LOCKTOBER_END,
  LOCKTOBER_START,
  TELEGRAM_BOT_HANDLE,
  TELEGRAM_BOT_URL,
} from "../constants";

const DISMISS_KEY = "locktober-2026-dismissed";

/** Gap to the start as `14d 08h 22m 10s`, or null once the challenge is under way. */
function countdownTo(start: Date, now: Date): string | null {
  const seconds = Math.floor((start.getTime() - now.getTime()) / 1000);
  if (seconds <= 0) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds % 60)}s`;
}

/** localStorage throws in some privacy modes; a banner is not worth a blank page. */
function readDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function LocktoberBanner() {
  // Held as state rather than read during render so the first paint is
  // deterministic — the countdown appears on mount.
  const [now, setNow] = useState<Date | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (readDismissed()) {
      setDismissed(true);
      return;
    }

    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Self-retires after the challenge rather than waiting to be taken down.
  if (dismissed || (now && now >= LOCKTOBER_END)) return null;

  const countdown = now ? countdownTo(LOCKTOBER_START, now) : null;
  const status = now ? (countdown ? `Starts in ${countdown}` : "Locktober is live") : null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Dismissal just will not persist across reloads.
    }
  };

  const trackClick = () => {
    if (import.meta.env.VITE_PUBLIC_POSTHOG_KEY) {
      posthog.capture("locktober_banner_click", { source: "kinkverse_landing" });
    }
  };

  return (
    <div className="relative bg-kv-red text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-10 py-2 text-center sm:px-12">
        <p className="text-sm font-semibold sm:text-base">
          🔒 Locktober is back — drop your Telegram @ for daily cagechecks.
        </p>

        {status && (
          <span
            className="font-mono-label text-[10px] text-white/85 sm:text-xs"
            aria-hidden="true"
          >
            {status}
          </span>
        )}
        <span className="sr-only">Locktober starts 1 October 2026.</span>

        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackClick}
          className="rounded-sm border-2 border-white/80 px-3 py-1 text-xs font-semibold transition-colors hover:bg-white hover:text-kv-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
        >
          Open @{TELEGRAM_BOT_HANDLE}
        </a>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss Locktober announcement"
        className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-lg leading-none text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
      >
        ×
      </button>
    </div>
  );
}
