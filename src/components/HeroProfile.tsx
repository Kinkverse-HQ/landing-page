import { APP_URL } from "../constants";

const PROFILE_HANDLE = "subboyforhung.members.goodboys.club";

/** A real, public Kinkverse profile, shown with its owner's agreement. */
export function HeroProfile() {
  return (
    <a
      href={`${APP_URL}/@${PROFILE_HANDLE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring block w-full max-w-md"
    >
      <figure className="panel overflow-hidden">
        <img
          src="/hero-profile.jpg"
          alt="the Kinkverse profile of @subboyforhung: photo, stickers, social links and tags"
          width={749}
          height={760}
          className="block h-auto w-full"
          loading="eager"
        />
        <figcaption className="font-mono border-t-[1.5px] border-kv-border px-4 py-2 text-xs text-kv-muted">
          a real Kinkverse page · @{PROFILE_HANDLE.split(".")[0]}
        </figcaption>
      </figure>
    </a>
  );
}
