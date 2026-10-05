"use client";
import { ArrowUpRight, GitBranch, Lock, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function Contact({ onOpenDemo }: { onOpenDemo: () => void }) {
  const sourceUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  return (
    <section id="contact" className="contact-premium">
      <Container>
        <div className="contact-panel">
          <div className="contact-primary">
            <div className="contact-orb contact-orb-a" aria-hidden="true" />
            <div className="contact-orb contact-orb-b" aria-hidden="true" />
            <p className="eyebrow">05 / YOUR NEXT GOOD IDEA STARTS HERE</p>
            <h2>
              Make room for
              <br />
              <em>what matters.</em>
            </h2>
            <p>
              A little structure can change the way your day feels. Try one
              focused session and see for yourself.
            </p>
            <div className="contact-actions">
              <Button size="lg" variant="dark" onClick={onOpenDemo}>
                Start my session <ArrowUpRight size={18} />
              </Button>
              <span className="contact-note">
                <Sparkles size={14} /> Free · No account · 25 min
              </span>
            </div>
          </div>
          <div className="contact-secondary">
            <div className="contact-secondary-inner">
              <h3>A concept. A clearer way to work.</h3>
              <p>
                FocusFlow is a fictional mobile product, brought to life as an
                interactive frontend experience. Explore the timer without
                creating an account.
              </p>
              <ul className="contact-points">
                <li>
                  <Lock size={14} /> Your session stays in your browser.
                </li>
                <li>
                  <Sparkles size={14} /> No personal data is collected or sent.
                </li>
              </ul>
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-github"
                >
                  <GitBranch size={15} /> View the project on GitHub
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span className="source-placeholder">
                  Project repository link will be added at launch.
                </span>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
