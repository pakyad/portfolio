import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-[11px] text-violet uppercase tracking-widest mb-4">
          404
        </p>
        <h1 className="font-sans font-light text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] text-ink mb-4">
          Page not found
        </h1>
        <p className="font-sans text-sm text-muted leading-relaxed mb-8">
          This page does not exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-violet hover:text-ink transition-colors duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7 2L3 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Return home
        </Link>
      </div>
    </main>
  );
}
