"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/lib/data";
import { Clock, ArrowUpRight } from "lucide-react";

export function BlogSection() {
  return (
    <section id="blog" className="section-padding" style={{ background: "var(--color-bg)" }}>
      <div className="container-custom">
        <SectionTitle
          label="Writing"
          title="Thoughts on"
          highlight="backend craft."
          subtitle="Technical writing for engineers who care about building things that last."
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-base p-6 flex flex-col gap-4 group cursor-pointer"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-bold text-[var(--color-text)] text-base leading-snug group-hover:text-[var(--color-gold)] transition-colors duration-200">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-subtle)]">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-gold)] group-hover:bg-[rgba(201,168,76,0.1)] transition-all duration-200">
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming soon note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-[var(--color-text-subtle)] mt-8"
        >
          Blog coming soon · These are planned articles
        </motion.p>
      </div>
    </section>
  );
}
