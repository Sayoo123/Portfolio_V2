"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { experience } from "@/lib/data";
import { MapPin, CheckCircle2 } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding" style={{ background: "var(--color-bg)" }}>
      <div className="container-custom">
        <SectionTitle
          label="Experience"
          title="Where I've"
          highlight="shipped."
          subtitle="Professional history focused on real ownership, not just contributions."
          className="mb-20"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-gold)] via-[var(--color-border)] to-transparent hidden md:block" />

          <div className="space-y-16">
            {experience.map((exp, i) => (
              <div
                key={exp.id}
                className="flex gap-8 group"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 flex-col items-center" style={{ width: "48px" }}>
                  <div
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold z-10 transition-all duration-300"
                    style={{
                      backgroundColor: exp.current ? "var(--color-gold)" : "var(--color-surface-2)",
                      borderColor: exp.current ? "var(--color-gold)" : "var(--color-border)",
                      color: exp.current ? "#0c0c0f" : "var(--color-text-muted)",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Card */}
                <Card className="flex-1">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap mb-1.5">
                        <h3 className="font-bold text-[var(--color-text)] text-xl">{exp.role}</h3>
                        {exp.current && <Badge variant="gold">Current Mission</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-base text-[var(--color-text-muted)]">
                        <span className="font-semibold text-[var(--color-text-subtle)] uppercase tracking-wider text-xs">at</span>
                        <span className="font-bold text-[var(--color-text)]">{exp.company}</span>
                        {exp.companyNote && (
                          <span className="text-[var(--color-text-subtle)] text-sm">({exp.companyNote})</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-text-subtle)] bg-[var(--color-surface-2)] px-4 py-2 rounded-full border border-[var(--color-border-subtle)]">
                      <MapPin size={12} className="text-[var(--color-gold)]" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-4 mb-10">
                    {exp.achievements.map((achievement, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.07 }}
                        className="flex items-start gap-4 text-sm md:text-base"
                      >
                        <CheckCircle2
                          size={18}
                          className="flex-shrink-0 mt-1"
                          style={{ color: "var(--color-gold)" }}
                        />
                        <span className="text-[var(--color-text-muted)] leading-relaxed">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--color-border-subtle)]">
                    {exp.stack.map((tech) => (
                      <Badge key={tech} variant="skill" className="px-3 py-1.5 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
