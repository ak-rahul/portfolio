"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  SiPython, SiTypescript, SiJavascript, SiReact, SiNextdotjs, 
  SiDocker, SiGit, SiStreamlit, SiNumpy, SiOpenai 
} from "react-icons/si";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { skillCategories } from "../data/skills";

const iconMap: { [key: string]: any } = {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiDocker,
  SiGit,
  SiStreamlit,
  SiNumpy,
  SiOpenai,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Technical Skills
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern AI applications
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => {
                        const Icon = iconMap[skill.icon] || SiPython;
                        return (
                          <Badge
                            key={skill.name}
                            variant="secondary"
                            className="flex items-center gap-2 px-3 py-1.5 text-sm"
                          >
                            <Icon className="h-4 w-4" />
                            {skill.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Summary */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-muted-foreground">
              <span className="text-primary font-semibold">Also proficient in:</span> Jupyter Notebooks, 
              Kaggle, Google Colab, PowerShell, Bash, YAML, Markdown, pytest, CI/CD, 
              docker-compose, GitHub Actions, and more.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
