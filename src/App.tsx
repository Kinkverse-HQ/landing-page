import { APP_URL } from "./constants";
import { Button } from "./components/Button";
import { Community } from "./components/Community";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Locktober } from "./components/Locktober";
import { LocktoberBanner } from "./components/LocktoberBanner";
import { MockProfileCard } from "./components/MockProfileCard";
import { Section } from "./components/Section";

// Audience names come from the app's shared vocabulary (packages/tag-visibility).
const POINTS = [
  {
    title: "all of you, one link",
    body: "your kinks, tags, links and badges on one page. put it in any bio, DM or QR code.",
  },
  {
    title: "you choose who sees what",
    body: "every link and tag has its own audience: anyone on the internet, logged-in Kinkverse users, people you smashed, your mutuals, or only you.",
  },
  {
    title: "start simple",
    body: "claim your handle, add what you want today, and share more when you're ready.",
  },
] as const;

export default function App() {
  return (
    <>
      {/* One sticky container so the banner and header cannot overlap, and the
          header needs no hardcoded offset when the banner wraps on mobile. */}
      <div className="sticky top-0 z-50">
        <LocktoberBanner />
        <Header />
      </div>

      <main>
        {/* Hero */}
        <Section className="pt-10 pb-12 sm:pt-16 sm:pb-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="font-mono-label mb-4 text-xs text-kv-purple-bright">
                Kinkverse
              </p>
              <h1 className="font-display mb-5 text-5xl leading-tight text-kv-lavender sm:text-6xl lg:text-7xl">
                Link your kinks.
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-kv-lavender/90 sm:text-xl">
                one page for your kinks, links and badges. you choose who sees
                each part of it.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={APP_URL}>create your page</Button>
                <Button href="#locktober" variant="secondary" external={false}>
                  🔒 join Locktober
                </Button>
              </div>
              <p className="font-mono mt-4 text-xs text-kv-muted">
                in beta · opens app.kinkverse.org
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <MockProfileCard />
            </div>
          </div>
        </Section>

        {/* Kinkverse, in three points */}
        <Section ariaLabelledBy="points-heading" className="pt-0 sm:pt-0">
          <h2 id="points-heading" className="sr-only">
            what Kinkverse does
          </h2>
          <ul className="grid gap-px border-[1.5px] border-kv-border bg-kv-border sm:grid-cols-3">
            {POINTS.map((point) => (
              <li key={point.title} className="bg-kv-bg p-5 sm:p-6">
                <h3 className="font-head kv-caps mb-2 text-2xl text-kv-lavender">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-kv-lavender/85 sm:text-base">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Locktober />

        <Community />
      </main>

      <Footer />
    </>
  );
}
