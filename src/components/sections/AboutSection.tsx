"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { personal } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[var(--color-surface)]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-8">
            <SectionTitle
              label="About Me"
              title="Engineering systems"
              highlight="with purpose."
              className="mb-2"
            />

            <div className="space-y-5">
              {personal.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="text-[var(--color-text-muted)] leading-loose text-base md:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Current AI focus callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 p-6 rounded-2xl border border-[var(--color-gold-dim)] bg-[rgba(201,168,76,0.05)]"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">🤖</span>
                <div>
                  <p className="text-base font-bold text-[var(--color-gold)] mb-1.5">
                    Currently expanding into AI
                  </p>
                  <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
                    Building AI agents, OCR document processors, and automation pipelines using Python and modern AI APIs. Real production work, not tutorials.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {personal.stats.map((stat) => (
              <Card
                key={stat.label}
                className="flex flex-col gap-3"
              >
                <span className="text-4xl font-black text-[var(--color-gold)]" style={{ fontFamily: "var(--font-display)" }}>
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-[var(--color-text-subtle)] uppercase tracking-widest font-bold">
                  {stat.label}
                </span>
              </Card>
            ))}

            {/* Extra cards */}
            <Card
              className="col-span-2 flex items-center gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-[rgba(201,168,76,0.1)] border border-[var(--color-gold-dim)] flex items-center justify-center text-2xl flex-shrink-0">
                🌍
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-[var(--color-text)] mb-1">
                  Remote-First Professional
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  2+ years collaborating across time zones with US-based teams. Async-first, documentation-driven methodology.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
