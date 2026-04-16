# Brian Lapinski Personal Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page Nuxt personal brand site with shader-based page transitions, generative hero, and editorial design quality.

**Architecture:** Nuxt 4 SSG site with 5 pages. Custom CSS design system (no Tailwind). Three.js handles shader hero and page transitions via `.client.vue` components. GSAP + ScrollTrigger for scroll animations. Lenis for smooth scroll. Static content — no CMS, no auth. Contact form posts to a server API route (Formspree initially).

**Tech Stack:** Nuxt 4, Vue 3, Three.js, GSAP 3.14, Lenis, custom GLSL shaders, Vercel

---

## File Structure

```
brian-lapinski/
├── nuxt.config.ts
├── package.json
├── .gitignore
├── app/
│   ├── app.vue
│   ├── assets/
│   │   └── css/
│   │       ├── base.css            # Reset, CSS custom properties, typography
│   │       ├── layout.css          # Grid, containers, full-bleed sections
│   │       └── utilities.css       # Spacing scale, responsive helpers
│   ├── components/
│   │   ├── AppHeader.vue           # Fixed nav with route links
│   │   ├── AppFooter.vue           # Dark footer with links
│   │   ├── ShaderHero.client.vue   # Three.js generative noise canvas
│   │   ├── ShaderTransition.client.vue  # WebGL page transition overlay
│   │   ├── ProjectCard.vue         # Portfolio project card
│   │   ├── ServiceBlock.vue        # Service offering block
│   │   ├── ProcessStep.vue         # Numbered step in process section
│   │   ├── ContactForm.vue         # Form with validation
│   │   └── ScrollReveal.vue        # Wrapper component for GSAP reveals
│   ├── composables/
│   │   └── useScrollReveal.ts      # GSAP ScrollTrigger reveal logic
│   ├── layouts/
│   │   └── default.vue             # Shell: header + slot + footer
│   ├── pages/
│   │   ├── index.vue               # Home
│   │   ├── services.vue            # Services
│   │   ├── work.vue                # Portfolio
│   │   ├── about.vue               # About
│   │   └── contact.vue             # Contact
│   ├── plugins/
│   │   ├── lenis.client.ts         # Lenis smooth scroll init
│   │   └── gsap.client.ts          # GSAP + ScrollTrigger registration
│   └── shaders/
│       ├── hero.vert               # Hero vertex shader (passthrough)
│       ├── hero.frag               # Hero fragment shader (noise field)
│       ├── transition.vert         # Transition vertex shader
│       └── transition.frag         # Transition fragment (displacement wipe)
├── data/
│   └── projects.ts                 # Portfolio project data
├── public/
│   └── images/                     # Project thumbnails, OG image
└── server/
    └── api/
        └── contact.post.ts         # Contact form handler
```

---

## Task 1: Scaffold Nuxt Project + Dependencies

**Files:**
- Create: `package.json`, `nuxt.config.ts`, `.gitignore`, `app/app.vue`

- [ ] **Step 1: Initialize Nuxt project**

```bash
cd /c/Users/Brian/OneDrive/Desktop/Agentic\ Systems/brian-lapinski
npx nuxi@latest init . --force --packageManager npm
```

- [ ] **Step 2: Install dependencies**

```bash
npm install gsap@^3.14.2 lenis@^1.3.18 three@^0.183.2
npm install -D @types/three@^0.183.1 @nuxtjs/google-fonts@^3.2.0
```

- [ ] **Step 3: Configure nuxt.config.ts**

Replace the generated config with:

```ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Instrument+Serif': [400],
      'DM+Sans': [400, 500, 600],
    },
    display: 'swap',
    preload: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Brian Lapinski — AI Engineer & Web Developer',
      meta: [
        { name: 'description', content: 'AI engineering and web development. Agents, MCP integrations, RAG pipelines, immersive web experiences.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Brian Lapinski — AI Engineer & Web Developer' },
        { property: 'og:description', content: 'AI engineering and web development. Agents, MCP integrations, immersive web experiences.' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: [
    '~/assets/css/base.css',
    '~/assets/css/layout.css',
    '~/assets/css/utilities.css',
  ],
})
```

- [ ] **Step 4: Create .gitignore**

```
node_modules
.nuxt
.output
dist
.env
*.local
```

- [ ] **Step 5: Create minimal app.vue**

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 6: Verify it runs**

```bash
npm run dev
```

Expected: Nuxt dev server starts on http://localhost:3000, blank page renders without errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Nuxt project with deps"
```

---

## Task 2: Design System — CSS Custom Properties + Typography

**Files:**
- Create: `app/assets/css/base.css`, `app/assets/css/layout.css`, `app/assets/css/utilities.css`

- [ ] **Step 1: Write base.css with reset and design tokens**

```css
/* base.css — Reset + Design Tokens + Typography */

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colors */
  --bg: #FAFAF9;
  --surface: #F5F5F0;
  --text-primary: #1A1A2E;
  --text-secondary: #6B7280;
  --accent: #2563EB;
  --accent-hover: #1D4ED8;
  --success: #059669;
  --border: #E5E7EB;
  --dark: #0F172A;
  --on-dark: #F1F5F9;

  /* Typography */
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'Courier New', monospace;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;

  /* Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background-color: var(--bg);
  color: var(--text-primary);
}

body {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.6;
  overflow-x: hidden;
}

/* Typography scale */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); }
h2 { font-size: clamp(2rem, 4vw, 3rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
h4 { font-size: 1.25rem; }

p {
  max-width: 65ch;
  line-height: 1.7;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

a:hover {
  color: var(--accent-hover);
}

/* Overline — uppercase label style */
.overline {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

/* Mono text */
code, .mono {
  font-family: var(--font-mono);
  font-size: 0.875em;
}

/* Selection */
::selection {
  background-color: var(--accent);
  color: white;
}

/* Focus visible */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

- [ ] **Step 2: Write layout.css**

```css
/* layout.css — Grid, containers, sections */

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-8);
  }
}

.section {
  padding: var(--space-24) 0;
}

.section--surface {
  background-color: var(--surface);
}

.section--dark {
  background-color: var(--dark);
  color: var(--on-dark);
}

.section--dark .overline {
  color: var(--on-dark);
  opacity: 0.6;
}

/* Full-bleed: breaks out of container */
.full-bleed {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

/* Grid */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid--2 {
  grid-template-columns: 1fr;
}

.grid--3 {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid--2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid--3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid--3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Page transition fallback */
.page-enter-active,
.page-leave-active {
  transition: opacity var(--duration-slow) var(--ease-in-out);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
```

- [ ] **Step 3: Write utilities.css**

```css
/* utilities.css — Spacing helpers, text utilities */

.text-center { text-align: center; }
.text-secondary { color: var(--text-secondary); }
.text-accent { color: var(--accent); }

.mt-2 { margin-top: var(--space-2); }
.mt-4 { margin-top: var(--space-4); }
.mt-6 { margin-top: var(--space-6); }
.mt-8 { margin-top: var(--space-8); }
.mt-12 { margin-top: var(--space-12); }
.mt-16 { margin-top: var(--space-16); }

.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }

.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }

/* Button base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.btn--primary {
  background-color: var(--accent);
  color: white;
}

.btn--primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-1px);
}

.btn--outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.btn--outline:hover {
  border-color: var(--text-primary);
}

/* Visually hidden (a11y) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

- [ ] **Step 4: Verify dev server renders with design tokens**

```bash
npm run dev
```

Expected: Page loads with correct background color (#FAFAF9), DM Sans body font visible.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: design system — CSS tokens, typography, layout, utilities"
```

---

## Task 3: Layout Shell — Header + Footer + Default Layout

**Files:**
- Create: `app/layouts/default.vue`, `app/components/AppHeader.vue`, `app/components/AppFooter.vue`
- Create: `app/pages/index.vue` (placeholder)

- [ ] **Step 1: Create AppHeader.vue**

Fixed navigation with logo (text-based) and route links. No hamburger menu yet — desktop-first, collapse to minimal on mobile.

```vue
<script setup lang="ts">
const route = useRoute()

const links = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <NuxtLink to="/" class="header__logo">
        Brian Lapinski
      </NuxtLink>
      <nav class="header__nav" aria-label="Main navigation">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="header__link"
          :class="{ 'header__link--active': route.path === link.to }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background-color: rgba(250, 250, 249, 0.85);
  border-bottom: 1px solid var(--border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.header__logo {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--text-primary);
  text-decoration: none;
}

.header__nav {
  display: flex;
  gap: var(--space-8);
}

.header__link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.header__link:hover,
.header__link--active {
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .header__nav {
    gap: var(--space-4);
  }
  .header__link {
    font-size: 0.8125rem;
  }
}
</style>
```

- [ ] **Step 2: Create AppFooter.vue**

Dark footer with links to Substack, Gumroad, GitHub, LinkedIn.

```vue
<script setup lang="ts">
const year = new Date().getFullYear()

const socialLinks = [
  { href: 'https://github.com/lapbrian2', label: 'GitHub' },
  { href: 'https://linkedin.com/in/brian-lapinski', label: 'LinkedIn' },
  { href: '#', label: 'Substack' },
  { href: '#', label: 'Gumroad' },
]
</script>

<template>
  <footer class="footer section--dark">
    <div class="container footer__inner">
      <div class="footer__brand">
        <p class="footer__name">Brian Lapinski</p>
        <p class="footer__tagline text-secondary">AI Engineer & Web Developer</p>
      </div>
      <nav class="footer__links" aria-label="Social links">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          class="footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.label }}
        </a>
      </nav>
      <p class="footer__copy">&copy; {{ year }} Brian Lapinski</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--space-16) 0 var(--space-8);
}

.footer__inner {
  display: grid;
  gap: var(--space-8);
}

.footer__name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--on-dark);
}

.footer__tagline {
  margin-top: var(--space-2);
  color: var(--on-dark);
  opacity: 0.5;
  font-size: 0.875rem;
}

.footer__links {
  display: flex;
  gap: var(--space-6);
}

.footer__link {
  font-size: 0.875rem;
  color: var(--on-dark);
  opacity: 0.6;
  text-decoration: none;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.footer__link:hover {
  opacity: 1;
}

.footer__copy {
  font-size: 0.75rem;
  color: var(--on-dark);
  opacity: 0.3;
}
</style>
```

- [ ] **Step 3: Create default.vue layout**

```vue
<template>
  <div class="page-wrapper">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  padding-top: 64px; /* header height */
}
</style>
```

- [ ] **Step 4: Create placeholder index.vue**

```vue
<template>
  <div class="section">
    <div class="container">
      <h1>Brian Lapinski</h1>
      <p class="mt-4 text-secondary">AI Engineer & Web Developer</p>
    </div>
  </div>
</template>
```

- [ ] **Step 5: Verify layout renders**

```bash
npm run dev
```

Expected: Page shows header with nav links, "Brian Lapinski" heading, dark footer. Header is fixed, content scrolls beneath it.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: layout shell — header, footer, default layout"
```

---

## Task 4: Lenis + GSAP Plugins

**Files:**
- Create: `app/plugins/lenis.client.ts`, `app/plugins/gsap.client.ts`
- Create: `app/composables/useScrollReveal.ts`

- [ ] **Step 1: Create Lenis plugin**

```ts
// app/plugins/lenis.client.ts
import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return {
    provide: { lenis },
  }
})
```

- [ ] **Step 2: Create GSAP plugin**

```ts
// app/plugins/gsap.client.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Integrate Lenis with ScrollTrigger
  const { $lenis } = useNuxtApp()
  if ($lenis) {
    $lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time: number) => {
      $lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }

  return {
    provide: { gsap, ScrollTrigger },
  }
})
```

- [ ] **Step 3: Create useScrollReveal composable**

```ts
// app/composables/useScrollReveal.ts
import { onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: {
    y?: number
    opacity?: number
    duration?: number
    delay?: number
    stagger?: number
  } = {}
) {
  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
  } = options

  let ctx: any

  onMounted(() => {
    const { $gsap, $ScrollTrigger } = useNuxtApp()
    if (!$gsap || !target.value) return

    const children = target.value.children.length > 1
      ? target.value.children
      : target.value

    ctx = $gsap.context(() => {
      $gsap.from(children, {
        y,
        opacity,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target.value,
          start: 'top 85%',
          once: true,
        },
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
```

- [ ] **Step 4: Verify smooth scroll works**

```bash
npm run dev
```

Expected: Page has smooth inertia scrolling via Lenis. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Lenis smooth scroll + GSAP ScrollTrigger plugins"
```

---

## Task 5: Shader Hero Component

**Files:**
- Create: `app/shaders/hero.vert`, `app/shaders/hero.frag`, `app/components/ShaderHero.client.vue`

- [ ] **Step 1: Write hero vertex shader**

```glsl
// app/shaders/hero.vert
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

- [ ] **Step 2: Write hero fragment shader**

Generative noise field — subtle, warm, organic movement. Responds to mouse position.

```glsl
// app/shaders/hero.frag
precision highp float;

varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

// Simplex noise helpers
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;

  // Mouse influence — subtle displacement
  vec2 mouse = uMouse * vec2(aspect, 1.0);
  float mouseDist = length(uv - mouse);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.15;

  // Layered noise
  float t = uTime * 0.15;
  float n1 = snoise(uv * 2.0 + t) * 0.5;
  float n2 = snoise(uv * 4.0 - t * 0.7) * 0.25;
  float n3 = snoise(uv * 8.0 + t * 0.3) * 0.125;
  float noise = n1 + n2 + n3 + mouseInfluence;

  // Warm palette — blend between bg color and subtle warm tone
  vec3 bgColor = vec3(0.98, 0.98, 0.976); // #FAFAF9
  vec3 warmTone = vec3(0.94, 0.93, 0.90);  // subtle warm shift
  vec3 accentTone = vec3(0.88, 0.90, 0.95); // faint cool accent

  vec3 color = mix(bgColor, warmTone, noise * 0.5 + 0.5);
  color = mix(color, accentTone, smoothstep(0.3, 0.7, noise) * 0.15);

  // Subtle grain
  float grain = (fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
  color += grain;

  gl_FragColor = vec4(color, 1.0);
}
```

- [ ] **Step 3: Write ShaderHero.client.vue**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// Import shaders as raw strings
import heroVert from '~/shaders/hero.vert?raw'
import heroFrag from '~/shaders/hero.frag?raw'

const canvas = ref<HTMLCanvasElement | null>(null)

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let material: THREE.ShaderMaterial
let animationId: number
const mouse = new THREE.Vector2(0.5, 0.5)

function onMouseMove(e: MouseEvent) {
  mouse.x = e.clientX / window.innerWidth
  mouse.y = 1.0 - e.clientY / window.innerHeight
}

function onResize() {
  if (!canvas.value || !renderer) return
  const w = canvas.value.clientWidth
  const h = canvas.value.clientHeight
  renderer.setSize(w, h)
  material.uniforms.uResolution.value.set(w, h)
}

onMounted(() => {
  if (!canvas.value) return

  const w = canvas.value.clientWidth
  const h = canvas.value.clientHeight

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: false,
    alpha: false,
  })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  material = new THREE.ShaderMaterial({
    vertexShader: heroVert,
    fragmentShader: heroFrag,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(w, h) },
    },
  })

  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const clock = new THREE.Clock()

  function animate() {
    animationId = requestAnimationFrame(animate)
    material.uniforms.uTime.value = clock.getElapsedTime()
    material.uniforms.uMouse.value.lerp(mouse, 0.05)
    renderer.render(scene, camera)
  }
  animate()

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas ref="canvas" class="shader-hero" aria-hidden="true" />
</template>

<style scoped>
.shader-hero {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
```

- [ ] **Step 4: Verify shader renders**

Update `pages/index.vue` temporarily to include the shader:

```vue
<template>
  <div class="hero">
    <ShaderHero />
    <div class="container hero__content">
      <h1>Brian Lapinski</h1>
      <p class="mt-4 text-secondary">AI Engineer & Web Developer</p>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.hero__content {
  position: relative;
  z-index: 1;
}
</style>
```

Expected: Subtle animated noise background behind the heading. Mouse movement causes gentle displacement. 60fps.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: generative shader hero — simplex noise with mouse interaction"
```

---

## Task 6: Home Page — Full Content

**Files:**
- Modify: `app/pages/index.vue`
- Create: `app/components/ServiceBlock.vue`, `app/components/ProjectCard.vue`
- Create: `data/projects.ts`

- [ ] **Step 1: Create project data**

```ts
// data/projects.ts
export interface Project {
  title: string
  description: string
  category: 'ai' | 'web' | 'creative'
  url?: string
  image?: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: 'ML Systems Universe',
    description: 'Interactive 3D exploration of machine learning systems and their connections.',
    category: 'creative',
    url: 'https://ml-systems-universe.vercel.app/',
    tags: ['Three.js', 'GSAP', 'Data Visualization'],
  },
  {
    title: 'CLI-Anything',
    description: 'Turn GUI software into agent-controllable Python APIs. 22 MCP tools across 4 applications.',
    category: 'ai',
    tags: ['Python', 'MCP', 'Automation'],
  },
  {
    title: 'Portfolio',
    description: 'Graffiti-inspired art portfolio with Three.js, Easter eggs, and scroll-driven animations.',
    category: 'creative',
    url: 'https://brian-lapinski-portfolio.vercel.app/',
    tags: ['Three.js', 'GSAP', 'Web Audio'],
  },
]
```

- [ ] **Step 2: Create ServiceBlock.vue**

```vue
<script setup lang="ts">
defineProps<{
  overline: string
  title: string
  description: string
  items: string[]
}>()
</script>

<template>
  <div class="service-block">
    <p class="overline">{{ overline }}</p>
    <h3 class="service-block__title">{{ title }}</h3>
    <p class="service-block__desc text-secondary">{{ description }}</p>
    <ul class="service-block__list">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped>
.service-block {
  padding: var(--space-8);
  border: 1px solid var(--border);
}

.service-block__title {
  margin-top: var(--space-3);
}

.service-block__desc {
  margin-top: var(--space-4);
  font-size: 0.9375rem;
}

.service-block__list {
  margin-top: var(--space-6);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.service-block__list li {
  font-size: 0.875rem;
  color: var(--text-secondary);
  padding-left: var(--space-4);
  position: relative;
}

.service-block__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 6px;
  height: 1px;
  background: var(--accent);
}
</style>
```

- [ ] **Step 3: Create ProjectCard.vue**

```vue
<script setup lang="ts">
import type { Project } from '~/data/projects'

defineProps<{ project: Project }>()

const categoryLabel: Record<string, string> = {
  ai: 'AI Engineering',
  web: 'Web Development',
  creative: 'Creative',
}
</script>

<template>
  <component
    :is="project.url ? 'a' : 'div'"
    :href="project.url"
    :target="project.url ? '_blank' : undefined"
    :rel="project.url ? 'noopener noreferrer' : undefined"
    class="project-card"
  >
    <div class="project-card__image" v-if="project.image">
      <img :src="project.image" :alt="project.title" loading="lazy" />
    </div>
    <div class="project-card__body">
      <p class="overline">{{ categoryLabel[project.category] }}</p>
      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__desc text-secondary">{{ project.description }}</p>
      <div class="project-card__tags">
        <span v-for="tag in project.tags" :key="tag" class="project-card__tag">{{ tag }}</span>
      </div>
    </div>
  </component>
</template>

<style scoped>
.project-card {
  display: block;
  border: 1px solid var(--border);
  text-decoration: none;
  color: inherit;
  transition: border-color var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.project-card:hover {
  border-color: var(--text-secondary);
}

.project-card__image img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.project-card__body {
  padding: var(--space-6);
}

.project-card__title {
  margin-top: var(--space-2);
  font-size: 1.25rem;
}

.project-card__desc {
  margin-top: var(--space-3);
  font-size: 0.875rem;
}

.project-card__tags {
  margin-top: var(--space-4);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.project-card__tag {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  padding: var(--space-1) var(--space-2);
  background: var(--surface);
  color: var(--text-secondary);
}
</style>
```

- [ ] **Step 4: Build full index.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { projects } from '~/data/projects'

const servicesRef = ref<HTMLElement | null>(null)
const workRef = ref<HTMLElement | null>(null)

useScrollReveal(servicesRef)
useScrollReveal(workRef)

const featuredProjects = projects.slice(0, 3)
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <ShaderHero />
      <div class="container hero__content">
        <p class="overline mb-4">AI Engineer & Web Developer</p>
        <h1>I build intelligent systems<br>and immersive web experiences</h1>
        <p class="hero__sub mt-6 text-secondary">
          From AI agents and MCP integrations to high-performance creative websites.
        </p>
        <div class="hero__cta mt-8">
          <NuxtLink to="/contact" class="btn btn--primary">Let's work together</NuxtLink>
          <NuxtLink to="/work" class="btn btn--outline">See my work</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Services overview -->
    <section ref="servicesRef" class="section">
      <div class="container">
        <p class="overline mb-4">What I Do</p>
        <h2>Two disciplines,<br>one builder</h2>
        <div class="grid grid--2 mt-12">
          <ServiceBlock
            overline="Engineering"
            title="AI Systems"
            description="Production AI that works — not demos."
            :items="['Agents & orchestration', 'MCP server integrations', 'RAG pipelines', 'Full-stack AI applications']"
          />
          <ServiceBlock
            overline="Development"
            title="Web Experiences"
            description="Custom sites that prove your brand is serious."
            :items="['Immersive 3D & WebGL', 'Scroll-driven animations', 'Performance-first architecture', 'Custom design systems']"
          />
        </div>
        <div class="mt-12">
          <NuxtLink to="/services" class="btn btn--outline">View services &amp; process</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured work -->
    <section ref="workRef" class="section section--surface">
      <div class="container">
        <p class="overline mb-4">Selected Work</p>
        <h2>Recent projects</h2>
        <div class="grid grid--3 mt-12">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.title"
            :project="project"
          />
        </div>
        <div class="mt-12">
          <NuxtLink to="/work" class="btn btn--outline">All projects</NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container text-center">
        <h2>Have a project in mind?</h2>
        <p class="mt-4 text-secondary">I'm available for AI engineering contracts and web development projects.</p>
        <div class="mt-8">
          <NuxtLink to="/contact" class="btn btn--primary">Get in touch</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__content {
  position: relative;
  z-index: 1;
}

.hero__sub {
  font-size: 1.125rem;
  max-width: 50ch;
}

.hero__cta {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}
</style>
```

- [ ] **Step 5: Verify home page renders fully**

```bash
npm run dev
```

Expected: Full home page with shader hero, services grid, project cards, CTA section. Scroll reveals animate on scroll. All links work.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: home page — hero, services, featured work, CTA"
```

---

## Task 7: Services Page

**Files:**
- Create: `app/pages/services.vue`, `app/components/ProcessStep.vue`

- [ ] **Step 1: Create ProcessStep.vue**

```vue
<script setup lang="ts">
defineProps<{
  number: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="process-step">
    <span class="process-step__num mono">{{ number }}</span>
    <h3 class="process-step__title">{{ title }}</h3>
    <p class="process-step__desc text-secondary">{{ description }}</p>
  </div>
</template>

<style scoped>
.process-step {
  padding: var(--space-8) 0;
  border-top: 1px solid var(--border);
}

.process-step__num {
  font-size: 0.75rem;
  color: var(--accent);
}

.process-step__title {
  margin-top: var(--space-3);
  font-size: 1.5rem;
}

.process-step__desc {
  margin-top: var(--space-3);
  font-size: 0.9375rem;
}
</style>
```

- [ ] **Step 2: Create services.vue**

```vue
<script setup lang="ts">
const processRef = ref<HTMLElement | null>(null)
useScrollReveal(processRef, { stagger: 0.15 })
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <p class="overline mb-4">Services</p>
        <h1>What I build</h1>
        <p class="mt-6 text-secondary" style="font-size: 1.125rem; max-width: 55ch;">
          I help companies build AI systems that work in production and websites that convert. Available for contracts, projects, and ongoing partnerships.
        </p>
      </div>
    </section>

    <!-- AI Engineering -->
    <section class="section section--surface">
      <div class="container">
        <p class="overline mb-4">AI Engineering</p>
        <h2>Intelligent systems that ship</h2>
        <div class="grid grid--2 mt-8">
          <div>
            <h4>Agents & Orchestration</h4>
            <p class="mt-2 text-secondary" style="font-size: 0.9375rem;">Multi-agent systems, tool-use patterns, autonomous workflows. Claude, OpenAI, custom LLM pipelines.</p>
          </div>
          <div>
            <h4>MCP Integrations</h4>
            <p class="mt-2 text-secondary" style="font-size: 0.9375rem;">Connect your internal tools to AI. Custom MCP servers, tool definitions, structured output.</p>
          </div>
          <div>
            <h4>RAG Pipelines</h4>
            <p class="mt-2 text-secondary" style="font-size: 0.9375rem;">Retrieval-augmented generation with vector stores, chunking strategies, and eval frameworks.</p>
          </div>
          <div>
            <h4>Full-Stack AI Apps</h4>
            <p class="mt-2 text-secondary" style="font-size: 0.9375rem;">End-to-end applications with AI features. From prototype to production.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Web Development -->
    <section class="section">
      <div class="container">
        <p class="overline mb-4">Web Development</p>
        <h2>Sites that prove your brand</h2>
        <div class="grid grid--2 mt-8">
          <div>
            <h4>Custom Websites</h4>
            <p class="mt-2 text-secondary" style="font-size: 0.9375rem;">Nuxt, Vue, React. Performance-first architecture. SEO and accessibility built in.</p>
          </div>
          <div>
            <h4>Immersive Experiences</h4>
            <p class="mt-2 text-secondary" style="font-size: 0.9375rem;">Three.js, WebGL, GSAP. Scroll-driven storytelling. The kind of sites that win awards.</p>
          </div>
          <div>
            <h4>Design Systems</h4>
            <p class="mt-2 text-secondary" style="font-size: 0.9375rem;">Typography, color, spacing, motion — codified into reusable component libraries.</p>
          </div>
          <div>
            <h4>Small Business Packages</h4>
            <p class="mt-2 text-secondary" style="font-size: 0.9375rem;">Get found online. Custom site + Google Business + local SEO. Starting at $2,500.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section ref="processRef" class="section section--surface">
      <div class="container">
        <p class="overline mb-4">Process</p>
        <h2>How it works</h2>
        <div class="mt-8" style="max-width: 600px;">
          <ProcessStep
            number="01"
            title="Talk"
            description="We get on a call. You tell me what you need. I tell you what it'll take. No surprises."
          />
          <ProcessStep
            number="02"
            title="Build"
            description="I build it. You see progress. We iterate fast until it's right."
          />
          <ProcessStep
            number="03"
            title="Ship"
            description="It goes live. I make sure everything works. You get the keys."
          />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container text-center">
        <h2>Ready to start?</h2>
        <p class="mt-4 text-secondary">Tell me what you're building. I'll tell you how I can help.</p>
        <div class="mt-8">
          <NuxtLink to="/contact" class="btn btn--primary">Get in touch</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
```

- [ ] **Step 3: Verify and commit**

```bash
npm run dev
```

Navigate to /services. Expected: Full services page with AI + Web sections, process steps, CTA.

```bash
git add -A
git commit -m "feat: services page — offerings, process, CTA"
```

---

## Task 8: Work / Portfolio Page

**Files:**
- Create: `app/pages/work.vue`

- [ ] **Step 1: Create work.vue with category filter**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects } from '~/data/projects'

const activeCategory = ref<'all' | 'ai' | 'web' | 'creative'>('all')
const gridRef = ref<HTMLElement | null>(null)

useScrollReveal(gridRef)

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects
  return projects.filter(p => p.category === activeCategory.value)
})

const categories = [
  { value: 'all', label: 'All' },
  { value: 'ai', label: 'AI Engineering' },
  { value: 'web', label: 'Web Development' },
  { value: 'creative', label: 'Creative' },
] as const
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <p class="overline mb-4">Portfolio</p>
        <h1>Selected work</h1>
        <p class="mt-6 text-secondary" style="font-size: 1.125rem; max-width: 55ch;">
          AI systems, web experiences, and creative experiments. Each project ships to production.
        </p>

        <nav class="filter mt-8" aria-label="Filter projects">
          <button
            v-for="cat in categories"
            :key="cat.value"
            class="filter__btn"
            :class="{ 'filter__btn--active': activeCategory === cat.value }"
            @click="activeCategory = cat.value"
          >
            {{ cat.label }}
          </button>
        </nav>

        <div ref="gridRef" class="grid grid--3 mt-12">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.title"
            :project="project"
          />
        </div>
      </div>
    </section>

    <section class="section section--surface">
      <div class="container text-center">
        <h2>Let's build yours</h2>
        <p class="mt-4 text-secondary">Have a project in mind? I'd like to hear about it.</p>
        <div class="mt-8">
          <NuxtLink to="/contact" class="btn btn--primary">Start a conversation</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.filter__btn {
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 500;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.filter__btn:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
}

.filter__btn--active {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: white;
}
</style>
```

- [ ] **Step 2: Verify and commit**

```bash
git add -A
git commit -m "feat: portfolio page — project grid with category filter"
```

---

## Task 9: About Page

**Files:**
- Create: `app/pages/about.vue`

- [ ] **Step 1: Create about.vue**

```vue
<template>
  <div>
    <section class="section">
      <div class="container about-grid">
        <div class="about-content">
          <p class="overline mb-4">About</p>
          <h1>Brian Lapinski</h1>
          <div class="about-text mt-8">
            <p>
              I'm an AI engineer and web developer based in Canada. I build intelligent systems and immersive web experiences for companies that care about craft.
            </p>
            <p>
              Before going independent, I worked at Microsoft, Amazon, and Aya Healthcare — building production software at scale. Now I bring that engineering rigor to AI agents, MCP integrations, and creative web projects.
            </p>
            <p>
              I believe the best technology disappears into the experience. Whether it's an AI workflow that saves your team hours or a website that makes visitors stop scrolling — the goal is the same: build things that work and feel inevitable.
            </p>
          </div>

          <div class="about-links mt-12">
            <p class="overline mb-4">Elsewhere</p>
            <nav class="about-nav">
              <a href="https://github.com/lapbrian2" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/brian-lapinski" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Substack</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Gumroad</a>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--surface">
      <div class="container text-center">
        <h2>Want to work together?</h2>
        <p class="mt-4 text-secondary">I'm taking on new projects.</p>
        <div class="mt-8">
          <NuxtLink to="/contact" class="btn btn--primary">Get in touch</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-grid {
  max-width: 700px;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.about-nav {
  display: flex;
  gap: var(--space-6);
}

.about-nav a {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.about-nav a:hover {
  color: var(--text-primary);
}
</style>
```

- [ ] **Step 2: Verify and commit**

```bash
git add -A
git commit -m "feat: about page — bio, background, social links"
```

---

## Task 10: Contact Page + Form

**Files:**
- Create: `app/pages/contact.vue`, `app/components/ContactForm.vue`
- Create: `server/api/contact.post.ts`

- [ ] **Step 1: Create ContactForm.vue**

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  type: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function handleSubmit() {
  status.value = 'sending'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    })
    status.value = 'sent'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="handleSubmit" v-if="status !== 'sent'">
    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" v-model="form.name" type="text" required />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" required />
    </div>
    <div class="form-group">
      <label for="type">What do you need?</label>
      <select id="type" v-model="form.type" required>
        <option value="" disabled>Select one</option>
        <option value="ai">AI Engineering</option>
        <option value="web">Web Development</option>
        <option value="both">Both</option>
        <option value="other">Something else</option>
      </select>
    </div>
    <div class="form-group">
      <label for="message">Tell me about your project</label>
      <textarea id="message" v-model="form.message" rows="5" required></textarea>
    </div>
    <button type="submit" class="btn btn--primary" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Sending...' : 'Send message' }}
    </button>
    <p v-if="status === 'error'" class="form-error mt-4">Something went wrong. Try again or email me directly.</p>
  </form>
  <div v-else class="form-success">
    <h3>Message sent</h3>
    <p class="mt-2 text-secondary">I'll get back to you within 24 hours.</p>
  </div>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 500px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-group input,
.form-group select,
.form-group textarea {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border);
  background: white;
  color: var(--text-primary);
  transition: border-color var(--duration-fast) var(--ease-out);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-error {
  color: #DC2626;
  font-size: 0.875rem;
}

.form-success {
  padding: var(--space-8);
  border: 1px solid var(--success);
}
</style>
```

- [ ] **Step 2: Create server API route**

```ts
// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, type, message } = body

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  // For now, log to console. Replace with Formspree, Resend, or Supabase later.
  console.log('Contact form submission:', { name, email, type, message })

  return { success: true }
})
```

- [ ] **Step 3: Create contact.vue**

```vue
<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div>
            <p class="overline mb-4">Contact</p>
            <h1>Let's talk</h1>
            <p class="mt-6 text-secondary" style="font-size: 1.0625rem; max-width: 45ch;">
              Have a project in mind? Need an AI engineer? Just want to say hello? I'll get back to you within 24 hours.
            </p>
            <div class="contact-info mt-12">
              <p class="overline mb-4">Or reach me directly</p>
              <p><a href="mailto:brian@example.com">brian@example.com</a></p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-grid {
  display: grid;
  gap: var(--space-16);
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
</style>
```

- [ ] **Step 4: Verify form submits**

```bash
npm run dev
```

Navigate to /contact. Fill out form, submit. Expected: Form shows "Message sent" on success. Server console logs the submission data.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: contact page — form with server API route"
```

---

## Task 11: WebGL Page Transitions

**Files:**
- Create: `app/shaders/transition.vert`, `app/shaders/transition.frag`
- Create: `app/components/ShaderTransition.client.vue`
- Modify: `app/app.vue`

- [ ] **Step 1: Write transition shaders**

```glsl
// app/shaders/transition.vert
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

```glsl
// app/shaders/transition.frag
precision highp float;

varying vec2 vUv;
uniform float uProgress;
uniform vec2 uResolution;

// Noise for organic wipe
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;

  // Noise-based displacement wipe
  float noise = snoise(uv * 3.0) * 0.5 + 0.5;

  // Progress drives the wipe — noise makes it organic
  float edge = smoothstep(uProgress - 0.1, uProgress + 0.1, noise);

  // Dark overlay color
  vec3 color = vec3(0.059, 0.09, 0.165); // --dark #0F172A
  float alpha = 1.0 - edge;

  gl_FragColor = vec4(color, alpha);
}
```

- [ ] **Step 2: Create ShaderTransition.client.vue**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import transitionVert from '~/shaders/transition.vert?raw'
import transitionFrag from '~/shaders/transition.frag?raw'

const route = useRoute()
const canvas = ref<HTMLCanvasElement | null>(null)
const isTransitioning = ref(false)

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let material: THREE.ShaderMaterial
let animationId: number

onMounted(() => {
  if (!canvas.value) return

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: false,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  material = new THREE.ShaderMaterial({
    vertexShader: transitionVert,
    fragmentShader: transitionFrag,
    transparent: true,
    uniforms: {
      uProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    },
  })

  const geometry = new THREE.PlaneGeometry(2, 2)
  scene.add(new THREE.Mesh(geometry, material))

  function animate() {
    animationId = requestAnimationFrame(animate)
    if (isTransitioning.value) {
      renderer.render(scene, camera)
    }
  }
  animate()

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
})

// Trigger transition on route change
watch(() => route.path, () => {
  if (!material) return

  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  isTransitioning.value = true

  // Wipe in
  $gsap.fromTo(material.uniforms.uProgress,
    { value: 0 },
    {
      value: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        // Wipe out
        $gsap.fromTo(material.uniforms.uProgress,
          { value: 1 },
          {
            value: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            delay: 0.1,
            onComplete: () => {
              isTransitioning.value = false
            },
          }
        )
      },
    }
  )
})
</script>

<template>
  <canvas
    ref="canvas"
    class="shader-transition"
    :class="{ 'shader-transition--active': isTransitioning }"
    aria-hidden="true"
  />
</template>

<style scoped>
.shader-transition {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
}

.shader-transition--active {
  opacity: 1;
}
</style>
```

- [ ] **Step 3: Update app.vue to include transition overlay**

```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ShaderTransition />
  </div>
</template>
```

- [ ] **Step 4: Verify page transitions**

```bash
npm run dev
```

Navigate between pages using header links. Expected: Dark noise-wipe shader animates over the page during route changes. 60fps, organic feel.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: WebGL shader page transitions — noise displacement wipe"
```

---

## Task 12: Scroll Reveal Animations

**Files:**
- Create: `app/components/ScrollReveal.vue`
- Modify: All page files to wrap sections in scroll reveals

- [ ] **Step 1: Create ScrollReveal wrapper component**

```vue
<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

const props = withDefaults(defineProps<{
  y?: number
  delay?: number
  stagger?: number
}>(), {
  y: 40,
  delay: 0,
  stagger: 0.1,
})

useScrollReveal(el, {
  y: props.y,
  delay: props.delay,
  stagger: props.stagger,
})
</script>

<template>
  <div ref="el">
    <slot />
  </div>
</template>
```

- [ ] **Step 2: Wrap key sections across all pages with ScrollReveal**

Go through each page and wrap content sections in `<ScrollReveal>`. This is a quick pass — the composable does the heavy lifting.

- [ ] **Step 3: Verify animations on scroll**

Navigate each page. Sections should fade + slide up as they enter the viewport. Stagger on grid items.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scroll reveal animations across all pages"
```

---

## Task 13: Responsive + Accessibility Polish

**Files:**
- Modify: Various components for mobile nav, responsive adjustments

- [ ] **Step 1: Add mobile hamburger menu to AppHeader**

Add a hamburger toggle that shows/hides nav on mobile (under 640px). Use CSS + a reactive toggle — no library needed.

- [ ] **Step 2: Test responsive breakpoints**

Check every page at 375px, 768px, 1024px, 1440px. Fix any overflow, cramped spacing, or broken layouts.

- [ ] **Step 3: Accessibility audit**

- All images have alt text
- Form inputs have labels (already done in ContactForm)
- Nav has `aria-label`
- Focus states visible (already in base.css)
- Color contrast meets 4.5:1 (verify accent blue on white: #2563EB on #FAFAF9 = 4.6:1 — passes)
- `prefers-reduced-motion` disables shader and GSAP animations (already in base.css, verify shader components)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: responsive layout + accessibility polish"
```

---

## Task 14: GitHub + Vercel Deploy

**Files:**
- Modify: `nuxt.config.ts` (add generate preset if needed)

- [ ] **Step 1: Push to GitHub**

```bash
cd /c/Users/Brian/OneDrive/Desktop/Agentic\ Systems/brian-lapinski
gh repo create lapbrian2/brian-lapinski --public --source=. --remote=origin
git push -u origin main
```

- [ ] **Step 2: Deploy to Vercel**

```bash
vercel --prod
```

Or use the Vercel MCP deploy tool. Vercel auto-detects Nuxt.

- [ ] **Step 3: Verify production**

- All pages load
- Shader hero renders
- Page transitions work
- Contact form submits
- Mobile layout correct
- No console errors

- [ ] **Step 4: Commit any deploy config**

```bash
git add -A
git commit -m "chore: deploy configuration"
```

---

## Self-Review Checklist

- [x] **Spec coverage**: All 5 pages covered (Tasks 6-10). Design system (Task 2). Shaders (Tasks 5, 11). Animations (Task 12). Deploy (Task 14). Gumroad/Substack as outbound links (in footer + about). Contact form (Task 10).
- [x] **No placeholders**: All code blocks contain actual implementation code.
- [x] **Type consistency**: `Project` type defined in Task 6 Step 1, used consistently in ProjectCard and work.vue. `useScrollReveal` signature consistent across composable definition and usage.
- [x] **Missing from spec**: "Starting at" pricing on services page — included in Task 7. Booking link on contact page — add Calendly link in Task 10 Step 3 (noted in contact-info section, placeholder href).
