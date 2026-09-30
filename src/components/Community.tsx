import { BLUESKY_URL, COMMUNITY_LINKS, COMMUNITY_URL } from "../constants";
import { Button } from "./Button";
import { Section } from "./Section";

const LINKS = [
  { href: COMMUNITY_LINKS.why, label: "why we're opening Kinkverse" },
  { href: COMMUNITY_LINKS.blog, label: "the blog and release notes" },
  { href: COMMUNITY_LINKS.people, label: "the people behind it" },
  { href: COMMUNITY_LINKS.contribute, label: "help build it" },
  { href: BLUESKY_URL, label: "follow @kinkverse.org on Bluesky" },
] as const;

export function Community() {
  return (
    <Section id="community" ariaLabelledBy="community-heading">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="font-mono-label mb-4 text-xs text-kv-purple-bright">community</p>
          <h2
            id="community-heading"
            className="font-head kv-caps mb-4 text-4xl leading-none text-kv-lavender sm:text-5xl"
          >
            Kinkverse is going open source.
          </h2>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-kv-lavender/90 sm:text-lg">
            we're building what comes next in the open, with the people it's
            for. read along, talk back on Bluesky, and help shape it.
          </p>
          <Button href={COMMUNITY_URL} variant="secondary">
            visit community.kinkverse.org
          </Button>
        </div>
        <ul className="border-t-[1.5px] border-kv-border self-start">
          {LINKS.map((link) => (
            <li key={link.href} className="border-b-[1.5px] border-kv-border">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex min-h-12 items-center justify-between gap-4 py-3 text-base text-kv-lavender hover:text-kv-purple-bright"
              >
                {link.label}
                <span aria-hidden="true" className="text-kv-purple-bright">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
