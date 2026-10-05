"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <Container className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> LESS NOISE. MORE POSSIBILITY.
          </p>
          <h1 id="hero-title">
            Find your focus.
            <br />
            Build your <em>flow.</em>
          </h1>
          <p className="hero-description">
            Your attention is a little extraordinary.
            <br className="hidden sm:block" /> Give it a place to do its best
            work.
          </p>
          <p className="hero-detail">
            One task. A little structure. Room to breathe. Meet the focus
            companion that moves at your pace.
          </p>
          <div className="hero-actions">
            <Button size="lg" variant="dark" onClick={onOpenDemo}>
              Try the live timer <ArrowUpRight size={19} />
            </Button>
            <a href="#how-it-works" className="text-link">
              See how it works <ArrowRight size={16} />
            </a>
          </div>
          <p className="hero-footnote">
            <Check size={14} /> Start immediately. No account or credit card.
          </p>
          <div className="hero-bottom">
            <span>DESIGNED FOR YOUR EVERYDAY</span>
            <span className="platform-label">
              iOS & Android concept <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
        <div className="hero-scene">
          <div className="focus-orbits" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-point" />
          </div>
          <span className="scene-caption">
            <Sparkles size={13} /> YOUR ATTENTION, WELL SPENT.
          </span>
          <figure className="photo-phone-stage">
            <div className="photo-phone-wrap">
              <Image
                src="/images/focusflow-angle.png"
                width={901}
                height={1746}
                alt="Angled metallic phone showing the FocusFlow mobile interface: focus timer, next task and weekly progress."
                sizes="(max-width: 640px) 300px, (max-width: 900px) 380px, 400px"
                quality={90}
                priority
                className="hero-phone-photo"
              />
              <button
                type="button"
                className="phone-photo-hotspot"
                onClick={onOpenDemo}
                aria-label="Open live focus timer from the phone preview"
                title="Open the live focus timer"
              />
            </div>
            <figcaption>
              PRODUCT PREVIEW <span>·</span>{" "}
              <button type="button" onClick={onOpenDemo}>
                Try the real timer <ArrowUpRight size={13} />
              </button>
            </figcaption>
          </figure>
        </div>
      </Container>
      <Container>
        <div className="hero-ribbon">
          <span>A SMALL SHIFT IN YOUR DAY.</span>
          <div>
            <span>
              <span className="ribbon-dot" />
              Work with intention
            </span>
            <span>
              <span className="ribbon-dot" />
              Rest without guilt
            </span>
            <span>
              <span className="ribbon-dot" />
              Build your rhythm
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
