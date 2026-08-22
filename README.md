# Portfolio

Personal portfolio site for AK Rahul — AI Developer & Agentic Systems Engineer. A single-page Next.js site showcasing projects, skills, and background in multi-agent systems, LangChain, and RAG.

## Tech stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) components
- **Motion**: [Lenis](https://github.com/darkroomengineering/lenis) for inertial smooth scroll, scroll-triggered reveals via `IntersectionObserver`
- **Fonts**: Newsreader (display), IBM Plex Sans (body), IBM Plex Mono (labels), via `next/font/google`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## Design

Warm stone/parchment palette with a single deep ink-teal accent, hairline-rule layout, no decorative canvas backgrounds. Light mode only. See [CLAUDE.md](./CLAUDE.md) for the full design rationale and architecture notes.

## Getting started

```bash
git clone https://github.com/ak-rahul/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
npx tsc --noEmit # Type check
```

## Deployment

Deploys to [Vercel](https://vercel.com/) with zero extra configuration — push to `main` and Vercel builds and deploys automatically. `.github/workflows/ci.yml` runs lint, typecheck, and build on every push/PR to `main`/`dev` as a separate check; it doesn't deploy anything.

## Content

Project list and skill categories live in `data/projects.ts` and `data/skills.ts` as plain typed arrays — update those files, not the section components, to change what's displayed.
