"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, Twitter, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "your.email..example.com",
      href: "mailto:your.email..example.com",
      color: "text-red-500",
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      description: "..ak-rahul",
      href: "https://github.com/ak-rahul",
      color: "text-gray-500",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      description: "Connect with me",
      href: "https://linkedin.com/in/ak-rahul",
      color: "text-blue-500",
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      title: "Twitter",
      description: "..ak_rahul",
      href: "https://twitter.com/ak_rahul",
      color: "text-sky-500",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-muted/30" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I'm always open to discussing new projects, opportunities, or collaborations. 
            Feel free to reach out through any of these channels.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {contactMethods.map((method, idx) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className={`${method.color} mb-2`}>{method.icon}</div>
                  <CardTitle>{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Connect
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="inline-block">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5" />
                Download Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild>
                <a href="/resume.pdf" download>
                  Get Resume (PDF)
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
