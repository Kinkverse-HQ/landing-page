interface ChipProps {
  label: string;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

const variantClasses = {
  default: "bg-kv-panel text-kv-lavender border-kv-border",
  accent: "bg-kv-red/15 text-kv-red border-kv-red/60",
  muted: "bg-kv-bg-deep text-kv-muted border-kv-border",
};

export function Chip({ label, variant = "default", className = "" }: ChipProps) {
  return (
    <span
      className={`font-mono-label inline-block rounded-full border px-2.5 py-0.5 text-[10px] sm:text-xs ${variantClasses[variant]} chip-rough ${className}`}
    >
      {label}
    </span>
  );
}
