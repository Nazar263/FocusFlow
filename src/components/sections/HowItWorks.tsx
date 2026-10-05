"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Timer } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

const steps = [
  {
    n: "01",
    title: "Choose one task.",
    desc: "Give your session a clear purpose. Pick something small enough to move forward.",
    visual: (
      <div className="step-visual-card step-visual-task">
        <div className="step-task">
          <span className="task-circle" />
          <span className="step-task-label">
            <strong>Write project outline</strong>
            <small>Creative work · 25 min</small>
          </span>
          <ArrowUpRight size={16} />
        </div>
        <div className="step-task-ghost" aria-hidden="true">
          <span className="task-circle dim" />
          Review meeting notes
        </div>
      </div>
    ),
  },
  {
    n: "02",
    title: "Make a little space.",
    desc: "Set a focus duration, take a breath, and give that one thing your attention.",
    visual: (
      <div className="step-visual-card step-visual-time">
        <div className="step-time-ring" aria-hidden="true">
          <div className="step-time-ring-inner">
            <strong>25:00</strong>
            <span>FOCUS</span>
          </div>
        </div>
        <div className="step-time-meta">
          <span className="step-time-dot" />
          YOUR TIME TO FOCUS
        </div>
      </div>
    ),
  },
  {
    n: "03",
    title: "Pause. Then find your flow.",
    desc: "Take a real break, notice your progress, and choose what comes next.",
    visual: (
      <div className="step-visual-card step-visual-done">
        <div className="step-complete">
          <span className="step-complete-check">
            <Check size={18} />
          </span>
          <div>
            <strong>Session complete</strong>
            <small>A little progress. A fresh perspective.</small>
          </div>
        </div>
        <div className="step-progress-bars" aria-hidden="true">
          <span style={{ height: "36%" }} />
          <span style={{ height: "58%" }} />
          <span style={{ height: "44%" }} />
          <span style={{ height: "78%" }} />
          <span style={{ height: "62%" }} />
          <span className="on" style={{ height: "92%" }} />
          <span style={{ height: "70%" }} />
        </div>
      </div>
    ),
  },
];

export function HowItWorks({ onOpenDemo }: { onOpenDemo: () => void }) {
  const [activeStep, setActiveStep] = useState("01");
  return (
    <section id="how-it-works" className="how-section section-space">
      <Container>
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / FROM SCATTERED TO STARTED</p>
            <h2>
              Good work begins
              <br />
              with <em>one small step.</em>
            </h2>
          </div>
          <p>
            No perfect routine required.
            <br />
            Just a place to begin.
          </p>
        </div>

        <div className="steps-track" aria-hidden="true">
          <span className="steps-track-line" />
          <span className={`steps-track-progress step-${activeStep}`} />
        </div>

        <div className="steps-grid">
          {steps.map((s) => (
            <article
              key={s.n}
              className={`step-card ${activeStep === s.n ? "workflow-active" : ""}`}
            >
              <button
                type="button"
                className="step-selector"
                aria-pressed={activeStep === s.n}
                aria-label={`Highlight step ${s.n}: ${s.title}`}
                onClick={() => setActiveStep(s.n)}
              >
                <span className="step-number">
                  {s.n}
                  <span> /</span>
                </span>
                <span className="step-arrow">
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </button>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="step-visual" aria-hidden="true">
                {s.visual}
              </div>
            </article>
          ))}
        </div>

        <div className="how-bottom">
          <p>Start small. Stay present. See where it takes you.</p>
          <Button onClick={onOpenDemo}>
            <Timer size={16} /> Try a focus session <ArrowUpRight size={17} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
