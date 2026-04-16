<script setup lang="ts">
import { projects } from '~/data/projects'

const heroRef = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)
const workRef = ref<HTMLElement | null>(null)
const servicesRef = ref<HTMLElement | null>(null)

useTextReveal(heroRef, { stagger: 0.015, duration: 0.9, delay: 0.2 })
useScrollReveal(aboutRef, { y: 40, duration: 1 })
useScrollReveal(workRef, { y: 40, stagger: 0.12 })
useScrollReveal(servicesRef, { y: 30, stagger: 0.15 })

const featuredProjects = projects.slice(0, 4)
</script>

<template>
  <div>
    <!-- Banner headline -->
    <section class="banner">
      <div class="container">
        <div class="banner__content">
          <p class="kicker mb-4">Breaking</p>
          <h1 ref="heroRef">
            AI Engineer Ships Production Systems & Immersive Web Experiences
          </h1>
          <div class="banner__meta mt-6">
            <span class="dateline">Toronto, Canada</span>
            <span class="dateline">&mdash; Available for contracts</span>
          </div>
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule" /></div>

    <!-- Lede section — about intro -->
    <section class="section">
      <div class="container">
        <div class="grid grid--sidebar">
          <div ref="aboutRef">
            <p class="lede drop-cap">
              With a background at Microsoft, Amazon, and Aya Healthcare, Brian Lapinski builds production AI systems and crafts immersive digital experiences. From multi-agent orchestration and MCP integrations to scroll-driven 3D websites, every project ships to production.
            </p>
            <p class="mt-6">
              Now operating independently, he brings enterprise engineering rigor to AI agents, RAG pipelines, and creative web projects for companies that value precision and taste.
            </p>
            <NuxtLink to="/about" class="link-arrow mt-8" data-cursor>
              Full biography
            </NuxtLink>
          </div>
          <aside class="sidebar">
            <h4 class="section-head">Quick Facts</h4>
            <dl class="sidebar__facts mt-4">
              <div class="sidebar__fact">
                <dt>Experience</dt>
                <dd>Microsoft, Amazon, Aya</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Specialties</dt>
                <dd>AI Engineering, Creative Web</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Stack</dt>
                <dd>Nuxt, Three.js, GSAP, Python</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Location</dt>
                <dd>Toronto, Canada</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule rule--thick" /></div>

    <!-- Featured projects -->
    <section class="section">
      <div class="container">
        <h4 class="section-head">Featured Projects</h4>
        <div ref="workRef" class="articles mt-8">
          <article
            v-for="(project, i) in featuredProjects"
            :key="project.title"
            class="article"
          >
            <component
              :is="project.url ? 'a' : 'div'"
              :href="project.url"
              :target="project.url ? '_blank' : undefined"
              class="article__inner"
              data-cursor
              data-cursor-text="Read"
            >
              <span class="article-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <p class="kicker">{{ project.category === 'ai' ? 'AI Engineering' : project.category === 'web' ? 'Web Development' : 'Creative' }}</p>
                <h3 class="mt-2">{{ project.title }}</h3>
                <p class="article__desc mt-2">{{ project.description }}</p>
                <div class="article__tags mt-4">
                  <span v-for="tag in project.tags" :key="tag" class="article__tag">{{ tag }}</span>
                </div>
              </div>
            </component>
            <hr class="rule" />
          </article>
        </div>
        <NuxtLink to="/work" class="link-arrow mt-8" data-cursor>All projects</NuxtLink>
      </div>
    </section>

    <div class="container"><hr class="rule" /></div>

    <!-- Services columns -->
    <section class="section">
      <div class="container">
        <h4 class="section-head">Services Offered</h4>
        <div ref="servicesRef" class="grid grid--2 mt-8">
          <div>
            <h3>AI Engineering</h3>
            <p class="mt-4 text-justify">
              Multi-agent systems, MCP server integrations, RAG pipelines, and full-stack AI applications. Production AI that works beyond the demo.
            </p>
          </div>
          <div class="col-ruled">
            <h3>Web Development</h3>
            <p class="mt-4 text-justify">
              Custom Nuxt and Vue sites, immersive Three.js experiences, scroll-driven animations, and design systems. Performance-first architecture.
            </p>
          </div>
        </div>
        <div class="mt-8 text-center">
          <NuxtLink to="/services" class="btn" data-cursor>View Services & Process</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Banner */
.banner {
  padding: var(--space-12) 0;
}

.banner__content {
  max-width: 900px;
}

.banner__meta {
  display: flex;
  gap: var(--space-4);
}

/* Lede paragraph */
.lede {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--ink);
  max-width: none;
}

/* Sidebar */
.sidebar {
  padding-top: var(--space-2);
}

.sidebar__facts {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.sidebar__fact {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar__fact dt {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-faded);
}

.sidebar__fact dd {
  font-size: 0.8125rem;
  color: var(--ink-light);
}

/* Articles */
.articles {
  display: flex;
  flex-direction: column;
}

.article__inner {
  display: flex;
  gap: var(--space-6);
  padding: var(--space-6) 0;
  text-decoration: none;
  color: inherit;
  transition: padding-left var(--duration-base) var(--ease-out);
}

.article__inner:hover {
  padding-left: var(--space-3);
}

.article__inner:hover h3 {
  color: var(--red);
}

.article__desc {
  font-size: 0.875rem;
  max-width: 50ch;
}

.article__tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.article__tag {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  padding: 2px 6px;
  border: 1px solid var(--rule-light);
}

@media (max-width: 768px) {
  .sidebar {
    border-top: 1px solid var(--rule-light);
    padding-top: var(--space-8);
    margin-top: var(--space-8);
  }
}
</style>
