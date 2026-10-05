"use client";
import { useState, useRef } from "react";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";

import { HowItWorks } from "./sections/HowItWorks";
import { Pricing } from "./sections/Pricing";

import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { AmbientBackground } from "./AmbientBackground";
import { RevealObserver } from "./ui/RevealObserver";
import { FocusDemo } from "./demo/FocusDemo";
import type { BillingPeriod } from "@/data/pricing";

export function ClientPage({
  features,
  testimonials,
}: {
  features: React.ReactNode;
  testimonials: React.ReactNode;
}) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [plan, setPlan] = useState("Free");
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [motionPaused, setMotionPaused] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openDemo = (
    nextPlan = "Free",
    nextBilling: BillingPeriod | string = "monthly",
  ) => {
    // Save trigger element for focus return
    triggerRef.current = document.activeElement as HTMLElement;
    setPlan(nextPlan);
    if (nextBilling === "monthly" || nextBilling === "yearly")
      setBilling(nextBilling);
    else setBilling("monthly");
    setDemoOpen(true);
  };

  return (
    <>
      <AmbientBackground paused={motionPaused} />
      <RevealObserver />
      <div id="page-shell">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header onOpenDemo={(plan, period) => openDemo(plan, period)} />

        <main id="main" className="relative flex-1">
          <Hero onOpenDemo={() => openDemo()} />
          {features}
          <HowItWorks onOpenDemo={() => openDemo()} />
          <Pricing onSelectPlan={(p, b) => openDemo(p, b)} />
          {testimonials}
          <Contact onOpenDemo={() => openDemo()} />
        </main>

        <Footer
          motionPaused={motionPaused}
          onToggleMotion={() => setMotionPaused((value) => !value)}
        />
      </div>

      {demoOpen && (
        <FocusDemo
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          initialPlan={plan}
          initialBilling={billing}
          triggerRef={triggerRef}
        />
      )}
    </>
  );
}
