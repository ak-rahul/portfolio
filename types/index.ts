export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  demo?: string;
  pypi?: string;
  image?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: string;
  icon: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  increasing: boolean;
  draw: () => void;
  update: () => void;
}

export interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  reset: () => void;
  draw: () => void;
  update: () => void;
}
