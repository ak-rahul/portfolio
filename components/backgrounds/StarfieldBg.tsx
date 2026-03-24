"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Option A — Upgraded CSS/Canvas Starfield
 * Pure twinkling stars in 3 depth layers (parallax-like sizing),
 * shooting stars with violet trails. NO constellation physics.
 * Zero JS animation loop dragging FPS — uses requestAnimationFrame
 * only for star updates (O(n), not O(n²)).
 */

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  dir: 1 | -1;
  speed: number;
  layer: 0 | 1 | 2; // 0=far, 1=mid, 2=near
}

interface Meteor {
  x: number; y: number;
  vx: number; vy: number;
  len: number;
  life: number; maxLife: number;
}

const LAYERS = [
  { density: 5000, rMin: 0.2, rMax: 0.6, opacityMax: 0.5 },  // far
  { density: 8000, rMin: 0.5, rMax: 1.1, opacityMax: 0.75 }, // mid
  { density: 14000, rMin: 1.0, rMax: 1.8, opacityMax: 1.0 }, // near
];

function newMeteor(w: number, h: number): Meteor {
  const ang = (25 + Math.random() * 20) * (Math.PI / 180);
  const spd = 7 + Math.random() * 9;
  const life = 50 + Math.random() * 70;
  return {
    x: Math.random() * w * 0.75,
    y: Math.random() * h * 0.35,
    vx: Math.cos(ang) * spd,
    vy: Math.sin(ang) * spd,
    len: 90 + Math.random() * 130,
    life,
    maxLife: life,
  };
}

export default function StarfieldBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const rafRef = useRef<number>(0);
  const timerRef = useRef(0);

  const init = useCallback((w: number, h: number) => {
    const stars: Star[] = [];
    LAYERS.forEach(({ density, rMin, rMax, opacityMax }, layer) => {
      const count = Math.ceil((w * h) / density);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: rMin + Math.random() * (rMax - rMin),
          opacity: Math.random() * opacityMax,
          dir: Math.random() > 0.5 ? 1 : -1,
          speed: 0.002 + Math.random() * 0.006,
          layer: layer as 0 | 1 | 2,
        });
      }
    });
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // Draw stars
      for (const s of starsRef.current) {
        s.opacity += s.speed * s.dir;
        const max = LAYERS[s.layer].opacityMax;
        if (s.opacity >= max) { s.opacity = max; s.dir = -1; }
        if (s.opacity <= 0.05) { s.opacity = 0.05; s.dir = 1; }

        // Violet tint for near-layer stars
        const fill = s.layer === 2
          ? `rgba(200,190,255,${s.opacity})`
          : `rgba(255,255,255,${s.opacity})`;

        if (s.r > 1.2) {
          // Soft glow for bright stars
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
          g.addColorStop(0, `rgba(200,190,255,${s.opacity * 0.8})`);
          g.addColorStop(1, "rgba(200,190,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
      }

      // Spawn meteors
      timerRef.current++;
      if (timerRef.current > 140 + Math.random() * 200 && meteorsRef.current.length < 3) {
        timerRef.current = 0;
        meteorsRef.current.push(newMeteor(w, h));
      }

      // Draw & age meteors
      meteorsRef.current = meteorsRef.current.filter((m) => {
        m.x += m.vx; m.y += m.vy; m.life--;
        const alpha = m.life / m.maxLife;
        const spd = Math.hypot(m.vx, m.vy);
        const tailX = m.x - m.vx * (m.len / spd);
        const tailY = m.y - m.vy * (m.len / spd);
        const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        g.addColorStop(0, `rgba(240,235,255,${alpha})`);
        g.addColorStop(0.3, `rgba(180,160,255,${alpha * 0.7})`);
        g.addColorStop(1, "rgba(139,92,246,0)");
        ctx.beginPath();
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Head point
        const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 3.5);
        hg.addColorStop(0, `rgba(255,255,255,${alpha})`);
        hg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.arc(m.x, m.y, 3.5, 0, Math.PI * 2); ctx.fill();

        return m.life > 0;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: "oklch(0.07 0.03 275)", pointerEvents: "none" }}
    />
  );
}
