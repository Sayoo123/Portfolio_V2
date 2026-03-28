"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { skills } from "@/lib/data";

const categories = [
  { label: "Backend", emoji: "⚙️", key: "backend", items: skills.backend },
  { label: "Frontend", emoji: "🎨", key: "frontend", items: skills.frontend },
  { label: "AI & Automation", emoji: "🤖", key: "ai_automation", items: skills.ai_automation },
  { label: "DevOps & Tools", emoji: "🛠️", key: "devops", items: skills.devops },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding" style={{ background: "var(--color-bg)" }}>
      <div className="container-custom">
        <SectionTitle
          label="Skills"
          title="My technical"
          highlight="toolkit."
          subtitle="Production-tested technologies. Not just listed — actually used in real systems."
          centered
          className="mb-20"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <Card
              key={cat.key}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl">{cat.emoji}</span>
                <h3 className="font-bold text-base text-[var(--color-text)] tracking-wider uppercase">{cat.label}</h3>
                <div className="flex-1 h-px bg-[var(--color-border)] opacity-30" />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {cat.items.map((skill) => (
                  <motion.div key={skill} variants={tagVariants} transition={{ duration: 0.3 }}>
                    <Badge variant="skill" className="px-4 py-2">{skill}</Badge>
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
