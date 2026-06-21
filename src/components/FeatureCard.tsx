interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className="neon-card rounded-sm p-4 sm:p-5">
      <h3 className="font-mono-label mb-2 text-xs text-kv-purple-bright">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-kv-lavender/90 sm:text-base">
        {description}
      </p>
    </article>
  );
}
