import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

// Violet, not red: brand red belongs to the wordmark (design system decision 0003).
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-kv-purple text-white border-[1.5px] border-kv-purple hover:bg-kv-purple-dim font-semibold",
  secondary:
    "bg-transparent text-kv-lavender border-[1.5px] border-kv-purple hover:text-kv-purple-bright",
  ghost:
    "bg-transparent text-kv-muted border-[1.5px] border-transparent hover:text-kv-lavender hover:border-kv-border",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = true,
  ariaLabel,
  onClick,
}: ButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm transition-colors focus-ring sm:min-h-12 sm:px-6 sm:text-base ${variantClasses[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
