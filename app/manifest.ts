import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AK Rahul — AI Developer & Agentic Systems Engineer",
    short_name: "AK Rahul",
    description:
      "Full-Stack AI Developer specializing in multi-agent architectures, LangChain, RAG systems, and production-grade agentic applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F2E7",
    theme_color: "#F6F2E7",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
