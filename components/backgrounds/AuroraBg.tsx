"use client";

/**
 * Option B — Aurora / Northern Lights Mesh Gradient
 * Pure CSS animated gradient blobs via keyframes.
 * ZERO JavaScript animation — entirely GPU-composited.
 * Uses will-change: transform on each blob for GPU promotion.
 * Inspired by Linear.app, Arc Browser, Apple's Hero backgrounds.
 */
export default function AuroraBg() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "oklch(0.07 0.03 275)" }}
    >
      {/* Blob 1 — Violet, top-left */}
      <div
        className="absolute"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          top: "-20%",
          left: "-15%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.19 295 / 0.22) 0%, oklch(0.72 0.19 295 / 0.08) 40%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
          animation: "aurora-blob-1 22s ease-in-out infinite",
        }}
      />

      {/* Blob 2 — Emerald, bottom-right */}
      <div
        className="absolute"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 800,
          maxHeight: 800,
          bottom: "-15%",
          right: "-10%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.17 162 / 0.18) 0%, oklch(0.78 0.17 162 / 0.06) 45%, transparent 70%)",
          filter: "blur(90px)",
          willChange: "transform",
          animation: "aurora-blob-2 28s ease-in-out infinite",
        }}
      />

      {/* Blob 3 — Indigo/Sky, centre */}
      <div
        className="absolute"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: 750,
          maxHeight: 750,
          top: "20%",
          left: "30%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, oklch(0.65 0.18 265 / 0.12) 0%, transparent 65%)",
          filter: "blur(100px)",
          willChange: "transform",
          animation: "aurora-blob-3 34s ease-in-out infinite",
        }}
      />

      {/* Globe ambient base glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.72 0.19 295 / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* CSS keyframes injected inline for portability */}
      <style>{`
        @keyframes aurora-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33%  { transform: translate(6%, -8%) scale(1.08) rotate(5deg); }
          66%  { transform: translate(-5%, 7%) scale(0.95) rotate(-3deg); }
        }
        @keyframes aurora-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          40%  { transform: translate(-7%, 6%) scale(1.1) rotate(-6deg); }
          70%  { transform: translate(5%, -5%) scale(0.92) rotate(4deg); }
        }
        @keyframes aurora-blob-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(4%, 9%) scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="aurora-blob"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
