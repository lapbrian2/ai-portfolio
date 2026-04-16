# Brian Lapinski — Personal Brand Site

## What This Is
Personal brand hub for Brian Lapinski — AI Engineer & Web Developer.
Multi-page Nuxt site with shader-based transitions, custom WebGL effects, and editorial design quality. The site IS the portfolio — it proves Brian's skills by existing.

## Who It's For
- Potential clients (AI engineering contracts, web development projects)
- Network contacts evaluating Brian's capabilities
- People who land here from LinkedIn, Gumroad, or Substack links

## Pages

### 1. Home
- Hero with shader background (subtle, not overwhelming — grain, noise, or generative)
- One-liner: what Brian does, who he helps
- Brief services overview (AI Engineering + Web Development)
- Featured work (2-3 projects)
- CTA: "Let's work together" or "Check my availability"

### 2. Services
- AI Engineering: agents, MCP integrations, RAG pipelines, full-stack AI apps
- Web Development: custom sites, immersive experiences, creative web
- Pricing approach: "Starting at" ranges, not fixed tiers (keeps flexibility)
- Process section: 3 steps (Talk → Build → Ship)
- CTA to contact

### 3. Work / Portfolio
- Project cards with thumbnails
- Click through to case study or external link
- Categories: AI Engineering | Web Development | Creative
- Before/after or metrics where available

### 4. About
- Background: Microsoft, Amazon, Aya Healthcare
- What Brian does now and why
- Photo (optional)
- Links to Substack, Gumroad, GitHub, LinkedIn

### 5. Contact
- Contact form (Supabase or Formspree)
- Booking link (Calendly or Cal.com)
- Email address

## Design System

### Aesthetic
Warm professional with editorial taste. Clean but not sterile. The site should feel designed by a human with opinions — not generated from a template.

### Typography
- **Display**: Instrument Serif (400, 500) — warm, characterful headlines
- **Body**: DM Sans (400, 500, 600) — geometric, clean, modern
- **Mono**: Geist Mono (400) — code snippets, technical details

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#FAFAF9` | Page background (Gallery White) |
| `--surface` | `#F5F5F0` | Section differentiation (Linen) |
| `--text-primary` | `#1A1A2E` | Headlines, primary text |
| `--text-secondary` | `#6B7280` | Descriptions, captions |
| `--accent` | `#2563EB` | CTAs, links, interactive elements |
| `--accent-hover` | `#1D4ED8` | Hover state for accent |
| `--success` | `#059669` | Results, metrics, positive indicators |
| `--border` | `#E5E7EB` | Subtle structure |
| `--dark` | `#0F172A` | Dark sections (footer, contrast areas) |
| `--on-dark` | `#F1F5F9` | Text on dark backgrounds |

### Spacing
- Base unit: 8px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- Density: comfortable (not cramped, not spacious)

### Layout
- Max content width: 1200px
- Grid: 12-column on desktop, responsive breakpoints at 640/768/1024/1280
- Full-bleed sections for visual impact, content respects the grid

### Motion & Shaders
- **Page transitions**: Custom WebGL shader transitions (displacement, noise wipe, or dissolve)
- **Scroll animations**: GSAP ScrollTrigger for section reveals — subtle, not flashy
- **Smooth scroll**: Lenis
- **Hero shader**: Generative background (noise field, subtle movement, responds to mouse)
- **Hover effects**: Subtle transforms, color transitions (150-300ms)
- **`prefers-reduced-motion`**: Respected — fallback to CSS fade transitions

### Border Radius
- None or minimal (2-4px). No rounded corners on cards. Straight edges = authority.

## Tech Stack
- **Framework**: Nuxt 4 + Vue 3 (Composition API, `<script setup>`)
- **Styling**: Custom CSS (not Tailwind — editorial sites need custom control)
- **3D/Shaders**: Three.js + custom GLSL
- **Animation**: GSAP 3.14 + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Fonts**: Google Fonts (Instrument Serif, DM Sans) + self-hosted Geist Mono
- **Forms**: Supabase or Formspree (decide during build)
- **Hosting**: Vercel
- **Repo**: GitHub (lapbrian2)

## What's NOT in V1
- Blog (Substack handles this — link out)
- E-commerce (Gumroad handles this — link out)
- CMS (content is static for now, add later if needed)
- Dark mode (one theme, done well)
- Auth / login

## Revenue Streams (linked, not hosted)
- **Gumroad**: Templates, tools, starter kits → linked from portfolio/products section
- **Substack**: Writing, newsletter → linked from about/footer
- **Contracting**: Contact form → leads to calls

## Success Criteria
- Loads in under 2 seconds
- Shader transitions run at 60fps
- Scores 90+ on Lighthouse (performance, accessibility, SEO)
- A visitor knows what Brian does within 5 seconds of landing
- The site itself demonstrates the quality of Brian's work
