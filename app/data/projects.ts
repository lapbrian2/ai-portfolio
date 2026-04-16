export interface Project {
  title: string
  headline: string
  deck: string
  body: string
  byline: string
  dateline: string
  category: 'art' | 'tech' | 'creative'
  url?: string
  image?: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: 'Lürzer\'s Archive',
    headline: 'Named to Lürzer\'s Archive 200 Best Digital Artists',
    deck: 'One of the most significant marks of recognition in commercial digital art.',
    body: 'Brian Lapinski has been selected for Lürzer\'s Archive 200 Best Digital Artists — a carefully curated survey of the most compelling digital imagery produced globally. The publication, trusted by creatives, commissioners, and art buyers as a benchmark for excellence, covers digital imagery in any form: illustration, compositing, 3D design, AI-assisted visuals, and mixed media. Being selected places Lapinski among the top working digital artists internationally.',
    byline: 'Staff Report',
    dateline: 'Drums, PA',
    category: 'art',
    image: '/images/hero-brain.png',
    tags: ['Digital Art', 'Recognition', 'Archive'],
  },
  {
    title: 'Choice Dao',
    headline: 'From Manufacturing Floors to Machine Learning Pipelines',
    deck: 'Fifteen years on production lines. Now building AI systems that run themselves.',
    body: 'Brian Lapinski spent fifteen years on manufacturing floors — supervising production lines, earning a Lean Six Sigma Black Belt from Villanova, building systems that turned chaos into process. The Choice Dao community recognized that trajectory this year, naming him a 2026 Mover and Shaker. His Style DNA methodology treats AI image generation as constraint satisfaction: isolating the variables that define a visual style, then systematically dialing them until the output matches the intent. It is the operations mindset applied to art.',
    byline: 'Staff Report',
    dateline: 'Drums, PA',
    category: 'art',
    image: '/images/factory-floor.png',
    tags: ['Community', 'Recognition', 'Style DNA'],
  },
  {
    title: 'creAtIva Vol. 7',
    headline: 'Four Galleries, Two Continents, One Year',
    deck: 'Four international exhibitions in a single year for the self-taught digital artist.',
    body: 'Selected for creAtIva Magazine Volume 7 — Beauty, Lapinski\'s work has been exhibited at Dream AI Gallery in New Jersey, Fundación Nestlé in Barcelona, FNAC in Asturias, and Art Innovation Gallery in New York. The exhibitions represent a widening international footprint for an artist whose practice began not in art school but on the operations floor at Amazon, where he managed programs and led teams as an Area Manager.',
    byline: 'Arts Desk',
    dateline: 'International',
    category: 'art',
    image: '/images/pulp-vintage.png',
    tags: ['Exhibition', 'Gallery', 'Publication'],
  },
  {
    title: 'The Dash',
    headline: 'One HTML File, 19 Repos, 1,138 Commits: Inside the Developer Command Center',
    deck: 'No framework. No build step. One cockpit to control an entire AI agent system.',
    body: 'The system runs from a single HTML file. The left panel shows only active projects — each with an OPEN button that drops into an embedded Claude terminal with context pre-loaded. The center renders a 3D terrain of commit activity built with Three.js: hours on one axis, days on the other, height mapped to density. The right panel displays 36 registered skills. Below, 10 structured workflow templates. When any repo receives a push, file watchers detect changes and regenerate the data. The whole thing auto-refreshes. Vanilla JS, Three.js, Express, WebSocket.',
    byline: 'Brian Lapinski',
    dateline: 'Drums, PA',
    category: 'tech',
    url: 'https://github.com/lapbrian2/the-dash',
    image: '/images/retro-sci-fi.png',
    tags: ['Three.js', 'Claude Code', 'Open Source'],
  },
  {
    title: 'Art Portfolio',
    headline: 'Portfolio Site Hides Konami Code Party Mode, UV Blacklight, and Sticker Slaps',
    deck: 'Over 3,700 lines in a single file. Every interaction is an Easter egg waiting to happen.',
    body: 'A graffiti-inspired portfolio built as a single index.html — no framework, no bundler, no build step. Three.js spray cans float in a 3D scene rendered with MeshToonMaterial and custom DataTexture gradient maps. Type BUFF to trigger wipe mode. Triple-click the footer for snitch mode. The UV blacklight toggle reveals hidden layers. Double-click anywhere to slap a sticker. GSAP ScrollTrigger drives all section animations. The site uses Web Audio API for ambient sound. It is a playground disguised as a portfolio.',
    byline: 'Brian Lapinski',
    dateline: 'Drums, PA',
    category: 'creative',
    url: 'https://brian-lapinski-portfolio.vercel.app/',
    image: '/images/pulp-sci-fi-2.png',
    tags: ['Three.js', 'GSAP', 'Web Audio', 'Easter Eggs'],
  },
  {
    title: 'ML Systems Universe',
    headline: 'Interactive 3D Map Charts Every Corner of the Machine Learning Landscape',
    deck: 'Scroll through the galaxy of neural architectures, training methods, and data pipelines.',
    body: 'A sprawling interactive visualization that maps the connections between machine learning systems — from neural architectures to training pipelines, from transformers to diffusion models. Built entirely in Three.js with data-driven node positioning, the project renders each system as a point in 3D space. Scroll-driven camera choreography guides the viewer through clusters of related technologies. The visualization is both a reference tool and an immersive experience.',
    byline: 'Brian Lapinski',
    dateline: 'Drums, PA',
    category: 'creative',
    url: 'https://ml-systems-universe.vercel.app/',
    image: '/images/helix.png',
    tags: ['Three.js', 'GSAP', 'Data Visualization'],
  },
]
