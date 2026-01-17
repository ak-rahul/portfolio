"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Star, ShootingStar } from "@/types";

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();

  // Store mouse position in a ref to persist across renders without re-triggering effect
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Determine current theme color
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    // Configure colors based on theme
    const starRgb = isDark ? "255, 255, 255" : "0, 0, 0";
    const lineRgb = isDark ? "255, 255, 255" : "0, 0, 0";
    const shootingStarColorInfo = isDark ? "255, 255, 255" : "59, 130, 246";

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Helper functions
    const drawStar = (star: Star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${starRgb}, ${star.opacity})`;
      ctx.fill();
    };

    const updateStar = (star: Star) => {
      // Twinkle effect
      if (star.increasing) {
        star.opacity += star.twinkleSpeed;
        if (star.opacity >= 1) star.increasing = false;
      } else {
        star.opacity -= star.twinkleSpeed;
        if (star.opacity <= 0.2) star.increasing = true;
      }

      // Mouse interaction: subtle parallax/movement away from mouse
      const dx = mouseRef.current.x - star.x;
      const dy = mouseRef.current.y - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 100;

      if (distance < maxDist) {
        const force = (maxDist - distance) / maxDist;
        star.x -= (dx / distance) * force * 0.5;
        star.y -= (dy / distance) * force * 0.5;
      }

      drawStar(star);
    };

    const drawShootingStar = (star: ShootingStar) => {
      const gradient = ctx.createLinearGradient(
        star.x,
        star.y,
        star.x - Math.cos(star.angle) * star.length,
        star.y - Math.sin(star.angle) * star.length
      );
      gradient.addColorStop(0, `rgba(${shootingStarColorInfo}, ${star.opacity})`);
      gradient.addColorStop(1, `rgba(${shootingStarColorInfo}, 0)`);

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(
        star.x - Math.cos(star.angle) * star.length,
        star.y - Math.sin(star.angle) * star.length
      );
      ctx.stroke();
    };

    const updateShootingStar = (star: ShootingStar) => {
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      star.opacity -= 0.01;

      if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
        star.reset();
      }
      drawShootingStar(star);
    };

    // Constellation effect: Draw lines between nearby stars
    const drawConstellations = (stars: Star[]) => {
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineRgb}, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const createStar = (): Star => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        increasing: Math.random() > 0.5,
        draw: () => { },
        update: () => { }
      };
    };

    const createShootingStar = (): ShootingStar => {
      const star: ShootingStar = {
        x: 0,
        y: 0,
        length: 0,
        speed: 0,
        opacity: 0,
        angle: 0,
        reset: function () {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * (canvas.height / 2);
          this.length = Math.random() * 80 + 40;
          this.speed = Math.random() * 10 + 6;
          this.opacity = 1;
          this.angle = Math.PI / 4;
        },
        draw: () => { },
        update: () => { }
      };
      star.reset();
      return star;
    };

    // Initialize stars
    // Increased count slightly for better constellations
    const stars: Star[] = [];
    for (let i = 0; i < 220; i++) {
      stars.push(createStar());
    }

    // Initialize shooting stars
    const shootingStars: ShootingStar[] = [];
    for (let i = 0; i < 3; i++) {
      shootingStars.push(createShootingStar());
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => updateStar(s));
      drawConstellations(stars);

      if (Math.random() < 0.01 && shootingStars.length < 5) {
        shootingStars.push(createShootingStar());
      }

      shootingStars.forEach((s, index) => {
        updateShootingStar(s);
        if (s.opacity <= 0) {
          shootingStars.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, systemTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-background transition-colors duration-500"
      style={{ pointerEvents: "none" }}
    />
  );
}
