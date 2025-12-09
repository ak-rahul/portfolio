import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import StarryBackground from "@/components/StarryBackground";
import ParticleBackground from "@/components/ParticleBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rahul AK - AI Developer Portfolio",
  description: "Full-stack AI developer specializing in agentic systems, multi-agent architectures, and RAG applications",
  keywords: ["AI Developer", "LangChain", "Multi-Agent Systems", "Python", "Next.js"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <StarryBackground />
          <ParticleBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
