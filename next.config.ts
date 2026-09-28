import type { NextConfig } from "next";

// script-src needs 'unsafe-inline': Next's App Router injects its own
// inline hydration/RSC-streaming scripts (self.__next_f chunks) on every
// page, and their content is per-build/per-payload — not something a
// static hash can pin. Verified empirically: a hash-only script-src (even
// allowing this site's own JSON-LD script by hash) broke hydration
// outright in a real browser ("Invariant: ... self.__next_r"). The fully
// CSP-correct fix is per-request nonces via middleware, but that forces
// every route to render dynamically instead of the static prerendering
// this whole site currently gets — not a trade worth making for a static
// portfolio with no user-input attack surface (no forms, no reflected
// query params, nothing user-supplied ever reaches the page). style-src
// also keeps 'unsafe-inline': components (ScrollProgress, the nav
// active-link indicator, Hero's mouse-parallax wash) set per-frame values
// via inline style="", which is equally unhashable.
// React's dev mode calls eval() to reconstruct component stack traces for
// better error messages (React docs/source confirm this never happens in
// production) — 'unsafe-eval' is scoped to `npm run dev` only so a real
// `npm run build` deploy never carries it.
const isDev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
        },
        { key: "Content-Security-Policy", value: csp },
      ],
    },
  ],
};

export default nextConfig;
