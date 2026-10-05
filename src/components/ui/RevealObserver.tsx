"use client";

import { useEffect } from "react";
import { animate, createScope, spring, stagger } from "animejs";
import type { JSAnimation } from "animejs";

export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.js = "true";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scope = createScope({ root: document.body });
    const active = new Set<JSAnimation>();

    const motionBlocked = () =>
      reduced.matches ||
      document.hidden ||
      root.dataset.motion === "paused" ||
      root.dataset.reduced === "true";

    const revealAllNow = () => {
      const sels = [
        ".hero-copy > .eyebrow",
        ".hero-copy h1",
        ".hero-description",
        ".hero-detail",
        ".hero-actions",
        ".hero-footnote",
        ".hero-bottom",
        ".hero-ribbon",
        ".photo-phone-stage",
        ".photo-phone-wrap",
        ".scene-caption",
        ".photo-phone-stage figcaption",
        ".focus-orbits",
        ".focus-orbits .orbit",
        ".orbit-point",
        ".section-heading",
        ".feature-product-showcase",
        ".feature-phone-photo",
        ".showcase-light",
        ".feature-benefit",
        ".step-card",
        ".steps-track",
        ".pricing-card",
        ".testimonial-quote",
        ".contact-panel",
        ".reveal-footer",
        ".contact-points li",
        ".contact-orb",
        ".step-visual",
        ".step-selector",
      ];
      document.querySelectorAll(sels.join(",")).forEach((el) => {
        const node = el as HTMLElement;
        node.style.opacity = "1";
        node.style.transform = "none";
        node.style.translate = "none";
      });
      const heroImg = document.querySelector(".hero-phone-photo") as HTMLElement | null;
      if (heroImg) heroImg.style.transform = "";
      const featurePhone = document.querySelector(".feature-phone-photo") as HTMLElement | null;
      if (featurePhone) featurePhone.style.transform = "";
    };

    if (motionBlocked()) {
      if (reduced.matches || root.dataset.reduced === "true") {
        root.dataset.reduced = "true";
      } else {
        root.dataset.motion = "paused";
      }
      revealAllNow();
      return;
    }

    const run = (
      target: Element | Element[],
      properties: Parameters<typeof animate>[1],
    ) => {
      if (motionBlocked()) return;
      const animation = scope.execute(() =>
        animate(target, {
          ...properties,
          onComplete: (self) => active.delete(self),
        }),
      );
      active.add(animation);
    };

    const mobile =
      window.innerWidth < 768 ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const heroNodes = Array.from(
      document.querySelectorAll(
        ".hero-copy > .eyebrow, .hero-copy h1, .hero-description, .hero-detail, .hero-actions, .hero-footnote, .hero-bottom, .hero-ribbon",
      ),
    );
    if (heroNodes.length) {
      if (mobile) {
        run(heroNodes, {
          y: [18, 0],
          opacity: [0, 1],
          delay: stagger(55),
          duration: 560,
          ease: "outCubic",
        });
      } else {
        run(heroNodes, {
          y: [26, 0],
          opacity: [0, 1],
          delay: stagger(78),
          duration: 920,
          ease: "outExpo",
        });
      }
    }

    const phoneStage = document.querySelector(".photo-phone-stage") as HTMLElement | null;
    const phoneWrap = document.querySelector(".photo-phone-wrap") as HTMLElement | null;
    const phoneImg = document.querySelector(".hero-phone-photo") as HTMLElement | null;
    const phoneCaption = document.querySelector(".photo-phone-stage figcaption") as HTMLElement | null;
    const sceneCaption = document.querySelector(".scene-caption") as HTMLElement | null;
    const orbitsWrap = document.querySelector(".focus-orbits") as HTMLElement | null;

    if (phoneStage) {
      if (mobile) {
        run(phoneStage, {
          y: [16, 0],
          opacity: [0, 1],
          duration: 620,
          delay: 80,
          ease: "outCubic",
        });
        if (phoneWrap) {
          if (!motionBlocked()) {
            const wrapAnim = scope.execute(() =>
              animate(phoneWrap, {
                opacity: [0, 1],
                duration: 480,
                delay: 100,
                ease: "outCubic",
                onComplete: (self) => {
                  active.delete(self);
                  phoneStage.style.transform = "";
                  phoneWrap.style.transform = "";
                },
              }),
            );
            active.add(wrapAnim);
          }
        }
        if (phoneCaption) run(phoneCaption, { opacity: [0, 1], y: [10, 0], delay: 380, duration: 420, ease: "outCubic" });
        if (sceneCaption) run(sceneCaption, { opacity: [0, 1], y: [-8, 0], delay: 180, duration: 420, ease: "outCubic" });
        if (orbitsWrap) run(orbitsWrap, { opacity: [0, 0.65], duration: 520, delay: 160, ease: "outCubic" });
      } else {
        run(phoneStage, {
          y: [110, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
          rotate: [-2.2, 0],
          duration: 1450,
          delay: 180,
          ease: "outExpo",
        });
        if (phoneWrap) {
          run(phoneWrap, {
            opacity: [0, 1],
            duration: 1000,
            delay: 200,
            ease: "outCubic",
          });
        }
        if (phoneImg) {
          if (!motionBlocked()) {
            const imgAnim = scope.execute(() =>
              animate(phoneImg, {
                scale: [1.05, 1],
                duration: 1450,
                delay: 300,
                ease: "outExpo",
                onComplete: (self) => {
                  active.delete(self);
                  phoneImg.style.transform = "";
                },
              }),
            );
            active.add(imgAnim);
          }
        }
        if (sceneCaption) run(sceneCaption, { opacity: [0, 1], y: [-14, 0], duration: 820, delay: 560, ease: "outExpo" });
        if (phoneCaption) run(phoneCaption, { opacity: [0, 1], y: [14, 0], duration: 820, delay: 720, ease: "outExpo" });
        if (orbitsWrap) {
          run(orbitsWrap, { opacity: [0, 1], duration: 800, delay: 120, ease: "outCubic" });
          const orbitEls = Array.from(document.querySelectorAll(".focus-orbits .orbit"));
          if (orbitEls.length) {
            run(orbitEls, {
              opacity: [0, 0.9],
              scale: [0.78, 1],
              rotate: [-8, 0],
              duration: 1100,
              delay: stagger(140, { start: 200 }),
              ease: "outExpo",
            });
          }
          const orbitPoint = document.querySelector(".orbit-point") as HTMLElement | null;
          if (orbitPoint) run(orbitPoint, { scale: [0, 1], opacity: [0, 1], duration: 700, delay: 780, ease: "outExpo" });
        }
      }
    }

    const groups: Array<{ sel: string; opts: Parameters<typeof animate>[1] }> = mobile
      ? [
          {
            sel: ".section-heading",
            opts: { y: [16, 0], opacity: [0, 1], duration: 540, ease: "outCubic" as const },
          },
          {
            sel: ".feature-product-showcase",
            opts: { y: [22, 0], opacity: [0, 1], scale: [0.96, 1], duration: 620, ease: "outExpo" as const },
          },
          {
            sel: ".feature-benefit",
            opts: { y: [16, 0], opacity: [0, 1], delay: stagger(65), duration: 540, ease: "outCubic" as const },
          },
          {
            sel: ".steps-track",
            opts: { opacity: [0, 1], scaleX: [0.6, 1], duration: 620, ease: "outExpo" as const },
          },
          {
            sel: ".step-card",
            opts: { y: [18, 0], opacity: [0, 1], scale: [0.97, 1], delay: stagger(80), duration: 580, ease: "outCubic" as const },
          },
          {
            sel: ".pricing-card",
            opts: { y: [16, 0], opacity: [0, 1], scale: [0.97, 1], delay: stagger(70), duration: 560, ease: "outCubic" as const },
          },
          {
            sel: ".testimonial-quote",
            opts: { y: [14, 0], opacity: [0, 1], delay: stagger(60), duration: 520, ease: "outCubic" as const },
          },
          {
            sel: ".contact-panel",
            opts: { y: [16, 0], opacity: [0, 1], scale: [0.98, 1], duration: 560, ease: "outCubic" as const },
          },
          {
            sel: ".reveal-footer",
            opts: { y: [14, 0], opacity: [0, 1], duration: 520, ease: "outCubic" as const },
          },
        ]
      : [
          {
            sel: ".section-heading",
            opts: { y: [32, 0], opacity: [0, 1], duration: 960, ease: "outExpo" as const },
          },
          {
            sel: ".feature-product-showcase",
            opts: { y: [48, 0], opacity: [0, 1], scale: [0.94, 1], duration: 1100, ease: "outExpo" as const },
          },
          {
            sel: ".feature-benefit",
            opts: { y: [28, 0], opacity: [0, 1], delay: stagger(95), duration: 900, ease: "outExpo" as const },
          },
          {
            sel: ".steps-track",
            opts: { opacity: [0, 1], scaleX: [0.55, 1], duration: 900, ease: "outExpo" as const },
          },
          {
            sel: ".step-card",
            opts: { y: [34, 0], opacity: [0, 1], scale: [0.95, 1], delay: stagger(120), duration: 960, ease: "outExpo" as const },
          },
          {
            sel: ".pricing-card",
            opts: { y: [34, 0], opacity: [0, 1], scale: [0.94, 1], delay: stagger(110), duration: 940, ease: "outExpo" as const },
          },
          {
            sel: ".testimonial-quote",
            opts: { y: [26, 0], opacity: [0, 1], delay: stagger(95), duration: 900, ease: "outExpo" as const },
          },
          {
            sel: ".contact-panel",
            opts: { y: [36, 0], opacity: [0, 1], scale: [0.95, 1], duration: 1000, ease: "outExpo" as const },
          },
          {
            sel: ".reveal-footer",
            opts: { y: [28, 0], opacity: [0, 1], duration: 900, ease: "outExpo" as const },
          },
        ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const matched = groups.find((g) => el.matches(g.sel));
          run(
            entry.target,
            matched?.opts ?? {
              y: [mobile ? 16 : 24, 0],
              opacity: [0, 1],
              duration: mobile ? 540 : 900,
              ease: "outExpo" as const,
            },
          );
          if (el.classList.contains("feature-product-showcase")) {
            const featurePhone = el.querySelector(".feature-phone-photo") as HTMLElement | null;
            const showcaseLight = el.querySelector(".showcase-light") as HTMLElement | null;
            if (featurePhone) {
              if (!motionBlocked()) {
                const featAnim = scope.execute(() =>
                  animate(featurePhone, {
                    y: mobile ? [24, 0] : [80, 0],
                    opacity: [0, 1],
                    scale: mobile ? [0.96, 1] : [0.86, 1],
                    duration: mobile ? 720 : 1250,
                    delay: mobile ? 120 : 180,
                    ease: "outExpo",
                    onComplete: (self) => {
                      active.delete(self);
                      featurePhone.style.transform = "";
                    },
                  }),
                );
                active.add(featAnim);
              }
            }
            if (showcaseLight) {
              run(showcaseLight, {
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: mobile ? 700 : 1100,
                delay: mobile ? 160 : 280,
                ease: "outCubic",
              });
            }
          }
          if (!mobile && el.classList.contains("feature-benefit")) {
            const icon = el.querySelector(".benefit-icon");
            const art = el.querySelector(".feature-timer-art, .task-art, .chart-art, .routine-art, .reminder-art, .team-art");
            if (icon) run(icon, { scale: [0.86, 1], rotate: [-5, 0], duration: 760, delay: 180, ease: "outExpo" as const });
            if (art) run(art, { y: [16, 0], opacity: [0, 1], duration: 720, delay: 230, ease: "outCubic" as const });
          }
          if (!mobile && el.classList.contains("step-card")) {
            const selector = el.querySelector(".step-selector");
            const number = el.querySelector(".step-number");
            const visual = el.querySelector(".step-visual");
            if (selector) run(selector, { y: [10, 0], opacity: [0, 1], duration: 620, delay: 200, ease: "outExpo" as const });
            if (number) run(number, { y: [12, 0], opacity: [0, 1], duration: 700, delay: 260, ease: "outExpo" as const });
            if (visual) run(visual, { y: [18, 0], opacity: [0, 1], scale: [0.96, 1], duration: 780, delay: 320, ease: "outExpo" as const });
          }
          if (!mobile && el.classList.contains("contact-panel")) {
            const orbs = Array.from(el.querySelectorAll(".contact-orb"));
            if (orbs.length) {
              run(orbs, {
                opacity: [0, 1],
                scale: [0.7, 1],
                duration: 1100,
                delay: stagger(160, { start: 220 }),
                ease: "outCubic",
              });
            }
            const points = Array.from(el.querySelectorAll(".contact-points li"));
            if (points.length) {
              run(points, {
                y: [12, 0],
                opacity: [0, 1],
                duration: 620,
                delay: stagger(70, { start: 380 }),
                ease: "outExpo",
              });
            }
            const actions = el.querySelector(".contact-actions");
            if (actions) run(actions, { y: [14, 0], opacity: [0, 1], duration: 700, delay: 300, ease: "outExpo" });
          }
          if (!mobile && el.classList.contains("reveal-footer")) {
            const brand = el.querySelector(".footer-brand");
            const navItems = Array.from(el.querySelectorAll(".footer-nav li"));
            const share = el.querySelector(".footer-share");
            const label = el.querySelector(".footer-label");
            if (el.classList.contains("footer-brand-word")) {
              run(el, { y: [22, 0], opacity: [0, 1], duration: 1000, ease: "outExpo" });
              return;
            }
            if (brand) run(brand, { y: [16, 0], opacity: [0, 1], duration: 720, delay: 120, ease: "outExpo" });
            if (label) run(label, { opacity: [0, 1], duration: 500, delay: 160, ease: "outCubic" });
            if (navItems.length) {
              run(navItems, {
                y: [12, 0],
                opacity: [0, 1],
                duration: 560,
                delay: stagger(45, { start: 200 }),
                ease: "outCubic",
              });
            }
            if (share) run(share, { y: [14, 0], opacity: [0, 1], duration: 680, delay: 340, ease: "outExpo" });
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: mobile ? 0.08 : 0.1, rootMargin: mobile ? "0px 0px -5% 0px" : "0px 0px -8% 0px" },
    );
    groups.forEach((g) => document.querySelectorAll(g.sel).forEach((el) => observer.observe(el)));

    const safety = window.setTimeout(() => {
      const vh = window.innerHeight || 1;
      const extraSels = [
        ".feature-phone-photo",
        ".showcase-light",
        ".step-visual",
        ".contact-points li",
        ".contact-orb",
        ".footer-brand-word",
        ".footer-grid",
      ];
      const targets = [
        ...groups.flatMap((g) => Array.from(document.querySelectorAll(g.sel))),
        ...extraSels.flatMap((s) => Array.from(document.querySelectorAll(s))),
      ];
      targets.forEach((el) => {
        const node = el as HTMLElement;
        const rect = node.getBoundingClientRect();
        const inView = rect.top < vh && rect.bottom > 0;
        if (!inView) return;
        if (getComputedStyle(node).opacity === "0") {
          observer.unobserve(el);
          run(el, {
            opacity: [0, 1],
            y: [0, 0],
            duration: 400,
            ease: "outCubic",
          } as Parameters<typeof animate>[1]);
        }
      });
    }, 3000);

    const cleanupHover: (() => void)[] = [];
    cleanupHover.push(() => window.clearTimeout(safety));

    if (!mobile && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const hoverSets: Array<{ sel: string; enter: Record<string, unknown>; leave: Record<string, unknown> }> = [
        {
          sel: ".feature-benefit",
          enter: { y: -7, scale: 1.01, ease: spring({ stiffness: 180, damping: 16 }) },
          leave: { y: 0, scale: 1, ease: spring({ stiffness: 150, damping: 18 }) },
        },
        {
          sel: ".step-card",
          enter: { y: -5, scale: 1.008, ease: spring({ stiffness: 175, damping: 16 }) },
          leave: { y: 0, scale: 1, ease: spring({ stiffness: 145, damping: 18 }) },
        },
        {
          sel: ".pricing-card",
          enter: { y: -8, scale: 1.012, ease: spring({ stiffness: 175, damping: 15 }) },
          leave: { y: 0, scale: 1, ease: spring({ stiffness: 140, damping: 18 }) },
        },
        {
          sel: ".testimonial-quote",
          enter: { y: -5, scale: 1.004, ease: spring({ stiffness: 170, damping: 16 }) },
          leave: { y: 0, scale: 1, ease: spring({ stiffness: 150, damping: 18 }) },
        },
        {
          sel: ".hero-actions button, .contact-primary button, .how-bottom button",
          enter: { y: -2, scale: 1.015, ease: spring({ stiffness: 220, damping: 14 }) },
          leave: { y: 0, scale: 1, ease: spring({ stiffness: 180, damping: 16 }) },
        },
        {
          sel: ".share-btn",
          enter: { y: -2, scale: 1.02, ease: spring({ stiffness: 210, damping: 15 }) },
          leave: { y: 0, scale: 1, ease: spring({ stiffness: 170, damping: 17 }) },
        },
        {
          sel: ".header-cta, .menu-trigger",
          enter: { y: -2, scale: 1.03, ease: spring({ stiffness: 200, damping: 14 }) },
          leave: { y: 0, scale: 1, ease: spring({ stiffness: 160, damping: 17 }) },
        },
      ];
      hoverSets.forEach(({ sel, enter, leave }) => {
        document.querySelectorAll(sel).forEach((element) => {
          const onEnter = () => {
            if (motionBlocked()) return;
            run(element, enter as Parameters<typeof animate>[1]);
          };
          const onLeave = () => run(element, leave as Parameters<typeof animate>[1]);
          element.addEventListener("mouseenter", onEnter);
          element.addEventListener("mouseleave", onLeave);
          cleanupHover.push(() => {
            element.removeEventListener("mouseenter", onEnter);
            element.removeEventListener("mouseleave", onLeave);
          });
        });
      });

      document.querySelectorAll(".pricing-card.pro-plan").forEach((card) => {
        const glow = card.querySelector(".price-value") as HTMLElement | null;
        if (!glow) return;
        const enter2 = () => {
          if (motionBlocked()) return;
          animate(glow, { scale: [1, 1.04], duration: 220, ease: "outCubic" });
        };
        const leave2 = () => {
          animate(glow, { scale: [1.04, 1], duration: 260, ease: "outCubic" });
        };
        card.addEventListener("mouseenter", enter2);
        card.addEventListener("mouseleave", leave2);
        cleanupHover.push(() => {
          card.removeEventListener("mouseenter", enter2);
          card.removeEventListener("mouseleave", leave2);
        });
      });
    }

    const sync = () => {
      if (!motionBlocked()) return;
      active.forEach((animation) => animation.complete());
      active.clear();
      revealAllNow();
    };
    const preference = new MutationObserver(sync);
    preference.observe(root, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      preference.disconnect();
      cleanupHover.forEach((cleanup) => cleanup());
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      active.forEach((animation) => animation.cancel());
      scope.revert();
    };
  }, []);
  return null;
}
