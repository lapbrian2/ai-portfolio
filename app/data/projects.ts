export interface Project {
  title: string
  headline: string
  description: string
  byline: string
  dateline: string
  category: 'ai' | 'web' | 'creative'
  url?: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: 'ML Systems Universe',
    headline: 'Developer Maps Entire Machine Learning Landscape in Interactive 3D',
    description: 'A sprawling interactive visualization lets users explore how machine learning systems connect, from neural architectures to training pipelines. Built entirely in Three.js with data-driven node positioning and scroll-driven camera choreography.',
    byline: 'Brian Lapinski',
    dateline: 'Toronto',
    category: 'creative',
    url: 'https://ml-systems-universe.vercel.app/',
    tags: ['Three.js', 'GSAP', 'Data Visualization'],
  },
  {
    title: 'CLI-Anything',
    headline: 'Revolutionary Tool Turns Desktop Software Into AI-Controllable Agents',
    description: 'A harness system that wraps GUI applications — GIMP, Blender, Inkscape, Draw.io — in Python APIs, exposing 22 MCP tools for agent orchestration. Desktop software becomes programmable without modification.',
    byline: 'Brian Lapinski',
    dateline: 'Toronto',
    category: 'ai',
    tags: ['Python', 'MCP', 'Automation'],
  },
  {
    title: 'Skills Orchestrator',
    headline: 'Multi-Agent System Manages 46 Skills With Dynamic Routing and Memory',
    description: 'A skill registry, memory system, and routing engine that matches incoming tasks to the right skill, loads instructions on demand, and logs execution history for continuous improvement. The backbone of an AI engineering workflow.',
    byline: 'Brian Lapinski',
    dateline: 'Toronto',
    category: 'ai',
    tags: ['Python', 'MCP', 'Agent Architecture'],
  },
  {
    title: 'Art Portfolio',
    headline: 'Graffiti-Inspired Portfolio Features Hidden Easter Eggs and Scroll-Driven 3D',
    description: 'A single-file creative portfolio with Three.js spray cans, Web Audio API, Konami code party mode, UV blacklight toggle, and sticker-slap interactions. Over 3,700 lines of inline HTML, CSS, and JavaScript.',
    byline: 'Brian Lapinski',
    dateline: 'Toronto',
    category: 'creative',
    url: 'https://brian-lapinski-portfolio.vercel.app/',
    tags: ['Three.js', 'GSAP', 'Web Audio'],
  },
  {
    title: 'Research Radar',
    headline: 'Autonomous Sweep Agent Discovers Frontier AI Practices on 24-Hour Cycles',
    description: 'A Node.js automation that searches GitHub, Hugging Face, ArXiv, and dev blogs for emerging agentic architectures and MCP patterns, scoring each finding against a build-or-skip gate and routing results to structured storage.',
    byline: 'Brian Lapinski',
    dateline: 'Toronto',
    category: 'ai',
    tags: ['Node.js', 'Automation', 'Research'],
  },
  {
    title: 'Infra Insight View',
    headline: 'Infrastructure Dashboard Surfaces Critical Alerts With Real-Time Metrics',
    description: 'A monitoring dashboard built with Vue that displays infrastructure health, performance trends, and alert management in a dense, data-rich interface designed for at-a-glance comprehension.',
    byline: 'Brian Lapinski',
    dateline: 'Toronto',
    category: 'web',
    tags: ['Vue', 'Dashboard', 'Data Viz'],
  },
]
