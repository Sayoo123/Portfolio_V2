"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  withNoise?: boolean;
  noPadding?: boolean;
}

export function Card({
  children,
  className,
  hoverEffect = true,
  withNoise = true,
  noPadding = false
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "card-base relative overflow-hidden group transition-all duration-300",
        noPadding ? "p-0" : "p-6 lg:p-10",
        withNoise && "noise-overlay",
        hoverEffect && "hover:border-[var(--color-gold-dim)] hover:shadow-gold",
        className
      )}
    >
      {/* Absolute glow child to respond to hover better if needed */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-glow)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
