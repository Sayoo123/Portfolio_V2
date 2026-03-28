import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "default" | "skill";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default:
      "bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text-muted)]",
    gold:
      "bg-[rgba(201,168,76,0.1)] border-[var(--color-gold-dim)] text-[var(--color-gold)]",
    skill:
      "bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-gold-dim)] hover:text-[var(--color-gold)] transition-colors duration-200 cursor-default",
  };

  return (
    <span className={cn("badge", variants[variant], className)}>
      {children}
    </span>
  );
}
