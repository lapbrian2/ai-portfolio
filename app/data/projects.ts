export interface Project {
  title: string
  headline: string
  deck: string
  body: string
  pullQuote?: string
  byline: string
  dateline: string
  category: 'art' | 'tech' | 'creative'
  image?: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: 'Lürzer\'s Archive',
    headline: 'LOCAL MAN NABS SPOT AMONG WORLD\'S 200 BEST DIGITAL ARTISTS',
    deck: 'Drums, Pa. resident selected for Lürzer\'s Archive — the publication trusted by art directors from Madison Avenue to Milan.',
    body: 'DRUMS, Pa., April 14 — It can now be revealed that Mr. Brian Lapinski, a resident of this borough and heretofore known principally for his work in manufacturing operations, has been selected for inclusion in Lürzer\'s Archive 200 Best Digital Artists — a distinction which places the self-taught image-maker among the most compelling digital artists working anywhere in the world today. The selection, announced by the Vienna-based publication, represents one of the most significant marks of recognition in commercial digital art. Art buyers, creative directors, and commissioners from New York to Tokyo rely upon the Archive as a benchmark for excellence. Mr. Lapinski\'s work, which he describes as an exploration of what it means to be human, was submitted alongside entries from established studios and agency professionals. That a Lean Six Sigma Black Belt from Villanova should find himself in such company surprised no one more than the artist himself.',
    pullQuote: 'I use images as a way to explore what it means to be human.',
    byline: 'By Our Special Correspondent',
    dateline: 'DRUMS, PA.',
    category: 'art',
    image: '/images/hero-brain.png',
    tags: ['Digital Art', 'Recognition'],
  },
  {
    title: 'Choice Dao',
    headline: 'FACTORY FLOOR VETERAN EYES NEW FRONTIER; NAMED MOVER AND SHAKER',
    deck: 'Choice Dao community recognizes Lapinski for bridging operations discipline with digital artistry.',
    body: 'DRUMS, Pa., April 14 — In a development which surprised observers in both the manufacturing and creative technology sectors, Mr. Brian Lapinski has been named a 2026 Mover and Shaker by the Choice Dao community. Your correspondent has learned from reliable quarters that the distinction recognizes Mr. Lapinski\'s unusual trajectory — from Amazon operations to AI architecture, with a Villanova Black Belt and two entrepreneurial ventures along the way. It is this same operational discipline that Mr. Lapinski now applies to what he calls his Style DNA methodology — a systematic approach to artificial intelligence image generation that treats the craft not as random experimentation but as reproducible constraint satisfaction. Sources close to the artist indicate that each variable defining a visual style is isolated and systematically adjusted until the output matches the intent. It is, in essence, the factory floor applied to the canvas.',
    pullQuote: 'It is the factory floor applied to the canvas.',
    byline: 'By a Staff Reporter',
    dateline: 'DRUMS, PA.',
    category: 'art',
    image: '/images/factory-floor.png',
    tags: ['Community', 'Style DNA'],
  },
  {
    title: 'creAtIva Vol. 7',
    headline: 'FOUR GALLERIES, TWO CONTINENTS, ONE YEAR: AREA ARTIST GOES INTERNATIONAL',
    deck: 'Exhibitions from New Jersey to Barcelona mark a widening footprint for the Pocono region\'s most prolific digital image-maker.',
    body: 'INTERNATIONAL — This paper has learned exclusively that Mr. Brian Lapinski, the Drums-based digital artist whose work has previously appeared in these pages, has been selected for creAtIva Magazine Volume 7 — Beauty, with international exhibitions now confirmed at no fewer than four galleries across two continents. The venues, it can now be reported, include the Dream AI Gallery in New Jersey, the Fundación Nestlé in Barcelona, FNAC in Asturias, and the Art Innovation Gallery in New York City. In an exclusive interview with this newspaper, associates of Mr. Lapinski noted that his practice began not in any art school but on the operations floor at Amazon, where he managed programs and led teams as an Area Manager. That a man of such practical background should find his images hanging in Barcelona is, observers here believe, rather the point.',
    byline: '(Special to The Lapinski Record)',
    dateline: 'INTERNATIONAL',
    category: 'art',
    image: '/images/pulp-vintage.png',
    tags: ['Exhibition', 'Gallery'],
  },
  {
    title: 'The Dash',
    headline: 'ONE FILE, 19 REPOS, 1,138 COMMITS: INSIDE THE COCKPIT',
    deck: 'No framework. No build step. Vanilla JavaScript, Three.js, and an Express server. Your correspondent reports from the command center.',
    body: 'DRUMS, Pa., April 14 — As this paper goes to press, your correspondent can confirm the existence of a most remarkable contraption. Mr. Brian Lapinski has constructed what he terms a "command center" — a developer cockpit built from a single HTML file that controls an entire system of nineteen software repositories, thirty-six autonomous skills, and over one thousand one hundred and thirty-eight recorded commits. The left panel, it was observed, displays only active projects — each fitted with a button that opens an embedded terminal with context pre-loaded. The center of the apparatus renders a three-dimensional terrain of commit activity built with the Three.js library: hours upon one axis, days upon the other, height mapped to density. Below this topographical display, a bar chart tracks daily commits across all repositories. The right panel lists registered skills, sorted by recency. When any repository receives new code, file watchers detect the change and regenerate the data automatically. The whole thing refreshes itself. There is no React. There is no build step. There is only the machine and the man who built it.',
    pullQuote: 'There is no React. There is no build step. There is only the machine and the man who built it.',
    byline: 'By Our Technical Correspondent',
    dateline: 'DRUMS, PA.',
    category: 'tech',
    image: '/images/retro-sci-fi.png',
    tags: ['Three.js', 'Claude Code'],
  },
  {
    title: 'Art Portfolio',
    headline: 'PORTFOLIO BARES HIDDEN MODES; EASTER EGGS DISCOVERED BY SHARP-EYED VISITORS',
    deck: 'Konami code triggers party mode. UV blacklight reveals hidden layers. Over 3,700 lines of code in a single file. This reporter investigates.',
    body: 'DRUMS, Pa., April 14 — In a surprise development, it has come to the attention of this newspaper that the portfolio website maintained by Mr. Brian Lapinski conceals a number of what the younger generation refers to as "Easter eggs" — hidden features accessible only to those who know where to look. Your correspondent, upon investigation, can confirm the following: entering the Konami code activates a "party mode" of considerable visual intensity. Typing the word BUFF triggers what is described as a "wipe mode." Triple-clicking the footer produces something called "snitch mode," the purpose of which remains unclear. A UV blacklight toggle reveals hidden layers beneath the visible surface. Double-clicking anywhere on the page causes a sticker to appear. The entire apparatus — Three.js spray cans, Web Audio ambient sound, GSAP scroll animations — is contained within a single index.html file of over three thousand seven hundred lines. No framework was employed in its construction. No bundler. No build step. It is, in the estimation of this reporter, a playground disguised as a portfolio.',
    pullQuote: 'It is a playground disguised as a portfolio.',
    byline: 'By a Staff Reporter',
    dateline: 'DRUMS, PA.',
    category: 'creative',
    image: '/images/pulp-sci-fi-2.png',
    tags: ['Three.js', 'Easter Eggs'],
  },
  {
    title: 'ML Systems Universe',
    headline: 'VAST 3-D MAP CHARTS MACHINE LEARNING LANDSCAPE; VISITORS LEFT AGOG',
    deck: 'Scroll-driven camera choreography guides the viewer through a galaxy of neural architectures. Three.js renders each system as a point in space.',
    body: 'DRUMS, Pa., April 14 — Your correspondent reports today on a most ambitious undertaking. Mr. Brian Lapinski has constructed an interactive three-dimensional visualization that maps the connections between machine learning systems — from neural architectures to training pipelines, from the transformer to the diffusion model. Built entirely in the Three.js library with data-driven node positioning, the project renders each system as a luminous point in three-dimensional space. Scroll-driven camera choreography, powered by the GSAP animation library, guides the viewer through clusters of related technologies. The effect, visitors report, is not unlike flying through a constellation of ideas — each point connected to its neighbors by invisible threads of mathematical kinship. It is both a reference tool and an immersive experience, and it is, in the considered opinion of this newspaper, rather good.',
    pullQuote: 'Not unlike flying through a constellation of ideas.',
    byline: 'By Our Science Correspondent',
    dateline: 'DRUMS, PA.',
    category: 'creative',
    image: '/images/ml-brain.png',
    tags: ['Three.js', 'Data Viz'],
  },
]
