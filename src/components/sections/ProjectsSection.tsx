"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { ChevronDown, ChevronUp, TrendingUp, Terminal, LayoutPanelLeft } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TerminalView } from "./TerminalView";

export function ProjectsSection() {
  const [expanded, setExpanded] = useState<string | null>("crm-system");
  const [viewMode, setViewMode] = useState<"gui" | "terminal">("gui");

  return (
    <section id="projects" className="section-padding bg-[var(--color-surface)]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionTitle
            label="Projects"
            title="Production-grade"
            highlight="work."
            subtitle="Real systems solving real problems — not portfolio pieces built for show."
            className="mb-0"
          />

          {/* View Toggle */}
          <div className="flex p-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-full w-fit h-fit">
            <button
              onClick={() => setViewMode("gui")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                viewMode === "gui"
                  ? "bg-[var(--color-gold)] text-[#0c0c0f] shadow-lg"
                  : "text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              <LayoutPanelLeft size={14} />
              GUI VIEW
            </button>
            <button
              onClick={() => setViewMode("terminal")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                viewMode === "terminal"
                  ? "bg-[var(--color-gold)] text-[#0c0c0f] shadow-lg"
                  : "text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              <Terminal size={14} />
              TERMINAL
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "gui" ? (
            <motion.div
              key="gui-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {projects.map((project) => {
                const isExpanded = expanded === project.id;
                return (
                  <Card
                    key={project.id}
                    className="p-0 border-none bg-transparent"
                    noPadding
                    hoverEffect={false}
                  >
                    {/* Header row */}
                    <button
                      className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                      onClick={() => setExpanded(isExpanded ? null : project.id)}
                      id={`project-${project.id}`}
                    >
                      <div className="flex items-center gap-6 min-w-0">
                        <span className="text-3xl flex-shrink-0">{project.emoji}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-4 flex-wrap">
                            <h3 className="font-bold text-[var(--color-text)] text-xl md:text-2xl leading-tight">
                              {project.title}
                            </h3>
                            {project.highlight && (
                              <Badge variant="gold">Featured</Badge>
                            )}
                            <Badge variant="default">{project.category}</Badge>
                          </div>
                          <p className="text-base md:text-lg text-[var(--color-text-subtle)] mt-2.5 line-clamp-1">
                            {project.impact}
                          </p>
                        </div>
                      </div>

                      <div className="flex-shrink-0 ml-4">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-gold)] group-hover:bg-[rgba(201,168,76,0.1)] transition-all duration-200">
                          {isExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                        </div>
                      </div>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-10 pb-10 md:pb-12 border-t border-[var(--color-border-subtle)]">
                            <div className="grid md:grid-cols-3 gap-12 mt-10">
                              {/* Problem */}
                              <div className="md:col-span-1">
                                <h4 className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-widest mb-5">
                                  Problem
                                </h4>
                                <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
                                  {project.problem}
                                </p>
                              </div>

                              {/* Solution */}
                              <div className="md:col-span-1">
                                <h4 className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-widest mb-5">
                                  Solution
                                </h4>
                                <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
                                  {project.solution}
                                </p>
                              </div>

                              {/* Stack + Impact */}
                              <div className="md:col-span-1 space-y-8">
                                <div>
                                  <h4 className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-widest mb-5">
                                    Tech Stack
                                  </h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {project.stack.map((tech) => (
                                      <Badge key={tech} variant="skill" className="text-xs">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {project.metrics && (
                                  <div>
                                    <h4 className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-widest mb-4 flex items-center gap-1.5">
                                      <TrendingUp size={12} />
                                      Impact
                                    </h4>
                                    <div className="space-y-3">
                                      {project.metrics.map((m) => (
                                        <div
                                          key={m.label}
                                          className="flex items-center justify-between text-sm p-3 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border-subtle)]"
                                        >
                                          <span className="text-[var(--color-text-muted)]">{m.label}</span>
                                          <span className="font-bold text-[var(--color-gold)]">{m.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {!project.metrics && (
                                  <div className="p-4 rounded-xl bg-[rgba(201,168,76,0.05)] border border-[var(--color-gold-dim)]">
                                    <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
                                      <span className="text-[var(--color-gold)] font-bold">Impact: </span>
                                      {project.impact}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="terminal-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <TerminalView onExit={() => setViewMode("gui")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
