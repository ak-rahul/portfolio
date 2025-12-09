"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Rahul AK
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
            AI Developer & Agentic Systems Engineer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Building intelligent multi-agent systems with LangChain, LangGraph, and RAG. 
            Specialized in agentic AI applications, repository analysis tools, and optimization algorithms.
          </p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <a href="#projects">
                View Projects
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <a href="#contact">
                Get in Touch
                <Mail className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/ak-rahul"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/ak-rahul"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="mailto:your.email@example.com"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
