"use client";
import { useEffect, useRef, useState } from "react";
import { X, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

const SESSION_SECONDS = 25 * 60;

type Phase = "idle" | "running" | "paused" | "completed";

export function FocusDemo({
  open,
  onClose,
  initialPlan,
  initialBilling,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  initialPlan: string;
  initialBilling: string;
  triggerRef: React.RefObject<HTMLElement | null> | null;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [task, setTask] = useState("Design a better morning");
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(SESSION_SECONDS);
  const [announce, setAnnounce] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const startTsRef = useRef<number | null>(null);
  const pausedRemainingRef = useRef<number>(SESSION_SECONDS);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    startTsRef.current = null;
    pausedRemainingRef.current = SESSION_SECONDS;
    setPhase("idle");
    setRemaining(SESSION_SECONDS);
    setTask("Design a better morning");
    setError(null);
    setAnnounce("");
    const returnFocus = triggerRef?.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const shell = document.getElementById("page-shell");
    const oldInert = shell?.inert ?? false;
    if (shell) shell.inert = true;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(timer);
      startTsRef.current = null;
      document.body.style.overflow = previousOverflow;
      if (shell) shell.inert = oldInert;
      returnFocus?.focus({ preventScroll: true });
    };
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), a[href]",
      );
      if (!items?.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || phase !== "running") return;
    const tick = () => {
      if (startTsRef.current === null) return;
      const elapsed = Math.floor((Date.now() - startTsRef.current) / 1000);
      const next = Math.max(0, pausedRemainingRef.current - elapsed);
      setRemaining(next);
      if (!next) {
        startTsRef.current = null;
        setPhase("completed");
        setAnnounce("Session complete. Time for a short break.");
      }
    };
    tick();
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [open, phase]);

  const start = () => {
    const trimmed = task.trim() || "Design a better morning";
    setTask(trimmed);
    if (trimmed.length > 80) {
      setError("Keep it under 80 characters.");
      return;
    }
    setError(null);
    startTsRef.current = Date.now();
    setPhase("running");
    setAnnounce(`Session started for ${trimmed}`);
  };

  const pause = () => {
    // compute remaining at pause moment
    if (startTsRef.current != null) {
      const elapsed = Math.floor((Date.now() - startTsRef.current) / 1000);
      pausedRemainingRef.current = Math.max(
        0,
        pausedRemainingRef.current - elapsed,
      );
      setRemaining(pausedRemainingRef.current);
    }
    startTsRef.current = null;
    setPhase("paused");
    setAnnounce("Session paused.");
  };

  const resume = () => {
    startTsRef.current = Date.now();
    setPhase("running");
    setAnnounce("Session resumed.");
  };

  const reset = () => {
    startTsRef.current = null;
    pausedRemainingRef.current = SESSION_SECONDS;
    setRemaining(SESSION_SECONDS);
    setPhase("idle");
    setAnnounce("Session reset to 25 minutes.");
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const progress = 1 - remaining / SESSION_SECONDS;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#18251E]/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
        style={{ animation: "reveal 0.18s ease" }}
      />

      {/* dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        className="focus-demo-surface relative w-full max-w-[520px] max-h-[90dvh] overflow-hidden rounded-[24px] bg-[#F7F8F2] border border-[#DDE3D7] shadow-2xl flex flex-col"
        style={{ animation: "reveal 0.24s ease" }}
      >
        <div className="flex items-start justify-between gap-4 p-6 pb-4 border-b border-[#DDE3D7] bg-white">
          <div>
            <h2
              id="demo-title"
              className="text-[20px] font-bold tracking-tight text-[#18211C]"
            >
              Start a focus session
            </h2>
            <p className="mt-1 text-[13px] text-[#556158]">
              Interactive demo — no account or payment required.
            </p>
            {(initialPlan !== "Free" || initialBilling !== "monthly") && (
              <div className="mt-3">
                <p className="inline-flex items-center gap-2 rounded-full bg-[#F7F8F2] border border-[#DDE3D7] px-3 py-1 text-[12px] font-medium text-[#18211C]">
                  <strong>{initialPlan}</strong>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{initialBilling}</span>
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-[#556158]">
                  This demo includes the basic focus session only.
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo"
            className="h-11 w-11 inline-flex items-center justify-center rounded-full bg-[#F7F8F2] border border-[#DDE3D7] hover:bg-white transition shrink-0 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (phase === "idle") start();
          }}
          className="overflow-y-auto p-6 space-y-5 flex-1"
        >
          {/* task input */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {announce}
          </div>

          {phase === "completed" ? (
            <div className="rounded-2xl bg-[#C3EE78]/40 border border-[#C3EE78] p-6 text-center">
              <p className="text-[18px] font-bold text-[#18211C]">
                Session complete. Time for a short break.
              </p>
              <p className="mt-1 text-[13px] text-[#556158]">
                Nice work on “{task.trim()}”.
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={reset}
                  className="gap-2"
                >
                  <RotateCcw size={16} /> Start another
                </Button>
                <Button type="button" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* task input */}
              <div>
                <label
                  htmlFor="task-input"
                  className="text-[13px] font-semibold text-[#18211C]"
                >
                  What will you focus on?{" "}
                  <span className="text-[#556158] font-normal">(optional)</span>
                </label>
                <input
                  id="task-input"
                  ref={inputRef}
                  value={task}
                  onChange={(e) => {
                    if (e.target.value.length <= 80) setTask(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Write project outline"
                  maxLength={80}
                  disabled={phase !== "idle"}
                  className={`mt-2 w-full rounded-[12px] border bg-white px-4 py-3 text-[15px] text-[#18211C] placeholder:text-[#556158]/60 focus:outline-none focus:ring-2 focus:ring-[#C3EE78] focus:border-[#C3EE78] disabled:opacity-60 disabled:bg-[#F7F8F2] ${
                    error ? "border-red-400" : "border-[#DDE3D7]"
                  }`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "task-error" : "task-hint"}
                />
                <div className="mt-1.5 flex items-center justify-between">
                  <span id="task-hint" className="text-[12px] text-[#556158]">
                    {phase === "idle"
                      ? "Optional. Start now, or make the task your own."
                      : `Focusing on: ${task.trim() || "—"}`}
                  </span>
                  <span className="text-[11px] text-[#556158]">
                    {task.length}/80
                  </span>
                </div>
                {error && (
                  <p
                    id="task-error"
                    role="alert"
                    className="mt-1.5 text-[13px] font-medium text-red-600"
                  >
                    {error}
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-[#18251E] p-6 text-center relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, #C3EE78, transparent 60%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="mx-auto h-[140px] w-[140px] rounded-full relative flex items-center justify-center">
                    <svg
                      width="140"
                      height="140"
                      viewBox="0 0 140 140"
                      className="absolute inset-0 -rotate-90"
                      aria-hidden="true"
                    >
                      <circle
                        cx="70"
                        cy="70"
                        r="62"
                        stroke="rgba(195,238,120,0.18)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="70"
                        cy="70"
                        r="62"
                        stroke="#C3EE78"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 62}`}
                        strokeDashoffset={`${2 * Math.PI * 62 * (1 - progress)}`}
                        style={{ transition: "stroke-dashoffset 0.5s linear" }}
                      />
                    </svg>
                    <span
                      className="text-[36px] font-extrabold tracking-tight text-white tabular-nums"
                      aria-live="off"
                    >
                      {mm}:{ss}
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] tracking-widest font-semibold text-[#A5D9C1] uppercase">
                    {phase === "running"
                      ? "Focusing…"
                      : phase === "paused"
                        ? "Paused"
                        : "Ready when you are"}
                  </p>
                  <p className="text-[13px] text-white/70 mt-1">
                    25 minutes • demo session
                  </p>
                  {phase !== "idle" && (
                    <p className="mt-1 text-[12px] text-white/80 font-medium truncate px-4">
                      {task.trim()}
                    </p>
                  )}
                </div>
              </div>

              {/* controls */}
              <div className="flex items-center gap-3">
                {phase === "idle" ? (
                  <Button size="lg" className="flex-1" type="submit">
                    Start session
                  </Button>
                ) : phase === "running" ? (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={pause}
                      className="flex-1 gap-2"
                    >
                      <Pause size={16} /> Pause
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={reset}
                      className="gap-2"
                    >
                      <RotateCcw size={16} /> Reset
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      onClick={resume}
                      className="flex-1 gap-2"
                    >
                      <Play size={16} /> Resume
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={reset}
                      className="gap-2"
                    >
                      <RotateCcw size={16} /> Reset
                    </Button>
                  </>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="shrink-0"
                >
                  Close
                </Button>
              </div>

              <p className="text-center text-[12px] text-[#556158]">
                Closing the demo ends this session.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
