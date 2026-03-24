"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** "words" | "chars" */
  splitBy?: "words" | "chars";
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Staggered text reveal: splits by words or characters.
 * Each chunk fades in with a slight upward slide + blur-clear.
 */
export function AnimatedText({
  text,
  className,
  delay = 0,
  splitBy = "words",
  once = true,
}: AnimatedTextProps) {
  const parts = splitBy === "chars" ? text.split("") : text.split(" ");

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      custom={delay}
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
      aria-label={text}
    >
      {parts.map((part, i) => (
        <motion.span key={i} variants={itemVariants} className="inline-block">
          {splitBy === "chars" && part === " " ? "\u00A0" : part}
        </motion.span>
      ))}
    </motion.span>
  );
}
