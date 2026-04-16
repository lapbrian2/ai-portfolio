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
    title: 'Skills Orchestrator',
    description: 'Multi-agent skill system with 46 skills, memory, and dynamic routing.',
    category: 'ai',
    tags: ['Python', 'MCP', 'Agent Architecture'],
  },
  {
    title: 'Art Portfolio',
    description: 'Graffiti-inspired portfolio with Three.js, Easter eggs, and scroll-driven animations.',
    category: 'creative',
    url: 'https://brian-lapinski-portfolio.vercel.app/',
    tags: ['Three.js', 'GSAP', 'Web Audio'],
  },
  {
    title: 'Research Radar',
    description: 'Autonomous sweep agent that discovers frontier AI practices and routes findings to structured storage.',
    category: 'ai',
    tags: ['Node.js', 'Automation', 'Research'],
  },
  {
    title: 'Infra Insight View',
    description: 'Infrastructure monitoring dashboard with real-time metrics and alert management.',
    category: 'web',
    tags: ['Vue', 'Dashboard', 'Data Viz'],
  },
]
