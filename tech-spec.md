# Tech Spec — Sitka Cuve Website

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| react-dom | ^18.2.0 | DOM renderer |
| vite | ^5.0.0 | Build tool |
| @vitejs/plugin-react | ^4.0.0 | Vite React support |
| typescript | ^5.3.0 | Type safety |
| tailwindcss | ^3.4.0 | Utility CSS |
| gsap | ^3.12.0 | Animation engine (includes ScrollTrigger, ScrollSmoother) |
| lenis | ^1.1.0 | Smooth scroll |
| three | ^0.160.0 | 3D engine for hero and gallery effects |
| @types/three | ^0.160.0 | Three.js type definitions |
| @fontsource/playfair-display | ^5.0.0 | Display font |
| @fontsource/dm-sans | ^5.0.0 | Body font |
| lucide-react | ^0.400.0 | Social media icons (Spotify, Instagram, YouTube, Twitter, Facebook) |

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Navigation | Custom | Once — fixed nav bar that transitions from transparent (hero) to solid (scrolled) |
| Footer | Custom | Once |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Full-viewport with parallax background, centered title, social icons, nav links |
| NewReleaseSection | Custom | Two-column asymmetric (45/55), album artwork + text content |
| JourneySection | Custom | Horizontal scroll gallery with 12 images + text columns below |
| MorphGallerySection | Custom | Fullscreen 3D sliced image morph (Three.js + GSAP ScrollTrigger pin) |
| AboutSection | Custom | Centered single-column editorial layout |
| ListenSection | Custom | Two platform cards (Spotify, YouTube) |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| SocialIcons | Custom | HeroSection, Footer |
| ScrollIndicator | Custom | HeroSection only |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenis | Initialize Lenis, sync with GSAP ScrollTrigger |
| useScrollAnimation | Reusable ScrollTrigger entrance animation pattern |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Hero parallax | GSAP ScrollTrigger | scrub animation on background translateY + content fade/scale | Medium |
| Hero entrance | GSAP | Title fade-in, social icons stagger, nav links slide-up on load | Low |
| Nav scroll transition | GSAP ScrollTrigger | Toggle class/background based on scroll position past hero | Low |
| Section entrance pattern | GSAP ScrollTrigger | Reusable batch: fade + translateY with stagger, triggered at top 75% | Low |
| Horizontal scroll gallery | GSAP ScrollTrigger | Pin section, scrub translateX on wrapper over 250% scroll distance | Medium |
| 3D sliced image morph | Three.js + GSAP | 6 shaderMaterial planes in a group, ScrollTrigger-driven timeline: camera fly-through (z: 5→0→5), radial rotation, texture morph (uProgress), brightness pulse | High |
| Film grain overlay | CSS | Pseudo-element with repeating noise PNG, 3% opacity, mix-blend-mode: multiply | Low |
| Button hover | CSS | transition on background-color, transform | Low |
| Smooth scroll | Lenis | Global lenis instance synced to ScrollTrigger via on('scroll') | Low |

## State & Logic

- **No external state management** — all components are presentational.
- **Lenis instance** is created once at app root level and stored in a ref (not React state) to avoid re-renders.
- **Three.js scenes** (MorphGallery) manage their own lifecycle via useEffect with cleanup (dispose geometry, material, textures, renderer).
- **ScrollTrigger instances** are created in useEffect hooks and killed on unmount.

## Other Key Decisions

- **Three.js over React Three Fiber**: Direct Three.js gives full control over shader uniforms and GSAP ScrollTrigger integration. R3F adds abstraction overhead for this use case.
- **GSAP for all animations**: No framer-motion needed — GSAP handles entrance, scroll-driven, and timeline animations consistently.
- **No shadcn/ui components**: This is a fully custom editorial design with no standard UI patterns (forms, dialogs, tables). All components are bespoke.
- **Gallery images**: 12 images loaded as standard `<img>` tags inside a flex container. The Three.js canvas overlays the gallery section for the distortion effect planes.
- **Font loading**: Use @fontsource packages for self-hosted Playfair Display and DM Sans to avoid FOUT and ensure reliability.
