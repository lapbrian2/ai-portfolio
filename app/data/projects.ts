export interface Project {
  title: string
  headline: string
  description: string
  byline: string
  dateline: string
  category: 'art' | 'tech' | 'creative'
  url?: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: 'Lürzer\'s Archive',
    headline: 'Local Artist Named to Lürzer\'s Archive 200 Best Digital Artists Worldwide',
    description: 'Brian Lapinski was selected for Lürzer\'s Archive 200 Best Digital Artists — one of the most prestigious recognitions in the global creative industry, placing his work alongside top image-makers from around the world.',
    byline: 'Brian Lapinski',
    dateline: 'Drums, PA',
    category: 'art',
    tags: ['Digital Art', 'Recognition', 'Archive'],
  },
  {
    title: 'creAtIva Vol. 7',
    headline: 'Work Selected for creAtIva Magazine Vol. 7 With International Gallery Exhibitions',
    description: 'Selected for creAtIva Magazine Volume 7 — Beauty. International exhibitions including Dream AI Gallery (NJ), Fundación Nestlé Barcelona, FNAC Asturias, and Art Innovation Gallery New York.',
    byline: 'Brian Lapinski',
    dateline: 'International',
    category: 'art',
    tags: ['Exhibition', 'Gallery', 'Publication'],
  },
  {
    title: 'The Dash',
    headline: 'Developer Builds Command Center for AI Agent System in a Single HTML File',
    description: 'A developer command center with 3D commit terrain, embedded Claude Code terminal, activity charts, and action tiles. 19 projects, 36 skills, 1,138 commits, one cockpit. No React, no build step — vanilla JS, Three.js, Express, WebSocket.',
    byline: 'Brian Lapinski',
    dateline: 'Drums, PA',
    category: 'tech',
    url: 'https://github.com/lapbrian2/the-dash',
    tags: ['Three.js', 'Claude Code', 'Automation'],
  },
  {
    title: 'Art Portfolio',
    headline: 'Graffiti-Inspired Portfolio Features Hidden Easter Eggs and Scroll-Driven 3D',
    description: 'A single-file creative portfolio with Three.js spray cans, Web Audio API, Konami code party mode, UV blacklight toggle, and sticker-slap interactions. Over 3,700 lines of inline HTML, CSS, and JavaScript.',
    byline: 'Brian Lapinski',
    dateline: 'Drums, PA',
    category: 'creative',
    url: 'https://brian-lapinski-portfolio.vercel.app/',
    tags: ['Three.js', 'GSAP', 'Web Audio'],
  },
  {
    title: 'ML Systems Universe',
    headline: 'Interactive 3D Map Charts the Entire Machine Learning Landscape',
    description: 'A sprawling interactive visualization that lets users explore how machine learning systems connect, from neural architectures to training pipelines. Built entirely in Three.js with data-driven node positioning and scroll-driven camera choreography.',
    byline: 'Brian Lapinski',
    dateline: 'Drums, PA',
    category: 'creative',
    url: 'https://ml-systems-universe.vercel.app/',
    tags: ['Three.js', 'GSAP', 'Data Visualization'],
  },
  {
    title: 'Choice Dao',
    headline: 'Named 2026 Mover and Shaker by Choice Dao Community',
    description: 'Recognized by the Choice Dao community as a 2026 Mover and Shaker for contributions to digital art and creative technology.',
    byline: 'Brian Lapinski',
    dateline: 'Drums, PA',
    category: 'art',
    tags: ['Community', 'Recognition', 'Web3'],
  },
]
