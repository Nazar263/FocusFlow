"use client";
import { useRef, useEffect } from "react";
import type { ReactNode, PointerEvent } from "react";
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const frame = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );
  function move(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      document.documentElement.dataset.motion === "paused" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    if (frame.current !== null) return;
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--spot-x", `${x}px`);
      element.style.setProperty("--spot-y", `${y}px`);
      frame.current = null;
    });
  }
  return (
    <article className={className} onPointerMove={move}>
      {children}
    </article>
  );
}
