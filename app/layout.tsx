import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased min-h-screen bg-background text-foreground overflow-x-hidden`}
      >
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
