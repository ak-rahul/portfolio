import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", category: "Languages", icon: "SiPython", level: 95 },
      { name: "TypeScript", category: "Languages", icon: "SiTypescript", level: 80 },
      { name: "JavaScript", category: "Languages", icon: "SiJavascript", level: 85 },
      { name: "SQL", category: "Languages", icon: "SiPostgresql", level: 75 },
    ],
  },
  {
    name: "AI/ML Frameworks",
    skills: [
      { name: "LangChain", category: "AI/ML", icon: "SiPython", level: 90 },
      { name: "LangGraph", category: "AI/ML", icon: "SiPython", level: 85 },
      { name: "OpenAI API", category: "AI/ML", icon: "SiOpenai", level: 90 },
      { name: "Google Gemini", category: "AI/ML", icon: "SiGoogle", level: 85 },
      { name: "Groq API", category: "AI/ML", icon: "SiPython", level: 80 },
      { name: "RAG Systems", category: "AI/ML", icon: "SiPython", level: 90 },
    ],
  },
  {
    name: "Web & Backend",
    skills: [
      { name: "Next.js", category: "Web", icon: "SiNextdotjs", level: 80 },
      { name: "React", category: "Web", icon: "SiReact", level: 85 },
      { name: "Streamlit", category: "Web", icon: "SiStreamlit", level: 90 },
      { name: "FastAPI", category: "Backend", icon: "SiFastapi", level: 80 },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Docker", category: "DevOps", icon: "SiDocker", level: 90 },
      { name: "GitHub Actions", category: "DevOps", icon: "SiGithubactions", level: 85 },
      { name: "Git", category: "DevOps", icon: "SiGit", level: 95 },
      { name: "Linux", category: "DevOps", icon: "SiLinux", level: 80 },
    ],
  },
  {
    name: "Data & Vector DBs",
    skills: [
      { name: "FAISS", category: "Data", icon: "SiPython", level: 85 },
      { name: "NumPy", category: "Data", icon: "SiNumpy", level: 90 },
      { name: "Pandas", category: "Data", icon: "SiPandas", level: 85 },
      { name: "Matplotlib", category: "Data", icon: "SiPython", level: 90 },
    ],
  },
];
