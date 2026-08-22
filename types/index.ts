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
