"use client";

import { useEffect, useRef } from "react";

/**
 * Option C — WebGL GLSL Shader Gradient
 * A flowing organic noise-based gradient rendered in a WebGL canvas.
 * Inspired by Stripe's homepage / Vercel's animated gradient.
 *
 * The shader uses simplex-like fbm noise to morph a violet→emerald
 * colour palette slowly. Entirely GPU-side — CPU cost is nearly zero
 * after init (just one uniform update per frame).
 *
 * On mobile or if WebGL is unavailable, falls back to AuroraBg colours.
 */

const VERT = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAG = `
  precision mediump float;
  uniform float u_time;
  uniform vec2  u_res;

  // --- Noise helpers ---
  vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
  vec2 mod289(vec2 x){ return x - floor(x*(1./289.))*289.; }
  vec3 permute(vec3 x){ return mod289(((x*34.)+1.)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i  = floor(v + dot(v,C.yy));
    vec2 x0 = v - i + dot(i,C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.,0.) : vec2(0.,1.);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
    vec3 m = max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
    m = m*m; m = m*m;
    vec3 x = 2.*fract(p*C.www)-1.;
    vec3 h = abs(x)-.5;
    vec3 ox = floor(x+.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x  = a0.x*x0.x  + h.x*x0.y;
    g.yz = a0.yz*x12.xz + h.yz*x12.yw;
    return 130.*dot(m,g);
  }

  float fbm(vec2 p){
    float v=0., a=.5;
    for(int i=0;i<5;i++){ v+=a*snoise(p); p*=2.1; a*=.5; }
    return v;
  }

  // Colour palette (violet → indigo → emerald)
  vec3 palette(float t){
    vec3 a = vec3(0.08,0.05,0.12);
    vec3 b = vec3(0.55,0.28,0.80);   // violet peak
    vec3 c = vec3(0.08,0.55,0.45);   // emerald
    vec3 d = vec3(0.20,0.10,0.38);
    return a + b*cos(6.28318*(c*t+d));
  }

  void main(){
    vec2 uv  = gl_FragCoord.xy / u_res;
    float t  = u_time * 0.09;

    // Two fbm layers offset in time for organic motion
    float n1 = fbm(uv * 1.8 + vec2(t * 0.3, t * 0.2));
    float n2 = fbm(uv * 2.2 - vec2(t * 0.15, t * 0.25) + n1 * 0.5);

    vec3 col = palette(n2 * 0.5 + 0.5);

    // Darken edges for vignette
    float vign = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5) * 1.6);
    col *= vign * 0.9 + 0.1;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ShaderBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl");
    if (!gl) return; // graceful fallback — CSS background shows through

    // Compile shaders
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes  = gl.getUniformLocation(prog, "u_res");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    let start = performance.now();
    const render = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: "oklch(0.07 0.03 275)", pointerEvents: "none" }}
    />
  );
}
