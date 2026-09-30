import type { ReactNode } from "react";

interface FoldProps {
  title: string;
  children: ReactNode;
}

/** One folded question. Native <details>: readable and openable without JavaScript. */
export function Fold({ title, children }: FoldProps) {
  return (
    <details className="fold border-b-[1.5px] border-kv-border">
      <summary className="focus-ring flex min-h-12 items-center justify-between gap-4 py-3 text-left">
        <span className="text-base font-semibold text-kv-lavender sm:text-lg">{title}</span>
        <span
          className="fold-mark font-mono shrink-0 text-xl leading-none text-kv-purple-bright"
          aria-hidden="true"
        />
      </summary>
      <div className="max-w-2xl space-y-3 pb-5 text-sm leading-relaxed text-kv-lavender/85 sm:text-base">
        {children}
      </div>
    </details>
  );
}
