"use client";

import { useEffect, useRef, type ReactNode } from "react";

const DESIGN_WIDTH = 1440;

/**
 * Renders sections at a desktop width and zooms them to fit the frame, so cards show the
 * real component rather than a screenshot. Media queries still follow the actual viewport.
 */
export function ScaledPreview({
  children,
  className = "aspect-[16/10]",
}: {
  children: ReactNode;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameEl = frame.current;
    const canvasEl = canvas.current;
    if (!frameEl || !canvasEl) return;
    const observer = new ResizeObserver(([entry]) => {
      canvasEl.style.zoom = String(entry.contentRect.width / DESIGN_WIDTH);
    });
    observer.observe(frameEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frame}
      className={`relative overflow-hidden bg-muted ${className}`}
      aria-hidden="true"
      inert
    >
      <div
        ref={canvas}
        className="pointer-events-none absolute left-0 top-0 [zoom:0.25]"
        style={{ width: DESIGN_WIDTH }}
      >
        {children}
      </div>
    </div>
  );
}
