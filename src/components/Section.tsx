import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
}

export function Section({
  id,
  children,
  className = "",
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-14 sm:px-6 sm:py-20 lg:px-8 ${className}`}
      aria-labelledby={ariaLabelledBy}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
