"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionTitleProps {
  label?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  label,
  title,
  highlight,
  subtitle,
  centered = false,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(centered ? "text-center" : "", className)}
    >
      {label && (
        <div className="flex items-center gap-3 mb-4" style={centered ? { justifyContent: "center" } : {}}>
          <div className="h-px w-8 bg-[var(--color-gold)] opacity-60" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-gold)]">
            {label}
          </span>
          <div className="h-px w-8 bg-[var(--color-gold)] opacity-60" />
        </div>
      )}
      <h2
        className="font-display text-3xl md:text-4xl font-bold leading-tight text-[var(--color-text)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}{" "}
        {highlight && <span className="gold-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-[var(--color-text-muted)] max-w-2xl leading-relaxed" style={centered ? { margin: "1rem auto 0" } : {}}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
