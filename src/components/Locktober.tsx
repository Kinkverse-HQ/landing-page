import posthog from "posthog-js";
import {
  earlyBirdOpen,
  LOCK_IN_BY,
  LOCKTOBER_RULES_URL,
  TELEGRAM_BOT_URL,
} from "../constants";
import { Button } from "./Button";
import { Fold } from "./Fold";

const FACTS = [
  ["31", "days locked"],
  ["1", "photo a day"],
  ["3", "players judge it"],
  ["$50", "KINK3D gift card a week"],
] as const;

function trackStart() {
  if (import.meta.env.VITE_PUBLIC_POSTHOG_KEY) {
    posthog.capture("locktober_cta_click", { source: "kinkverse_landing_section" });
  }
}

/**
 * The season's game, told in the Club's voice. Every rule here is in the
 * published Locktober 2026 rules; the folds only simplify them.
 */
export function Locktober() {
  const earlyBird = earlyBirdOpen();

  return (
    <section
      id="locktober"
      aria-labelledby="locktober-heading"
      className="scroll-mt-44 border-y-[1.5px] border-kv-border bg-kv-bg-deep px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-14">
          <div>
            <p className="font-mono-label mb-4 text-xs text-kv-purple-bright">
              Locktober 2026 · the Good Boys Club
            </p>
            <h2
              id="locktober-heading"
              className="font-head kv-caps mb-5 text-5xl leading-[0.95] text-kv-lavender sm:text-7xl"
            >
              31 days locked.
            </h2>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-kv-lavender/90 sm:text-xl">
              a cage check every day, judged by other locked boys. make it to
              31 and the Locktober badge goes on your Kinkverse.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={TELEGRAM_BOT_URL} onClick={trackStart}>
                start in Telegram
              </Button>
              <Button href={LOCKTOBER_RULES_URL} variant="secondary" external={false}>
                read the rules
              </Button>
            </div>

            <p className="font-mono text-xs text-kv-muted">
              18+ · Telegram · Kinkverse+ required
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <img
              src="/sticker-cage.png"
              alt=""
              width={150}
              height={178}
              className="hidden self-end lg:block"
            />
            {earlyBird && (
              <aside className="panel p-5 sm:p-6" aria-labelledby="lock-in-heading">
                <p
                  id="lock-in-heading"
                  className="font-head kv-caps mb-2 text-2xl text-kv-lavender sm:text-3xl"
                >
                  lock in by {LOCK_IN_BY}
                </p>
                <p className="text-sm leading-relaxed text-kv-lavender/85 sm:text-base">
                  it's the last day for the Kinkverse+ early-bird year: €31 for
                  twelve months, instead of €12 a month. your 31 days start
                  whenever you lock.
                </p>
              </aside>
            )}
          </div>
        </div>

        <ul className="my-12 grid grid-cols-2 gap-px border-[1.5px] border-kv-border bg-kv-border sm:grid-cols-4">
          {FACTS.map(([value, label]) => (
            <li key={label} className="bg-kv-bg-deep px-4 py-5 text-balance">
              <span className="font-head block text-4xl text-kv-lavender">{value}</span>
              <span className="font-mono-label text-[10px] text-kv-muted sm:text-xs">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <h3 className="font-head kv-caps mb-2 text-2xl text-kv-lavender sm:text-3xl">
          how it works
        </h3>
        <div className="border-t-[1.5px] border-kv-border">
          <Fold title="a day in the game 📸">
            <p>
              your cage check drops once a day, at a random time inside your
              window. you have 2 hours to send one photo.
            </p>
            <p>
              three other players judge it. two agree and the day counts. then
              you judge three checks yourself.
            </p>
          </Fold>
          <Fold title="miss a day? freezes 🧊">
            <p>
              a freeze covers a missed day and keeps your run going. your first
              freezes arrive on day 1. hold 3 at most, and get up to 5 in the
              season. you can also buy one for 600 🌟.
            </p>
            <p>
              miss a day with no freeze left and your run stops. after 10
              approved days, you can restart once in the season for 900 🌟.
            </p>
          </Fold>
          <Fold title="stars 🌟 and treats 🍪">
            <p>
              stars are the game's currency. buy them in the bot or in the
              Locktober tab on Kinkverse, or get them as gifts from other
              players.
            </p>
            <p>
              as your days get approved, your stars turn into treats: 6 🌟 make
              1 🍪. complete every day and they all turn. treats are discounts
              at the Good Boys Club boutique.
            </p>
            <p>you don't need stars to play or to finish.</p>
          </Fold>
          <Fold title="missions 🎯">
            <p>
              optional extra tasks from the bot. you need 50 🌟 to open one.
              send your proof fast and a mission turns up to 48 🌟 into 8 🍪.
            </p>
          </Fold>
          <Fold title="leaderboard and prizes 🏆">
            <p>
              the leaderboard is opt-in: you only appear if you make your
              profile visible. your approved days make your score. your
              missions make the difference.
            </p>
            <p>
              🥇 Earn the most points this week and win a $50 KINK3D gift card.
              prize weeks run from October 4th to November 1st. one win per
              player. complete all 31 days to qualify: the highest-ranked
              finisher wins 🍪 1,500 treats. winner announced November 16th.
              and the most reposted Story card wins 🍪 1,500 treats too. all
              prizes in{" "}
              <a
                href={LOCKTOBER_RULES_URL}
                className="focus-ring text-kv-purple-bright underline underline-offset-2 hover:text-kv-lavender"
              >
                the rules
              </a>
              .
            </p>
          </Fold>
          <Fold title="your photos stay private">
            <p>
              your photos go to your three judges and the moderators, nobody
              else. your face is never required, and nothing is posted
              publicly.
            </p>
            <p>you can quit any time.</p>
          </Fold>
          <Fold title="what you need">
            <p>
              you're 18 or older, you have Telegram, and a Kinkverse account
              with Kinkverse+: €12 a month
              {earlyBird ? <>, or €31 for a year until {LOCK_IN_BY}</> : null}.
            </p>
            <p>
              the bot links everything and shows you the rules before you
              commit.
            </p>
          </Fold>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={TELEGRAM_BOT_URL} onClick={trackStart}>
            start in Telegram
          </Button>
          <p className="text-sm text-kv-muted">
            {earlyBird ? `lock in by ${LOCK_IN_BY}. ` : ""}31 days from whenever you lock.
          </p>
        </div>
      </div>
    </section>
  );
}
