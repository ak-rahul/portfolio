import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import StarryBackground from "@/components/layout/StarryBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "AK Rahul - AI Developer Portfolio",
  description: "Full-stack AI developer specializing in agentic systems, multi-agent architectures, and RAG applications",
  keywords: ["AI Developer", "LangChain", "Multi-Agent Systems", "Python", "Next.js"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <StarryBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
