"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-[var(--color-gold)] text-[#0c0c0f] hover:bg-[var(--color-gold-light)] shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:-translate-y-0.5",
    outline:
      "bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[#0c0c0f] hover:-translate-y-0.5",
  };

  const classes = cn(base, sizes[size], variants[variant], className);

  const MotionWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{ display: "inline-flex" }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <MotionWrapper>
        <Link
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </Link>
      </MotionWrapper>
    );
  }

  return (
    <MotionWrapper>
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    </MotionWrapper>
  );
}
