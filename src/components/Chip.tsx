interface ChipProps {
  label: string;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

const variantClasses = {
  default: "bg-kv-panel text-kv-lavender border-kv-border",
  accent: "bg-kv-purple/15 text-kv-purple-bright border-kv-purple",
  muted: "bg-kv-bg-deep text-kv-muted border-kv-border",
};

/** A tag: IBM Plex Mono, uppercase, square keyline. */
export function Chip({ label, variant = "default", className = "" }: ChipProps) {
  return (
    <span
      className={`font-mono-label inline-block border-[1.5px] px-2 py-0.5 text-[10px] sm:text-xs ${variantClasses[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
