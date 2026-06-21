interface PrivacyPillProps {
  label: string;
  active?: boolean;
}

export function PrivacyPill({ label, active = false }: PrivacyPillProps) {
  return (
    <span
      className={`font-mono-label rounded-sm border px-2 py-1 text-[10px] sm:text-xs ${
        active
          ? "border-kv-purple-bright bg-kv-purple/20 text-kv-lavender glow-purple"
          : "border-kv-border bg-kv-bg-deep text-kv-muted chip-rough"
      }`}
      aria-current={active ? "true" : undefined}
    >
      {label}
    </span>
  );
}
