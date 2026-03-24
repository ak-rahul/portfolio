"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleDir: 1 | -1;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const STAR_COUNT_DENSITY = 8000; // px² per star — lower = more stars

function makeShootingStar(w: number, h: number): ShootingStar {
  const angle = (Math.PI / 180) * (30 + Math.random() * 20);
  const speed = 6 + Math.random() * 8;
  const maxLife = 60 + Math.random() * 60;
  return {
    x: Math.random() * w * 0.8,
    y: Math.random() * h * 0.4,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length: 80 + Math.random() * 120,
    opacity: 1,
    life: maxLife,
    maxLife,
  };
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const rafRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);

  const initStars = useCallback((w: number, h: number) => {
    const count = Math.ceil((w * h) / STAR_COUNT_DENSITY);
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.4 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      twinkleSpeed: 0.003 + Math.random() * 0.008,
      twinkleDir: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    // ─── Draw frame ───
    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // Background gradient (aurora blobs via compositing)
      // Blob 1 — violet, top-left area
      const g1 = ctx.createRadialGradient(w * 0.2, h * 0.15, 0, w * 0.2, h * 0.15, w * 0.5);
      g1.addColorStop(0, "rgba(139,92,246,0.10)");
      g1.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Blob 2 — emerald, bottom-right
      const g2 = ctx.createRadialGradient(w * 0.8, h * 0.75, 0, w * 0.8, h * 0.75, w * 0.45);
      g2.addColorStop(0, "rgba(52,211,153,0.08)");
      g2.addColorStop(1, "rgba(52,211,153,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Blob 3 — indigo, centre-top subtle
      const g3 = ctx.createRadialGradient(w * 0.55, h * 0.1, 0, w * 0.55, h * 0.1, w * 0.35);
      g3.addColorStop(0, "rgba(99,102,241,0.06)");
      g3.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      // ─── Stars ───
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.opacity += s.twinkleSpeed * s.twinkleDir;
        if (s.opacity >= 0.85 || s.opacity <= 0.1) s.twinkleDir *= -1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        // Slight violet tint for larger stars
        const tint = s.radius > 1.0
          ? `rgba(200,185,255,${s.opacity})`
          : `rgba(255,255,255,${s.opacity})`;
        ctx.fillStyle = tint;
        ctx.fill();
      }

      // ─── Shooting stars ───
      spawnTimerRef.current++;
      if (spawnTimerRef.current > 120 + Math.random() * 180) {
        spawnTimerRef.current = 0;
        if (shootingStarsRef.current.length < 3) {
          shootingStarsRef.current.push(makeShootingStar(w, h));
        }
      }

      const alive: ShootingStar[] = [];
      for (const ss of shootingStarsRef.current) {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life--;
        ss.opacity = ss.life / ss.maxLife;

        if (ss.life > 0 && ss.x < w + 200 && ss.y < h + 200) {
          // Draw trail
          const grad = ctx.createLinearGradient(
            ss.x, ss.y,
            ss.x - ss.vx * (ss.length / Math.hypot(ss.vx, ss.vy)),
            ss.y - ss.vy * (ss.length / Math.hypot(ss.vx, ss.vy))
          );
          grad.addColorStop(0, `rgba(220,210,255,${ss.opacity})`);
          grad.addColorStop(0.4, `rgba(180,160,255,${ss.opacity * 0.6})`);
          grad.addColorStop(1, "rgba(139,92,246,0)");

          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(
            ss.x - ss.vx * (ss.length / Math.hypot(ss.vx, ss.vy)),
            ss.y - ss.vy * (ss.length / Math.hypot(ss.vx, ss.vy))
          );
          ctx.stroke();

          // Head glow
          const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 4);
          headGlow.addColorStop(0, `rgba(255,255,255,${ss.opacity * 0.9})`);
          headGlow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = headGlow;
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 4, 0, Math.PI * 2);
          ctx.fill();

          alive.push(ss);
        }
      }
      shootingStarsRef.current = alive;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        background: "oklch(0.07 0.03 275)",
        pointerEvents: "none",
      }}
    />
  );
}
