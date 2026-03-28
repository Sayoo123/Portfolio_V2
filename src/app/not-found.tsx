import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="space-y-6">
        <p className="text-7xl font-black text-[var(--color-gold)] opacity-20" style={{ fontFamily: "var(--font-display)" }}>
          404
        </p>
        <h1 className="text-2xl font-bold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
          Page not found
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          This route doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-gold)] text-[#0c0c0f] font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>
    </div>
  );
}
