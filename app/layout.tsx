import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { personJsonLdString } from "@/lib/structured-data";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteUrl = "https://ak-rahul.vercel.app";
const siteTitle = "AK Rahul — AI Developer & Agentic Systems Engineer";
const siteDescription =
  "Full-Stack AI Developer specializing in multi-agent architectures, LangChain, RAG systems, and production-grade agentic applications. Certified Agentic AI Developer by Ready Tensor.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | AK Rahul",
  },
  description: siteDescription,
  keywords: [
    "AI Developer",
    "Agentic AI",
    "Multi-Agent Systems",
    "LangChain",
    "LangGraph",
    "RAG",
    "Python",
    "Next.js",
    "Full-Stack Developer",
    "Machine Learning",
    "OpenAI",
    "HuggingFace",
  ],
  authors: [{ name: "AK Rahul", url: siteUrl }],
  creator: "AK Rahul",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AK Rahul Portfolio",
    title: siteTitle,
    description: siteDescription,
    // Image comes from app/opengraph-image.tsx (generated at build time) —
    // Next.js injects it automatically, don't also list a static file here.
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@ak_rahul",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F6F2E7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // next/font's .variable classes only set CSS custom properties
      // (--font-ibm-plex-sans etc.) — they must live on <html> (:root),
      // not <body>. globals.css's @theme block declares --font-sans /
      // --font-display / --font-mono on `:root, :host` and resolves the
      // var(--font-ibm-plex-sans) reference right there; a var() that
      // can't resolve at the element matching the rule computes as
      // invalid — and stays invalid through inheritance even on
      // descendants that redefine the inner variable themselves. With
      // the classes on <body> (a :root descendant), every themed font
      // silently fell back to the OS default everywhere on the site.
      className={`${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // Static, developer-authored string from lib/structured-data.ts —
          // no user input reaches this. Its CSP script-src hash in
          // next.config.ts is computed from this exact same string.
          dangerouslySetInnerHTML={{ __html: personJsonLdString }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
