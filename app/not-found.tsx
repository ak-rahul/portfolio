import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 sm:px-8">
      <div className="max-w-md text-center">
        <p className="mono-label text-primary mb-4">404</p>
        <h1 className="font-display font-semibold text-3xl sm:text-4xl mb-4">
          Page not found
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="underline-link font-mono text-xs uppercase tracking-[0.08em] text-foreground"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
