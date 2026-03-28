"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/lib/data";
import { Server, Zap, Brain, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const iconMap: Record<string, React.ElementType> = {
  ServerIcon: Server,
  ZapIcon: Zap,
  BrainIcon: Brain,
  LayoutDashboard: LayoutDashboard,
};

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-[var(--color-surface)]">
      <div className="container-custom">
        <SectionTitle
          label="Services"
          title="What I build"
          highlight="for clients."
          subtitle="Freelance & contract work for businesses that need serious backend expertise."
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Server;
            return (
              <Card
                key={service.id}
                className="group relative overflow-hidden"
              >
                {/* Background corner glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
                    transform: "translate(30%, -30%)",
                  }}
                />

                <div className="flex flex-col gap-6 h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(201,168,76,0.1)] border border-[var(--color-gold-dim)] flex items-center justify-center group-hover:bg-[rgba(201,168,76,0.15)] transition-colors duration-300">
                    <Icon size={26} style={{ color: "var(--color-gold)" }} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl text-[var(--color-text)] mb-4">{service.title}</h3>
                    <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed mb-10">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-4 text-sm md:text-base text-[var(--color-text-subtle)]">
                          <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center p-10 rounded-2xl border border-[var(--color-gold-dim)] bg-[rgba(201,168,76,0.03)]"
        >
          <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
            Have a project in mind?
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
            I work with small teams and businesses who need reliable backend & AI solutions. Let&apos;s talk scope.
          </p>
          <Button href="#contact" variant="primary" size="md">
            Start a Conversation <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
