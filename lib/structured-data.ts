const siteUrl = "https://ak-rahul.vercel.app";
const siteDescription =
  "Full-Stack AI Developer specializing in multi-agent architectures, LangChain, RAG systems, and production-grade agentic applications. Certified Agentic AI Developer by Ready Tensor.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "AK Rahul",
  url: siteUrl,
  jobTitle: "AI Developer & Agentic Systems Engineer",
  description: siteDescription,
  sameAs: ["https://github.com/ak-rahul", "https://www.linkedin.com/in/ak-rahul"],
  knowsAbout: [
    "Agentic AI",
    "Multi-Agent Systems",
    "LangChain",
    "LangGraph",
    "Retrieval-Augmented Generation",
    "Python",
    "Next.js",
  ],
};

/** Exact string layout.tsx renders into the JSON-LD <script> tag — shared
 *  so next.config.ts can hash this precise value for the script-src CSP
 *  directive instead of a hand-copied hash that would silently go stale
 *  the next time this content changes. */
export const personJsonLdString = JSON.stringify(personJsonLd);
