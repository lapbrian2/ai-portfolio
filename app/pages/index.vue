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

// Hover reveal on stories section
useHoverReveal(storiesRef, storyImageRef)

onMounted(() => {
  const { $gsap } = useNuxtApp() as any
  if (!$gsap || !heroRef.value) return

  const text = heroRef.value.textContent || ''
  heroRef.value.innerHTML = text
    .split('')
    .map((char: string) =>
      char === ' '
        ? '<span class="char">&nbsp;</span>'
        : `<span class="char">${char}</span>`
    )
    .join('')

  heroRef.value.style.overflow = 'hidden'

  const chars = heroRef.value.querySelectorAll('.char')

  $gsap.from(chars, {
    y: '110%',
    duration: 0.9,
    delay: 0.4,
    stagger: 0.012,
    ease: 'expo.out',
  })
})
</script>

<template>
  <div>
    <!-- Banner headline -->
    <section class="banner">
      <div class="container">
        <div class="banner__edition scroll-fade">
          <span class="dateline">Vol. 1 &mdash; No. 1</span>
          <span class="dateline">{{ today }}</span>
          <span class="dateline">Final Edition</span>
        </div>

        <div class="banner__layout">
          <div class="banner__content">
            <p class="kicker mb-4">Exclusive Report</p>
            <h1 ref="heroRef" class="ink-bleed headline-animate">
              The Artist Who Builds: Exploring What It Means to Be Human Through Images and Code
            </h1>
            <div class="banner__deck mt-6 scroll-fade">
              <p class="deck">
                Lürzer's Archive 200 Best Digital Artist, creAtIva Vol. 7, Choice Dao Mover and Shaker.
                From Amazon operations to AI architecture — the story of a builder who sees no line between art and engineering.
              </p>
            </div>
            <div class="banner__meta mt-4 scroll-fade">
              <span class="dateline">By Brian Lapinski &mdash; Drums, Pennsylvania</span>
            </div>
          </div>
          <figure class="banner__image scroll-scale">
            <img
              src="/images/hero-brain.png"
              alt="Pulp sci-fi illustration of a mechanical brain"
              class="halftone-img"
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

    <!-- Lede + sidebar -->
    <section class="section scroll-exit">
      <div class="container">
        <div class="grid grid--sidebar">
          <div>
            <ScrollRevealText
              class="lede"
              text="Brian Lapinski uses images as a way to explore what it means to be human. His work is rooted in personal exploration, emotion, and connection — not trends or technique for its own sake. Named to Lürzer's Archive 200 Best Digital Artists and selected for creAtIva Magazine Vol. 7, his images have shown at galleries from New York to Barcelona."
            />
            <ScrollRevealText
              class="body-col mt-8"
              text="But Lapinski is also a builder. A Villanova-trained Lean Six Sigma Black Belt who managed programs at Amazon, founded a cleaning company, and now supervises operations at US Hydrations. He builds AI agent systems, Three.js experiences, and tools that bridge the gap between art and engineering. 1,138 commits across 19 repositories. 46 registered skills. One cockpit to run it all."
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
              <div class="sidebar__fact">
                <dt>Availability</dt>
                <dd class="available">Open to work</dd>
              </div>
            </dl>

            <WeatherBox class="mt-8 scroll-scale" />

            <div class="sidebar__ad mt-8 scroll-scale">
              <p class="ad-label">ADVERTISEMENT</p>
              <div class="ad-box">
                <p class="ad-text">
                  Need an AI engineer?<br>
                  <strong>Enquire today.</strong>
                </p>
                <NuxtLink to="/contact" class="ad-link" data-cursor>Contact &rarr;</NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule scroll-rule" /></div>

    <!-- Illustration strip — multiple pulp images -->
    <section class="section" style="padding: var(--space-8) 0;">
      <div class="container">
        <div class="illustration-strip scroll-stagger">
          <figure class="illustration">
            <img src="/images/retro-sci-fi.png" alt="Engineer working on mechanical arms" class="halftone-img" loading="lazy" />
            <figcaption class="illustration__caption">
              <span class="dateline">Illustration</span> &mdash; The builder at work.
            </figcaption>
          </figure>
          <figure class="illustration">
            <img src="/images/pulp-vintage.png" alt="Street artist facing a mechanical creature" class="halftone-img" loading="lazy" />
            <figcaption class="illustration__caption">
              <span class="dateline">Illustration</span> &mdash; Art vs. Machine.
            </figcaption>
          </figure>
          <figure class="illustration">
            <img src="/images/pulp-sci-fi-2.png" alt="Newsboy reading the paper in shock" class="halftone-img" loading="lazy" />
            <figcaption class="illustration__caption">
              <span class="dateline">Illustration</span> &mdash; Extra! Extra! Read all about it.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule scroll-rule" /></div>

    <!-- Featured stories -->
    <section class="section">
      <div class="container">
        <h4 class="section-head scroll-reveal-left">Featured Stories</h4>

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
                <div class="story__foot mt-4">
                  <span class="dateline">{{ featuredProjects[0].dateline }} — {{ featuredProjects[0].byline }}</span>
                </div>
              </div>
              <figure v-if="featuredProjects[0].image" class="story__lead-img">
                <img :src="featuredProjects[0].image" :alt="featuredProjects[0].title" class="halftone-img" loading="lazy" />
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
                  <img :src="project.image" :alt="project.title" class="halftone-img" loading="lazy" />
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

    <!-- Classified Ads — horizontal scroll -->
    <ClassifiedAds />

    <!-- Services columns -->
    <section class="section scroll-exit">
      <div class="container">
        <h4 class="section-head scroll-reveal-left">Services Directory</h4>
        <div class="grid grid--2 mt-8">
          <div class="scroll-reveal">
            <h3 class="ink-bleed parallax-text">AI Engineering</h3>
            <p class="body-col mt-4">
              Multi-agent systems, MCP server integrations, RAG pipelines, and full-stack AI applications.
              Production AI built with enterprise rigor — not hackathon demos. Agents that orchestrate,
              tools that connect, pipelines that scale.
            </p>
            <p class="body-col mt-4">
              Starting at $175/hr for contract work. Project-based pricing available for defined scopes.
            </p>
          </div>
          <div class="col-ruled scroll-reveal-slow">
            <h3 class="ink-bleed parallax-text">Web Development</h3>
            <p class="body-col mt-4">
              Custom Nuxt and Vue sites, immersive Three.js experiences, scroll-driven animations,
              and design systems. Small business packages starting at $2,500 including Google Business
              setup and local SEO.
            </p>
            <p class="body-col mt-4">
              Performance-first architecture. Every site scores 90+ on Lighthouse.
            </p>
          </div>
        </div>
        <div class="mt-8 text-center scroll-reveal">
          <NuxtLink to="/services" class="btn" data-cursor>Full Services & Process &rarr;</NuxtLink>
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
  gap: var(--gutter);
  align-items: start;
}

@media (min-width: 768px) {
  .banner__layout {
    grid-template-columns: 1.4fr 1fr;
  }
}

.banner__content {
  max-width: 900px;
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
