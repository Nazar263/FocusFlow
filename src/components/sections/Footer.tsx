"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Link2 } from "lucide-react";
import { Container } from "../ui/Container";

export function Footer({
  motionPaused,
  onToggleMotion,
}: {
  motionPaused: boolean;
  onToggleMotion: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const sourceUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const year = new Date().getFullYear();

  const shareLinkedIn = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  const shareX = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(
      "FocusFlow — Find your focus. Build your flow. Try the interactive demo.",
    );
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  const copyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-brand-word reveal-footer" aria-hidden="true">
          <svg viewBox="0 0 1000 170" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="footerGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#18251E" stopOpacity="0.14" />
                <stop offset="55%" stopColor="#18251E" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#7CAA4B" stopOpacity="0.22" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="142"
              fill="url(#footerGrad)"
              fontSize="177"
              fontWeight="500"
              letterSpacing="-12"
            >
              FocusFlow.
            </text>
          </svg>
        </div>

        <div className="footer-grid reveal-footer">
          <div className="footer-brand">
            <a href="#" className="brand-link">
              <span className="brand-symbol" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M12 4 A8 8 0 0 1 20 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="footer-brand-name">
                FocusFlow<span className="brand-period">.</span>
              </span>
            </a>
            <p className="footer-tagline">
              A little structure. A lot more focus.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="footer-nav">
            <p className="footer-label">Explore</p>
            <ul>
              {[
                { label: "Features", href: "#features" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="footer-nav-link">
                    {l.label}
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-share">
            <p className="footer-label">Share this demo</p>
            <div className="footer-share-actions">
              <button type="button" onClick={shareLinkedIn} className="share-btn">
                LinkedIn
              </button>
              <button type="button" onClick={shareX} className="share-btn">
                X
              </button>
              <button
                type="button"
                onClick={copyLink}
                className="share-btn share-btn-dark"
              >
                {copied ? (
                  <>
                    <Check size={14} /> Copied!
                  </>
                ) : (
                  <>
                    <Link2 size={14} /> Copy link
                  </>
                )}
              </button>
            </div>
            <p className="footer-share-note" aria-live="polite" aria-atomic="true">
              {copied
                ? "Link copied to clipboard."
                : "Share the live demo URL."}
            </p>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-source"
              >
                View source on GitHub <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        <div className="footer-motion-preference">
          <span>Make this space yours.</span>
          <button
            type="button"
            onClick={onToggleMotion}
            aria-pressed={motionPaused}
          >
            {motionPaused
              ? "Resume background motion"
              : "Pause background motion"}
            <span aria-hidden="true">{motionPaused ? "▶" : "Ⅱ"}</span>
          </button>
        </div>
        <div className="footer-bottom">
          <p>© {year} FocusFlow. Fictional product. Frontend demo.</p>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}
