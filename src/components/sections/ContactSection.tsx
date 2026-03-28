"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { personal } from "@/lib/data";
import { Github, Linkedin, Mail, Send, CheckCircle, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

const projectTypes = [
  "Backend API Development",
  "Automation System",
  "AI Integration",
  "CRM / Dashboard",
  "Full-Stack Project",
  "Other",
];

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    value: personal.github,
    display: "github.com/sayoojsunil",
    icon: Github,
    href: personal.github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: personal.linkedin,
    display: "linkedin.com/in/sayoojsunil",
    icon: Linkedin,
    href: personal.linkedin,
  },
  {
    id: "email",
    label: "Email",
    value: personal.email,
    display: personal.email,
    icon: Mail,
    href: `mailto:${personal.email}`,
  },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simulate submit — replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass = `
    w-full px-4 py-3 text-sm rounded-xl
    bg-[var(--color-surface-2)] border border-[var(--color-border)]
    text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)]
    focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]
    transition-all duration-200
  `;

  const errorClass = "text-xs text-[var(--color-error)] mt-1";

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 100%)",
      }}
    >
      <div className="container-custom">
        <SectionTitle
          label="Contact"
          title="Let's build"
          highlight="something great."
          centered
          className="mb-16"
        />

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Left: Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h3 className="font-semibold text-[var(--color-text)] text-base mb-2">
                Open to remote opportunities
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Looking to hire a backend engineer or need a reliable freelancer for your next project? I respond within 24 hours.
              </p>
            </div>

            {/* Availability chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgba(74,222,128,0.08)] border border-[rgba(74,222,128,0.2)] w-fit">
              <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span className="text-xs text-[var(--color-success)] font-medium">Available for hire</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
              <MapPin size={14} />
              <span>{personal.location}</span>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    target={link.id !== "email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] hover:border-[var(--color-gold-dim)] hover:bg-[rgba(201,168,76,0.05)] transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-subtle)] leading-none mb-0.5">{link.label}</p>
                      <p className="text-sm text-[var(--color-text)] font-medium">{link.display}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="card-base p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <CheckCircle size={48} style={{ color: "var(--color-success)" }} />
                  <h3 className="font-bold text-[var(--color-text)] text-lg">Message sent!</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        placeholder="John Smith"
                        className={inputClass}
                        id="contact-name"
                      />
                      {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                        })}
                        type="email"
                        placeholder="john@company.com"
                        className={inputClass}
                        id="contact-email"
                      />
                      {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Project type */}
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">
                      Project Type
                    </label>
                    <select
                      {...register("projectType")}
                      className={inputClass}
                      id="contact-project-type"
                    >
                      <option value="">Select a project type...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">
                      Message *
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 20, message: "Please write at least 20 characters" },
                      })}
                      rows={5}
                      placeholder="Tell me about your project, timeline, and what you need..."
                      className={`${inputClass} resize-none`}
                      id="contact-message"
                    />
                    {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                  </div>

                  {/* Submit */}
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={handleSubmit(onSubmit)}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0c0c0f] border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={15} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
