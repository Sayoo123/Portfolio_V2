"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Github, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { personal } from "@/lib/data";
import { AnimatedText } from "@/components/ui/AnimatedText";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-[var(--color-gold)] border-t-transparent animate-spin" />
    </div>
  ),
});

const roles = [
  "Backend Engineer",
  "Laravel Specialist",
  "AI Tool Builder",
  "API Architect",
  "Remote Developer",
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 80%, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container-custom relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center py-10 md:py-16">
          {/* Left: Copy */}
          <div className="flex flex-col gap-8 md:gap-10">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] w-fit shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[var(--color-success)]" style={{ animation: "pulse-gold 2s infinite" }} />
                <span className="text-xs font-medium text-[var(--color-text-muted)] tracking-wide">
                  Available for remote opportunities
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3 mb-4"
              >
                <MapPin size={14} className="text-[var(--color-text-subtle)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-subtle)]">{personal.location}</span>
              </motion.div>

              <AnimatedText
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2] tracking-tight text-[var(--color-text)]"
                text={`Backend Engineer Building Scalable Systems & AI Tools`}
                as="h1"
              />
            </div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed font-medium"
            >
              {personal.subHeadline}
            </motion.p>

            {/* Stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {["Laravel", "PHP", "MySQL", "REST APIs", "Python", "AI"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + i * 0.07 }}
                  className="px-4 py-1.5 text-xs font-bold tracking-wider rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold-dim)] transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-5"
            >
              <Button href="#projects" variant="primary" size="lg" className="px-10 h-14">
                View Projects
              </Button>
              <Button href="#contact" variant="ghost" size="lg" className="px-10 h-14 border-[var(--color-border)] hover:bg-[rgba(255,255,255,0.03)]">
                Hire Me
              </Button>
            </motion.div>

            {/* GitHub link */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[var(--color-text-subtle)] hover:text-[var(--color-gold)] transition-all group w-fit"
            >
              <Github size={16} className="group-hover:rotate-12 transition-transform" />
              <span>{personal.github.replace("https://", "")}</span>
            </motion.a>
          </div>

          {/* Right: WebGL Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[300px] lg:h-[450px] flex items-center justify-center"
          >
            {/* Glow behind scene */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
              }}
            />
            <HeroScene />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[var(--color-text-subtle)]">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-[var(--color-text-subtle)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
