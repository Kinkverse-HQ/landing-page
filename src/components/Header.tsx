import { APP_URL, COMMUNITY_URL } from "../constants";
import { Button } from "./Button";

const navLink =
  "focus-ring hidden text-sm text-kv-lavender/85 hover:text-kv-purple-bright sm:inline";

export function Header() {
  return (
    <header className="border-b-[1.5px] border-kv-border bg-kv-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="focus-ring flex items-center" aria-label="Kinkverse home">
          <img
            src="/kinkverse-red-rectangle.png"
            alt="Kinkverse"
            className="h-7 w-auto sm:h-9"
            loading="eager"
          />
        </a>
        <nav aria-label="Main" className="flex items-center gap-5 sm:gap-6">
          <a href="#locktober" className={navLink}>
            Locktober
          </a>
          <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className={navLink}>
            community
          </a>
          <Button
            href={APP_URL}
            className="!min-h-9 !px-4 !py-2 text-xs sm:!min-h-11 sm:!px-5 sm:text-sm"
          >
            create your page
          </Button>
        </nav>
      </div>
    </header>
  );
}
