# FocusFlow

A responsive landing page for a fictional mobile productivity app. Built with Next.js 16 App Router, React, TypeScript, Tailwind CSS 4, and self-hosted Manrope.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` to check a release.

## Experience

The page includes navigation, illustrated hero, six features, three workflow steps, three pricing plans, three fictional testimonials, contact section, and footer. Primary calls to action open a working 25-minute timer with an optional prefilled task, pause, resume, reset, Escape dismissal, and keyboard focus management. Monthly and annual billing are illustrative; this demo has no checkout or account system.

The design uses an ivory and forest palette, two supplied metallic-phone product photographs, sculptural orbit lines, an asymmetric feature layout, and a dark workflow section. Decorative motion can be paused globally and respects the operating system's reduced-motion preference. Animation pauses in a hidden browser tab; countdown timing remains based on elapsed time.

## Architecture

The route and layout are Server Components. Features and testimonials are composed on the server and passed into a client interaction shell. Small client components handle pointer spotlight, navigation, billing, sharing, and the timer. The mobile menu is portalled outside the sticky header to avoid backdrop-filter containing-block bugs, locks background interaction, retains scroll position, and restores focus without scrolling. Motion preferences live in the footer. No backend, tracking, or persistent storage is required. The product photographs are static previews. The visible timer CTA and an accessible hotspot over the preview button open the real live timer. Starting works immediately with a default task; editing it is optional. Feature diagrams and the preview charts are illustrative.

## Assets and licenses

- Aurora background shader adapted from React Bits (David Haz), dynamically loaded with OGL, capped pixel density, and 30 FPS rendering. Pauses offscreen, in hidden tabs, and when motion is paused. Static CSS fallback for reduced motion and unavailable WebGL. MIT + Commons Clause notice in `public/licenses/react-bits-LICENSE.md`.
- Icons from Lucide. Manrope license in `public/fonts/OFL.txt`.
- The two phone photographs are supplied project assets; feature diagrams use original markup.

## Deployment

Import this repository into Vercel (Next.js preset) or Netlify (Next.js support). Use `npm run build`; do not configure a static export. Copy `.env.example` and set `NEXT_PUBLIC_SITE_URL` to the real production origin and `NEXT_PUBLIC_GITHUB_URL` to the real repository URL. Rebuild after changing either value. Canonical, sitemap entries, and GitHub links remain unconfigured until these values exist. The open graph image is a local 1200×630 PNG.

A live URL and repository URL must be supplied after publishing. Testimonials and pricing are explicitly fictional. The page collects no personal data.

## Validation

TypeScript and ESLint are release checks. Browser checks should cover widths 360, 390, 768, 1024, and 1440, navigation, all CTA buttons, billing prices, timer lifecycle, keyboard-only menus/dialogs, reduced motion, and horizontal overflow.
