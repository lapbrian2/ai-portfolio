<script setup lang="ts">
import { projects } from '~/data/projects'

const featuredProjects = projects.slice(0, 4)
const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

const heroRef = ref<HTMLElement | null>(null)
const storiesRef = ref<HTMLElement | null>(null)
const storyImageRef = ref<HTMLElement | null>(null)

// Scroll velocity skew on headlines
useScrollVelocity('h1, h2, h3, .story__headline')

// Subtle page tilt on mouse — like holding a newspaper
usePageTilt()

// Hover reveal on stories section
useHoverReveal(storiesRef, storyImageRef)

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp() as any
  if (!$gsap) return

  // Hero headline entrance
  if (heroRef.value) {
    $gsap.from(heroRef.value, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: 'expo.out',
    })
  }

  // Parallax on hero image — moves slower than headline
  const heroImg = document.querySelector('.banner__image')
  if (heroImg) {
    $gsap.to(heroImg, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.banner',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  // Stories slide in from alternating sides
  const stories = document.querySelectorAll('.stories-grid .story')
  stories.forEach((story, i) => {
    $gsap.from(story, {
      x: i % 2 === 0 ? -40 : 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: story,
        start: 'top 85%',
        once: true,
      },
    })
  })

  // Pull quotes scale up on scroll
  document.querySelectorAll('.pull-quote').forEach((pq) => {
    $gsap.from(pq, {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: pq,
        start: 'top 80%',
        once: true,
      },
    })
  })
})
</script>

<template>
  <div>
    <!-- Banner headline -->
    <section class="banner">
      <div class="container">
        <div class="banner__edition entrance entrance--1">
          <span class="dateline">Vol. 1 &mdash; No. 1</span>
          <span class="dateline">{{ today }}</span>
          <span class="dateline">Final Edition</span>
        </div>

        <div class="banner__layout">
          <div class="banner__content">
            <p class="kicker mb-4 entrance entrance--2">Exclusive Report</p>
            <h1 ref="heroRef" class="ink-bleed entrance--hero">
              The Artist Who Builds
            </h1>
            <div class="banner__deck mt-8 entrance entrance--4">
              <p class="deck">
                Exploring what it means to be human through images and code.
                Lürzer's Archive 200 Best. creAtIva Vol. 7. Choice Dao 2026 Mover and Shaker.
                The story of a builder who sees no line between art and engineering.
              </p>
            </div>
            <div class="banner__meta mt-4 entrance entrance--5">
              <span class="dateline">By Brian Lapinski &mdash; Drums, Pennsylvania</span>
            </div>
          </div>
          <figure class="banner__image entrance--image">
            <img
              src="/images/hero-brain.png"
              alt="Pulp sci-fi illustration of a mechanical brain"
              class="img-hover"
              loading="eager"
            />
            <figcaption class="banner__caption">
              Illustration: The AI Engineer's Mind — a study in biological and mechanical intelligence.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule scroll-rule" /></div>

    <!-- Section Jump — table of contents -->
    <section style="padding: var(--space-4) 0;">
      <div class="container">
        <SectionJump :sections="[
          { label: 'The Profile', id: 'profile' },
          { label: 'Featured Stories', id: 'stories' },
          { label: 'The Practice', id: 'practice' },
        ]" />
      </div>
    </section>

    <!-- Lede + sidebar -->
    <section id="profile" class="section scroll-exit">
      <div class="container">
        <ArticleMeta
          byline="Our Special Correspondent"
          dateline="Drums, Pennsylvania"
          read-time="4"
          section="Profile"
        />
        <div class="grid grid--sidebar">
          <div>
            <ScrollRevealText
              class="lede"
              text="Brian Lapinski uses images as a way to explore what it means to be human. His work is rooted in personal exploration, emotion, and connection — not trends or technique for its own sake. He is interested in images that speak without words and create a quiet connection between people."
            />

            <PullQuote
              quote="I use images as a way to explore what it means to be human."
              attribution="Brian Lapinski, in conversation"
            />

            <ScrollRevealText
              class="body-col"
              text="Named to Lürzer's Archive 200 Best Digital Artists — one of the most prestigious recognitions in commercial digital art — Lapinski's images have shown at Dream AI Gallery in New Jersey, Fundación Nestlé in Barcelona, FNAC in Asturias, and Art Innovation Gallery in New York. He was selected for creAtIva Magazine Volume 7 and recognized as a 2026 Mover and Shaker by the Choice Dao community."
            />

            <EditorNote
              type="dispatch"
              text="Mr. Lapinski spent fifteen years on manufacturing floors before turning to art and technology. He earned a Lean Six Sigma Black Belt from Villanova University and managed programs at Amazon as an Area Manager. He founded Quick Dry Floor Care, a residential carpet cleaning operation, and now serves as Supervisor at US Hydrations."
            />

            <ScrollRevealText
              class="body-col"
              text="But it is the work after hours that defines the man. Lapinski builds AI agent systems, Three.js immersive web experiences, and tools that bridge the gap between art and engineering. His Style DNA methodology treats AI image generation as reproducible craft — isolating the variables that define a visual style, then systematically adjusting them until the output matches the intent. It is the operations mindset applied to art."
            />

            <LateBreaking
              text="As of press time, Lapinski has logged 1,138 commits across 19 repositories, registered 46 autonomous skills, and built a command center that controls his entire operation from a single HTML file."
            />

            <p class="continued mt-4 scroll-fade">
              <em>Continued on Page 3</em> &mdash;
              <NuxtLink to="/about" class="link-arrow" data-cursor>Read full profile</NuxtLink>
            </p>
          </div>
          <aside class="sidebar scroll-reveal-slow">
            <h4 class="section-head">At a Glance</h4>
            <dl class="sidebar__facts mt-4">
              <div class="sidebar__fact">
                <dt>Recognition</dt>
                <dd>Lürzer's Archive 200 Best</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Publications</dt>
                <dd>creAtIva Vol. 7, Choice Dao</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Certifications</dt>
                <dd>Lean Six Sigma Black Belt (Villanova)</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Roles</dt>
                <dd>ImagineArt Ambassador, Caimera Partner</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Day Job</dt>
                <dd>Supervisor, US Hydrations</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Location</dt>
                <dd>Drums, Pennsylvania</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>

    <OrnamentalRule />

    <!-- Featured stories -->
    <section id="stories" class="section">
      <div class="container">
        <h4 class="section-head scroll-reveal-left">Featured Stories</h4>

        <EditorNote
          type="note"
          text="The following dispatches have been compiled from press releases, exhibition catalogues, repository commit logs, and interviews conducted by our special correspondents. The editors vouch for their accuracy."
        />

        <div ref="storiesRef" class="stories mt-8">
          <!-- Lead story — larger, with image -->
          <article class="story story--lead scroll-reveal" v-if="featuredProjects[0]">
            <component
              :is="featuredProjects[0].url ? 'a' : 'div'"
              :href="featuredProjects[0].url"
              :target="featuredProjects[0].url ? '_blank' : undefined"
              class="story__lead-inner"
              data-cursor
              data-cursor-text="Read"
            >
              <div class="story__lead-text">
                <span class="kicker">{{ featuredProjects[0].category === 'art' ? 'Art' : featuredProjects[0].category === 'tech' ? 'Technology' : 'Creative' }}</span>
                <h3 class="story__headline ink-bleed mt-2">{{ featuredProjects[0].headline }}</h3>
                <p class="story__deck mt-2">{{ featuredProjects[0].deck }}</p>
                <p class="story__body mt-4">{{ featuredProjects[0].body }}</p>
                <p v-if="featuredProjects[0].pullQuote" class="story__pull-quote mt-4">
                  &ldquo;{{ featuredProjects[0].pullQuote }}&rdquo;
                </p>
                <div class="story__foot mt-4">
                  <span class="dateline">{{ featuredProjects[0].dateline }} &mdash; {{ featuredProjects[0].byline }}</span>
                </div>
              </div>
              <figure v-if="featuredProjects[0].image" class="story__lead-img">
                <img :src="featuredProjects[0].image" :alt="featuredProjects[0].title" class="img-hover" loading="lazy" />
              </figure>
            </component>
            <hr class="rule rule--thick" />
          </article>

          <!-- Remaining stories — compact list -->
          <div class="stories-grid scroll-stagger">
            <article
              v-for="project in featuredProjects.slice(1)"
              :key="project.title"
              class="story"
            >
              <component
                :is="project.url ? 'a' : 'div'"
                :href="project.url"
                :target="project.url ? '_blank' : undefined"
                class="story__inner"
                data-cursor
                data-cursor-text="Read"
              >
                <figure v-if="project.image" class="story__thumb">
                  <img :src="project.image" :alt="project.title" class="img-hover" loading="lazy" />
                </figure>
                <div>
                  <span class="kicker">{{ project.category === 'art' ? 'Art' : project.category === 'tech' ? 'Technology' : 'Creative' }}</span>
                  <h3 class="story__headline mt-1">{{ project.headline }}</h3>
                  <p class="story__deck mt-1">{{ project.deck }}</p>
                  <div class="story__foot mt-3">
                    <span class="dateline">{{ project.dateline }} — {{ project.byline }}</span>
                  </div>
                </div>
              </component>
              <hr class="rule" />
            </article>
          </div>
        </div>

        <div class="mt-8 text-center scroll-reveal">
          <NuxtLink to="/work" class="btn" data-cursor>All Stories &rarr;</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Vintage inline ad -->
    <section style="padding: var(--space-6) 0;">
      <div class="container">
        <figure class="inline-ad scroll-scale">
          <img src="/images/pulp-new.png" alt="Vintage advertisement illustration" class="img-hover" loading="lazy" />
          <figcaption class="inline-ad__caption">
            <span class="dateline">Advertisement</span> &mdash; Have you seen these innovations? The future is now!
          </figcaption>
        </figure>
      </div>
    </section>

    <PullQuote
      quote="Every system ships. Every process is measurable. Every build has a purpose."
      attribution="Brian Lapinski, on his approach to work"
    />

    <OrnamentalRule />

    <!-- What I Do — not selling, just explaining -->
    <section id="practice" class="section scroll-exit">
      <div class="container">
        <h4 class="section-head scroll-reveal-left">The Practice</h4>
        <div class="grid grid--2 mt-8">
          <div class="scroll-reveal">
            <h3 class="ink-bleed parallax-text">Art & Images</h3>
            <ScrollRevealText
              class="body-col mt-4"
              text="Digital art rooted in personal exploration. Midjourney, ImagineArt, and custom workflows through a systematic Style DNA methodology — treating image generation as reproducible craft rather than random experimentation. Through creating and teaching, he sees image-making as a form of self-discovery and shared understanding."
            />
          </div>
          <div class="col-ruled scroll-reveal-slow">
            <h3 class="ink-bleed parallax-text">Code & Systems</h3>
            <ScrollRevealText
              class="body-col mt-4"
              text="Multi-agent AI orchestration, MCP server integrations, RAG pipelines, and immersive Three.js web experiences. Custom GLSL shaders, GSAP scroll-driven animations, and design systems built with Nuxt and Vue. Every project ships to production. The Lean Six Sigma discipline carries through — eliminate waste, measure everything, iterate until it works."
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Banner */
.banner {
  padding: var(--space-8) 0 var(--space-12);
}

.banner__edition {
  display: flex;
  justify-content: space-between;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--rule-light);
  margin-bottom: var(--space-8);
}

/* Banner layout — headline + image side by side */
.banner__layout {
  display: grid;
  gap: var(--space-8);
  align-items: start;
}

@media (min-width: 768px) {
  .banner__layout {
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-12);
  }
}

@media (min-width: 1024px) {
  .banner__layout {
    grid-template-columns: 1fr 1fr;
  }
}

.banner__content {
  max-width: 900px;
  overflow: visible;
}

.banner__content h1 {
  padding-bottom: 0.15em;
  overflow: visible;
}

.banner__image {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--rule-light);
}

.banner__image img {
  width: 100%;
  display: block;
}

/* Halftone newspaper print effect on images */
.halftone-img {
  filter: grayscale(80%) contrast(1.15) brightness(1.05) sepia(25%);
  transition: filter var(--duration-slow) var(--ease-out);
}

.banner__image:hover .halftone-img {
  filter: grayscale(30%) contrast(1.1) brightness(1.0) sepia(15%);
}

.banner__caption {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  color: var(--ink-faded);
  padding: var(--space-2) var(--space-3);
  border-top: 1px solid var(--rule-light);
  font-style: italic;
}

.banner__deck {
  max-width: 650px;
}

/* Vintage inline ad */
.inline-ad {
  margin: 0 auto;
  max-width: 400px;
  text-align: center;
}

.inline-ad img {
  width: 100%;
  display: block;
  border: 2px solid var(--ink);
}

.inline-ad__caption {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--ink-faded);
  padding: var(--space-2) 0;
  font-style: italic;
  text-align: center;
}

.deck {
  font-size: 1.0625rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--ink-light);
  max-width: 60ch;
}

.banner__meta {
  padding-top: var(--space-3);
  border-top: 1px solid var(--rule-light);
}

/* Ink bleed */
.ink-bleed {
  text-shadow:
    0.4px 0.2px 0 rgba(26, 23, 20, 0.07),
    -0.3px 0.1px 0 rgba(26, 23, 20, 0.05),
    0.1px 0.4px 0 rgba(26, 23, 20, 0.04),
    -0.2px -0.1px 0 rgba(26, 23, 20, 0.03);
}

.body-col {
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--ink-light);
}

.lede {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--ink);
}

.continued {
  font-size: 0.8125rem;
  color: var(--ink-faded);
}

.continued em { font-family: var(--font-display); }

/* Sidebar */
.sidebar { padding-top: var(--space-2); }

.sidebar__facts {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.sidebar__fact dt {
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-ghost);
}

.sidebar__fact dd {
  font-size: 0.8125rem;
  color: var(--ink-light);
  margin-top: 2px;
}

.available { color: var(--red) !important; font-weight: 500; }

/* Classified ad */
.ad-label {
  font-size: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--ink-ghost);
  text-align: center;
  max-width: none;
}

.ad-box {
  margin-top: var(--space-2);
  padding: var(--space-6);
  border: 2px solid var(--ink);
  text-align: center;
}

.ad-text {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  line-height: 1.4;
  color: var(--ink);
}

.ad-link {
  display: inline-block;
  margin-top: var(--space-3);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink);
}

/* Illustration strip — newspaper photo layout */
.illustration-strip {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .illustration-strip {
    grid-template-columns: 1.2fr 1fr 0.8fr;
    gap: var(--space-4);
    align-items: start;
  }

  .illustration-strip .illustration:nth-child(2) {
    margin-top: var(--space-8);
  }
}

.illustration {
  margin: 0;
}

.illustration img {
  width: 100%;
  display: block;
  border: 1px solid var(--rule-light);
}

.illustration__caption {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--ink-faded);
  padding: var(--space-2) 0;
  font-style: italic;
  border-bottom: 1px solid var(--rule-light);
  max-width: none;
}

/* Stories */
.stories {
  display: flex;
  flex-direction: column;
}

/* Lead story — large, with side image */
.story__lead-inner {
  display: grid;
  gap: var(--space-8);
  padding: var(--space-6) 0;
  text-decoration: none;
  color: inherit;
}

@media (min-width: 768px) {
  .story__lead-inner {
    grid-template-columns: 1.5fr 1fr;
    align-items: start;
  }
}

.story__lead-inner:hover .story__headline {
  color: var(--red);
}

.story__lead-img {
  margin: 0;
}

.story__lead-img img {
  width: 100%;
  display: block;
  border: 1px solid var(--rule-light);
}

.story--lead .story__headline {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
}

.story__deck {
  font-style: italic;
  font-size: 0.875rem;
  color: var(--ink-faded);
  max-width: 55ch;
}

/* Story grid — remaining stories in columns */
.stories-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

@media (min-width: 768px) {
  .stories-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0 var(--space-6);
  }

  .stories-grid > .story:nth-child(even) {
    border-left: 1px solid var(--rule-light);
    padding-left: var(--space-6);
  }
}

.story__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  padding: var(--space-6) 0;
  text-decoration: none;
  color: inherit;
  transition: padding-left var(--duration-base) var(--ease-out);
}

@media (min-width: 640px) {
  .story__inner {
    grid-template-columns: 120px 1fr;
  }
}

.story__inner:hover { padding-left: var(--space-2); }
.story__inner:hover .story__headline { color: var(--red); }

.story__thumb {
  margin: 0;
}

.story__thumb img {
  width: 100%;
  display: block;
  border: 1px solid var(--rule-light);
}

.story__headline {
  font-size: clamp(1rem, 2vw, 1.375rem);
  transition: color var(--duration-base) var(--ease-out);
}

.story__body {
  font-size: 0.8125rem;
  line-height: 1.7;
  max-width: 60ch;
}

.story__pull-quote {
  font-family: var(--font-display);
  font-size: 1rem;
  font-style: italic;
  line-height: 1.4;
  color: var(--ink);
  border-left: 2px solid var(--ink);
  padding-left: var(--space-4);
  max-width: 45ch;
}

.story__foot {
  padding-top: var(--space-2);
}

@media (max-width: 768px) {
  .banner__edition { flex-direction: column; gap: var(--space-1); }
  .sidebar {
    border-top: 1px solid var(--rule-light);
    padding-top: var(--space-8);
    margin-top: var(--space-8);
  }
}
</style>
