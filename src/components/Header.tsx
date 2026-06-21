import { APP_URL } from "../constants";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-kv-border/60 bg-kv-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="focus-ring rounded-sm flex items-center" aria-label="KinkVerse home">
          <img
            src="/kinkverse-red-rectangle.png"
            alt="KinkVerse logo"
            className="h-7 w-auto sm:h-9 mr-2"
            loading="eager"
            onError={(e) => {
              // fallback to text if image fails
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              // Next sibling is the span below, reveal it
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = ""
              }
            }}
            style={{ display: "inline" }}
          />
          <span
            className="font-display text-xl text-kv-lavender sm:text-2xl"
            style={{ display: "none" }} // hide text when image loads
          >
            KinkVerse
          </span>
        </a>
        <Button
          href={APP_URL}
          variant="primary"
          className="!min-h-9 !px-4 !py-2 text-xs sm:!min-h-11 sm:!px-5 sm:text-sm"
          ariaLabel="Create your KinkVerse profile (beta)"
        >
          Create your page
        </Button>
      </div>
    </header>
  );
}
