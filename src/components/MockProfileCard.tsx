import { Chip } from "./Chip";

export function MockProfileCard() {
  return (
    <div
      className="neon-card sticker-notch relative w-full max-w-sm rounded-sm p-4 sticker-tilt sm:p-5"
      aria-hidden="true"
    >
      <div className="mb-3 flex items-start gap-3">
        <div
          className="h-16 w-16 shrink-0 rounded-sm border-2 border-kv-purple bg-kv-bg-deep"
          role="presentation"
        >
          <svg
            viewBox="0 0 64 64"
            className="h-full w-full text-kv-muted/40"
            aria-hidden="true"
          >
            <circle cx="32" cy="24" r="12" fill="currentColor" />
            <ellipse cx="32" cy="52" rx="18" ry="14" fill="currentColor" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono-label text-[10px] text-kv-muted">handle</p>
          <a className="font-display truncate text-lg text-kv-lavender sm:text-xl" href="https://subboyforhung.members.goodboys.club/">
            @subboyforhung
            <br />
            .members.goodboys.club
          </a>
     
          <span className="font-mono-label mt-1 inline-block rounded-sm border border-kv-red/50 bg-kv-red/10 px-2 py-0.5 text-[9px] text-kv-red">
            Public preview
          </span>
        </div>
   
   
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {["GAY", "SUB", "CHASTITY", "PUP", "PARIS"].map((tag) => (
          <Chip key={tag} label={tag} variant={tag === "SUB" ? "accent" : "default"} />
        ))}
      </div>

      <div className="mb-3">
        <p className="font-mono-label mb-1.5 text-[9px] text-kv-muted">links</p>
        <div className="flex flex-wrap gap-2">
          {["X", "Bluesky", "Instagram"].map((link) => (
            <span
              key={link}
              className="font-mono-label rounded-sm border border-kv-border bg-kv-bg px-2 py-1 text-[10px] text-kv-lavender chip-rough"
            >
              {link}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono-label mb-1.5 text-[9px] text-kv-muted">badges</p>
        <div className="flex flex-wrap gap-1.5">
          <Chip label="Verified link" variant="accent" />
          <Chip label="Early profile" />
          <Chip label="Private by default" variant="muted" />
        </div>
      </div>

      <div
        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-sm bg-kv-red opacity-80"
        aria-hidden="true"
      />
    </div>
  );
}
