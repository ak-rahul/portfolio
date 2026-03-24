import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StarryBackground from "@/components/layout/StarryBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AK Rahul — AI Developer & Agentic Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
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
  themeColor: "#0d0a1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${syne.variable} ${jetbrains.variable} font-sans antialiased min-h-screen bg-background text-foreground overflow-x-hidden`}
      >
        <StarryBackground />
        {children}
      </body>
    </html>
  );
}
