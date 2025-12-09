"use client";

import { useEffect, useRef } from "react";

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Star class
    class Star {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      increasing: boolean;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.increasing = Math.random() > 0.5;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        // Twinkling effect
        if (this.increasing) {
          this.opacity += this.twinkleSpeed;
          if (this.opacity >= 1) this.increasing = false;
        } else {
          this.opacity -= this.twinkleSpeed;
          if (this.opacity <= 0.2) this.increasing = true;
        }
        this.draw();
      }
    }

    // Shooting star class
    class ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number;
      tail: { x: number; y: number }[];

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height / 2);
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 10 + 6;
        this.opacity = 1;
        this.angle = Math.PI / 4; // 45 degrees
        this.tail = [];
      }

      draw() {
        if (!ctx) return;
        
        // Create gradient for tail effect
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.01;

        if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
          this.reset();
        }

        this.draw();
      }
    }

    // Create stars
    const stars: Star[] = [];
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Create shooting stars
    const shootingStars: ShootingStar[] = [];
    const shootingStarCount = 3;
    for (let i = 0; i < shootingStarCount; i++) {
      shootingStars.push(new ShootingStar());
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => star.update());

      // Randomly spawn shooting stars
      if (Math.random() < 0.01 && shootingStars.length < 5) {
        shootingStars.push(new ShootingStar());
      }

      // Update and draw shooting stars
      shootingStars.forEach((star, index) => {
        star.update();
        if (star.opacity <= 0) {
          shootingStars.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      style={{ pointerEvents: "none" }}
    />
  );
}
