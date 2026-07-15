"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A living dependency graph rendered to canvas — the visual metaphor for what
 * CodeBroker actually holds: files as nodes, imports as edges, queries as
 * pulses travelling the edges.
 *
 * Density and interactivity are tuned per surface via props.
 */

interface CodeGraphCanvasProps {
  className?: string;
  /** Node count at 1440px wide; scaled by viewport area. */
  density?: number;
  /** Pointer push radius in px. 0 disables pointer interaction. */
  interactive?: boolean;
  /** 0–1 overall opacity multiplier. */
  intensity?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Base twinkle phase so nodes don't pulse in lockstep. */
  phase: number;
}

interface Pulse {
  from: number;
  to: number;
  t: number;
  speed: number;
}

const BRAND = [255, 90, 31] as const;
const LINK_DIST = 150;

export function CodeGraphCanvas({
  className,
  density = 46,
  interactive = true,
  intensity = 1,
}: CodeGraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let sinceSpawn = 0;

    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale node count with area so phones don't render a hairball.
      const count = Math.round(density * Math.min(1.35, (width * height) / (1440 * 900)));
      nodes = Array.from({ length: Math.max(12, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: 1 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      }));
      pulses = [];
    };

    /** Pick a random connected pair and send a query pulse down the edge. */
    const spawnPulse = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      const candidates: number[] = [];
      for (let i = 0; i < nodes.length; i++) {
        if (i === from) continue;
        const dx = nodes[i].x - nodes[from].x;
        const dy = nodes[i].y - nodes[from].y;
        if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) candidates.push(i);
      }
      if (!candidates.length) return;
      pulses.push({
        from,
        to: candidates[Math.floor(Math.random() * candidates.length)],
        t: 0,
        speed: 0.5 + Math.random() * 0.5,
      });
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);

      // --- integrate ------------------------------------------------------
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        // Wrap rather than bounce: no visible walls.
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const push = (1 - d / 130) * 0.5;
            n.x += (dx / d) * push * dt;
            n.y += (dy / d) * push * dt;
          }
        }
      }

      // --- edges ----------------------------------------------------------
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;

          const d = Math.sqrt(d2);
          const fade = 1 - d / LINK_DIST;

          // Edges near the pointer warm toward brand orange.
          let warmth = 0;
          if (pointer.active) {
            const mx = (nodes[i].x + nodes[j].x) / 2 - pointer.x;
            const my = (nodes[i].y + nodes[j].y) / 2 - pointer.y;
            const md = Math.sqrt(mx * mx + my * my);
            if (md < 180) warmth = 1 - md / 180;
          }

          const alpha = fade * 0.18 * intensity;
          ctx.strokeStyle = warmth
            ? `rgba(${BRAND[0]}, ${BRAND[1]}, ${BRAND[2]}, ${alpha * warmth * 2.2})`
            : `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = warmth ? 1 : 0.6;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // --- nodes ----------------------------------------------------------
      const now = performance.now() / 1000;
      for (const n of nodes) {
        const twinkle = 0.55 + Math.sin(now * 0.8 + n.phase) * 0.25;
        let near = 0;
        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) near = 1 - d / 150;
        }

        if (near > 0.02) {
          ctx.fillStyle = `rgba(${BRAND[0]}, ${BRAND[1]}, ${BRAND[2]}, ${near * 0.9 * intensity})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + near * 1.6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${BRAND[0]}, ${BRAND[1]}, ${BRAND[2]}, ${near * 0.12 * intensity})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 10 + near * 12, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.32 * intensity})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- query pulses ---------------------------------------------------
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed * 0.012 * dt;
        if (p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) {
          pulses.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        // Fade in and out across the traversal.
        const life = Math.sin(p.t * Math.PI);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, 9);
        grad.addColorStop(0, `rgba(${BRAND[0]}, ${BRAND[1]}, ${BRAND[2]}, ${life * 0.75 * intensity})`);
        grad.addColorStop(1, `rgba(${BRAND[0]}, ${BRAND[1]}, ${BRAND[2]}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 200, 170, ${life * 0.95 * intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      // Normalise to ~60fps steps and clamp so tab-restore doesn't teleport nodes.
      const dt = Math.min((now - last) / 16.666, 3);
      last = now;

      if (visible) {
        sinceSpawn += dt;
        if (sinceSpawn > 38) {
          spawnPulse();
          sinceSpawn = 0;
        }
        draw(dt);
      }
      raf = requestAnimationFrame(frame);
    };

    build();

    if (reduced) {
      // One static frame: the graph still reads, nothing moves.
      draw(0);
      const roStatic = new ResizeObserver(() => {
        build();
        draw(0);
      });
      roStatic.observe(canvas);
      return () => roStatic.disconnect();
    }

    raf = requestAnimationFrame(frame);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    if (interactive) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    // Don't burn frames when the section is scrolled away or the tab is hidden.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        visible = false;
      } else {
        visible = true;
        last = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (interactive) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onPointerMove);
        document.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, [density, interactive, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
