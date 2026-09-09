import { APP_URL } from "./constants";
import { Button } from "./components/Button";
import { Chip } from "./components/Chip";
import { FeatureCard } from "./components/FeatureCard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MockProfileCard } from "./components/MockProfileCard";
import { PrivacyPill } from "./components/PrivacyPill";
import { Section } from "./components/Section";

const WHY_CARDS = [
  {
    title: "One home for your kink identity.",
    body: "Your kink life is probably spread across bios, DMs, apps, chats, and private links. KinkVerse gives it one page you can share anywhere.",
    chips: ["links", "tags", "badges", "bio", "profile"],
  },
  {
    title: "Show only what you want to show.",
    body: "Make your page expressive, but keep control. Choose what is public, what stays private, and what only the right people should see.",
    chips: [
      "logged-in users",
      "smashed profiles",
      "mutuals",
      "only for me",
    ],
  },
  {
    title: "Add proof without giving up privacy. (Coming soon)",
    body: "Verified links and badges help people know your page is real — even without revealing every detail.",
    chips: ["verified links", "badges", "trust signals", "optional details"],
  },
] as const;

const STEPS = [
  {
    title: "Claim your handle",
    body: "Pick the name people can use to find your page.",
  },
  {
    title: "Build your page",
    body: "Add your bio, links, tags, and select which parts of your profile you want to show.",
  },
  {
    title: "Share it your way",
    body: "Put it in your bio, send it in DMs, add it to a QR code, or keep it private.",
  },
] as const;

const FEATURES = [
  {
    title: "Kink-native profile",
    description: "More than a generic link list.",
  },
  {
    title: "Tags that say something",
    description: "Roles, dynamics, interests, and stats you choose to show.",
  },
  {
    title: "Links in one place",
    description: "Bring your socials, platforms, and pages together.",
  },
  {
    title: "Badges and proof",
    description: "Show trusted signals without exposing everything.",
  },
  {
    title: "Privacy controls",
    description: "Decide what appears and what stays hidden.",
  },
  {
    title: "Made to share",
    description: "Use your page in bios, DMs, QR codes, and profiles.",
  },
] as const;

const PRODUCT_STRIP = ["Profile", "Kinks", "Badges", "Links"] as const;

export default function App() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <Section className="pt-8 pb-10 sm:pt-12 sm:pb-14">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="order-1 lg:order-1">
              <p className="font-mono-label mb-3 text-xs text-kv-purple-bright">
                KINKVERSE
              </p>
              <h1 className="font-display mb-4 text-4xl leading-tight text-kv-lavender sm:text-5xl lg:text-6xl">
                Link your kinks.
              </h1>
              <p className="mb-4 max-w-xl text-base leading-relaxed text-kv-lavender/90 sm:text-lg">
                Create one profile for all your kinks, links, and more. 
              </p>
              <p className="mb-6 text-sm italic text-kv-purple-bright sm:text-base">
                You only show what you want to show. Full control on visibility.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={APP_URL} variant="primary">
                  Create your KinkVerse profile (beta)
                </Button>
                <Button href="#how-it-works" variant="secondary" external={false}>
                  See how it works
                </Button>
              </div>
            </div>
            <div className="order-2 flex justify-center lg:order-2 lg:justify-end">
              <MockProfileCard />
            </div>
          </div>
        </Section>

        {/* Product strip */}
        <div className="border-y border-kv-border/50 bg-kv-bg-deep/80 px-4 py-5 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 sm:gap-3">
            {PRODUCT_STRIP.map((item) => (
              <Chip key={item} label={item} className="!text-xs sm:!text-sm" />
            ))}
          </div>
        </div>

        {/* Why claim */}
        <Section ariaLabelledBy="why-heading">
          <div className="mb-10 text-center sm:mb-12">
            <h2
              id="why-heading"
              className="font-display mb-3 text-3xl text-kv-lavender sm:text-4xl"
            >
              Claim your page now
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {WHY_CARDS.map((card, i) => (
              <article
                key={card.title}
                className={`neon-card rounded-sm p-5 sm:p-6 ${i === 1 ? "sticker-tilt-alt" : i === 0 ? "sticker-tilt" : ""}`}
              >
                <h3 className="font-display mb-3 text-xl leading-snug text-kv-lavender">
                  {card.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-kv-lavender/85 sm:text-base">
                  {card.body}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {card.chips.map((chip) => (
                    <Chip key={chip} label={chip} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* How it works */}
        <Section id="how-it-works" ariaLabelledBy="how-heading" className="bg-kv-bg-deep/50">
          <h2
            id="how-heading"
            className="font-display mb-10 text-center text-3xl text-kv-lavender sm:text-4xl"
          >
            How it works
          </h2>
          <ol className="mb-10 grid gap-6 sm:grid-cols-3 sm:gap-5">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="neon-card relative rounded-sm p-5 sm:p-6"
              >
                <span
                  className="font-mono-label mb-3 block text-kv-red"
                  aria-hidden="true"
                >
                  Step {i + 1}
                </span>
                <h3 className="font-display mb-2 text-xl text-kv-lavender">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-kv-lavender/85 sm:text-base">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <div className="text-center">
            <Button href={APP_URL} variant="primary">
              Create your KinkVerse profile (beta)
            </Button>
          </div>
        </Section>

        {/* Privacy */}
        <Section ariaLabelledBy="privacy-heading">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <h2
                id="privacy-heading"
                className="font-display mb-2 text-3xl text-kv-lavender sm:text-4xl"
              >
                Privacy is not an extra setting.
              </h2>
              <p className="font-display mb-4 text-xl text-kv-purple-bright sm:text-2xl">
                It is part of the page.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-kv-lavender/90 sm:text-base">
                KinkVerse is built for people who want to express themselves
                without losing control. You decide what appears on your public
                page and what stays hidden.
              </p>
              <p className="mb-4 text-sm text-kv-muted sm:text-base">
                Designed around visibility controls like public, limited,
                mutual, and private views.
              </p>
              <p className="font-mono-label text-xs text-kv-purple-bright">
                Start simple. Share more later.
              </p>
            </div>
            <div
              className="neon-card rounded-sm p-5 sm:p-6"
              aria-hidden="true"
            >
              <p className="font-mono-label mb-3 text-[10px] text-kv-muted">
                visibility
              </p>
              <div className="flex flex-wrap gap-2">
                <PrivacyPill label="Public" active />
                <PrivacyPill label="KinkVerse users" />
                <PrivacyPill label="Smashed" />
                <PrivacyPill label="Mutuals" />
                <PrivacyPill label="Only me" />
              </div>
              <p className="mt-4 text-xs text-kv-muted/80">
                Control visibility down to the individual link or tag.
              </p>
            </div>
          </div>
        </Section>

        {/* Features */}
        <Section ariaLabelledBy="features-heading" className="bg-kv-bg-deep/40">
          <h2 id="features-heading" className="sr-only">
            Features
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} title={f.title} description={f.description} />
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <Section className="pb-16 sm:pb-20">
          <div className="neon-card mx-auto max-w-2xl rounded-sm px-6 py-10 text-center sm:px-10 sm:py-12 glow-purple">
            <h2 className="font-display mb-3 text-3xl text-kv-lavender sm:text-4xl">
              Make a page you actually want to share.
            </h2>
            <p className="mb-8 text-sm text-kv-lavender/90 sm:text-base">
              Link your kinks. Control what shows. Keep the rest private.
            </p>
            <Button href={APP_URL} variant="primary" className="w-full sm:w-auto">
              Create your KinkVerse profile (beta)
            </Button>
            <p className="font-mono-label mt-4 text-[10px] text-kv-muted">
              Opens {new URL(APP_URL).host}
            </p>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
