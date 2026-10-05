"use client";

import { useEffect } from "react";
import { Aurora } from "./animation/Aurora";

export function AmbientBackground({ paused }: { paused: boolean }) {
  useEffect(() => {
    const sync = () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document.documentElement.dataset.motion =
        paused || document.hidden || reduced ? "paused" : "running";
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      delete document.documentElement.dataset.motion;
    };
  }, [paused]);

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="aurora-static" />
      <Aurora paused={paused} />
      <div className="ambient-grid" />
    </div>
  );
}
