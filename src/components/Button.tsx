import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-kv-red text-white border-2 border-kv-red hover:bg-kv-red-dim glow-red font-semibold",
  secondary:
    "bg-transparent text-kv-lavender border-2 border-kv-purple hover:border-kv-purple-bright hover:text-kv-purple-bright",
  ghost:
    "bg-transparent text-kv-muted border-2 border-transparent hover:text-kv-lavender hover:border-kv-border",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = true,
  ariaLabel,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-sm px-5 py-2.5 text-sm transition-colors focus-ring sm:min-h-12 sm:px-6 sm:text-base ${variantClasses[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
