"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "../ui/Container";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

type Props = { onOpenDemo: (plan: string, billing: string) => void };

export function Header({ onOpenDemo }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pendingAction = useRef<string | null>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) {
      const action = pendingAction.current;
      pendingAction.current = null;
      if (!action) return;
      const frame = requestAnimationFrame(() => {
        if (action === "demo") onOpenDemo("Free", "monthly");
        else {
          document
            .querySelector(action)
            ?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            });
          window.history.replaceState(null, "", action);
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    const trigger = triggerRef.current;
    const shell = document.getElementById("page-shell");
    const scrollY = window.scrollY;
    const oldStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const oldInert = shell?.inert ?? false;
    if (shell) shell.inert = true;
    Object.assign(document.body.style, {
      overflow: "hidden",
      position: "fixed",
      top: `-${scrollY}px`,
      width: "100%",
    });
    const frame = requestAnimationFrame(() =>
      menuRef.current
        ?.querySelector<HTMLElement>("button, a[href]")
        ?.focus({ preventScroll: true }),
    );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const items =
        menuRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
      if (!items?.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      Object.assign(document.body.style, oldStyles);
      if (shell) shell.inert = oldInert;
      window.scrollTo({ top: scrollY, behavior: "instant" });
      trigger?.focus({ preventScroll: true });
    };
  }, [open, onOpenDemo]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Container className="header-inner">
          <a href="#" aria-label="FocusFlow home" className="brand-link">
            <span className="brand-symbol" aria-hidden="true">
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12 4a8 8 0 0 1 8 8M12 20a8 8 0 0 1-8-8"
                  stroke="white"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
            <span>
              FocusFlow<span className="brand-period">.</span>
            </span>
          </a>
          <nav aria-label="Primary" className="desktop-navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="header-cta"
            onClick={() => onOpenDemo("Free", "monthly")}
          >
            Get Started <ArrowUpRight size={16} />
          </button>
          <button
            type="button"
            ref={triggerRef}
            className="menu-trigger"
            aria-expanded={open}
            aria-controls={open ? "mobile-menu" : undefined}
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={23} />
          </button>
        </Container>
      </header>
      {open &&
        createPortal(
          <div className="mobile-menu-overlay">
            <div
              className="mobile-menu-backdrop"
              aria-hidden="true"
              onClick={() => setOpen(false)}
            />
            <div
              id="mobile-menu"
              ref={menuRef}
              className="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-heading"
            >
              <div className="mobile-menu-top">
                <span id="menu-heading">Find your flow.</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>
              <p className="eyebrow">A LITTLE MORE INTENTION</p>
              <nav aria-label="Mobile">
                {navigation.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      pendingAction.current = item.href;
                      setOpen(false);
                    }}
                  >
                    <span>0{index + 1}</span>
                    {item.label}
                    <ArrowUpRight size={19} />
                  </a>
                ))}
              </nav>
              <button
                type="button"
                className="menu-start"
                onClick={() => {
                  pendingAction.current = "demo";
                  setOpen(false);
                }}
              >
                Get Started <ArrowUpRight size={18} />
              </button>
              <p className="menu-footnote">
                One task. A little space. A fresh start.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
