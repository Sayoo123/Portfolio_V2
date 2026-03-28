import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { personal } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-gold)] flex items-center justify-center text-[#0c0c0f] font-black text-sm">
              {personal.initials}
            </div>
            <div>
              <p className="font-semibold text-sm text-[var(--color-text)]">{personal.name}</p>
              <p className="text-xs text-[var(--color-text-subtle)]">{personal.title}</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <Link
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors rounded-lg hover:bg-[var(--color-surface-2)]"
              aria-label="GitHub"
            >
              <Github size={18} />
            </Link>
            <Link
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors rounded-lg hover:bg-[var(--color-surface-2)]"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href={`mailto:${personal.email}`}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors rounded-lg hover:bg-[var(--color-surface-2)]"
              aria-label="Email"
            >
              <Mail size={18} />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[var(--color-text-subtle)]">
            © {currentYear} {personal.name} · Built with Next.js & Three.js
          </p>
        </div>

        {/* Availability tag */}
        {personal.availableForWork && (
          <div className="mt-8 pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span className="text-xs text-[var(--color-text-muted)]">
                Available for remote roles & freelance projects
              </span>
            </div>
            <Link
              href="#contact"
              className="text-xs text-[var(--color-gold)] flex items-center gap-1 hover:underline"
            >
              Get in touch <ArrowUpRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}
