<script setup lang="ts">
import { projects } from '~/data/projects'

const featuredProjects = projects.slice(0, 4)
const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

// GSAP-powered headline reveal (too complex for CSS — needs masked char stagger)
const heroRef = ref<HTMLElement | null>(null)

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

        <div class="banner__content">
          <p class="kicker mb-4">Exclusive Report</p>
          <h1 ref="heroRef" class="ink-bleed headline-animate">
            From Amazon Operations to AI Engineering: One Builder's Leap Into the Future
          </h1>
          <div class="banner__deck mt-6 scroll-fade">
            <p class="deck">
              Lean Six Sigma-certified entrepreneur now ships production AI systems
              and immersive web experiences from his Toronto studio.
            </p>
          </div>
          <div class="banner__meta mt-4 scroll-fade">
            <span class="dateline">By Brian Lapinski &mdash; Toronto, Canada</span>
          </div>
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule scroll-rule" /></div>

    <!-- Lede + sidebar -->
    <section class="section scroll-exit">
      <div class="container">
        <div class="grid grid--sidebar">
          <div class="scroll-reveal">
            <p class="lede drop-cap text-justify">
              Brian Lapinski's path to AI engineering started not in a computer science lab but on
              the operations floor at Amazon, where he managed programs and led teams as an Area Manager.
              Lean-certified and Six Sigma trained, he built Quick Dry Floor Care into a successful
              residential carpet cleaning operation. He now works at US Hydrations.
            </p>
            <p class="body-col mt-6 text-justify scroll-reveal-slow">
              Now he builds production AI systems and immersive web experiences — multi-agent orchestration,
              MCP integrations, scroll-driven 3D portfolios with custom GLSL shaders. The operations
              mindset stayed: every system ships, every process is measurable, every build has a purpose.
            </p>
            <p class="continued mt-4 scroll-fade">
              <em>Continued on Page 3</em> &mdash;
              <NuxtLink to="/about" class="link-arrow" data-cursor>Read full profile</NuxtLink>
            </p>
          </div>
          <aside class="sidebar scroll-reveal-slow">
            <h4 class="section-head">At a Glance</h4>
            <dl class="sidebar__facts mt-4">
              <div class="sidebar__fact">
                <dt>Background</dt>
                <dd>Amazon, Entrepreneur</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Certifications</dt>
                <dd>Lean, Six Sigma</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Ventures</dt>
                <dd>Quick Dry Floor Care (Owner)</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Current</dt>
                <dd>US Hydrations</dd>
              </div>
              <div class="sidebar__fact">
                <dt>Availability</dt>
                <dd class="available">Taking contracts</dd>
              </div>
            </dl>

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

    <!-- Featured stories -->
    <section class="section">
      <div class="container">
        <h4 class="section-head scroll-reveal-left">Featured Stories</h4>

        <div class="stories mt-8 scroll-stagger">
          <article
            v-for="(project, i) in featuredProjects"
            :key="project.title"
            class="story"
            :class="{ 'story--lead': i === 0 }"
          >
            <component
              :is="project.url ? 'a' : 'div'"
              :href="project.url"
              :target="project.url ? '_blank' : undefined"
              class="story__inner"
              data-cursor
              data-cursor-text="Read"
            >
              <div class="story__head">
                <span class="kicker">{{ project.category === 'ai' ? 'AI Engineering' : project.category === 'web' ? 'Web Development' : 'Creative' }}</span>
              </div>
              <h3 class="story__headline" :class="{ 'ink-bleed': i === 0 }">
                {{ project.headline }}
              </h3>
              <p class="story__body mt-2 text-justify">{{ project.description }}</p>
              <div class="story__foot mt-3">
                <span class="dateline">{{ project.dateline }} &mdash; {{ project.byline }}</span>
                <div class="story__tags">
                  <span v-for="tag in project.tags" :key="tag" class="story__tag">{{ tag }}</span>
                </div>
              </div>
            </component>
            <hr class="rule" />
          </article>
        </div>

        <div class="mt-8 text-center scroll-reveal">
          <NuxtLink to="/work" class="btn" data-cursor>All Stories &rarr;</NuxtLink>
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule rule--double scroll-rule" /></div>

    <!-- Services columns -->
    <section class="section scroll-exit">
      <div class="container">
        <h4 class="section-head scroll-reveal-left">Services Directory</h4>
        <div class="grid grid--2 mt-8">
          <div class="scroll-reveal">
            <h3 class="ink-bleed parallax-text">AI Engineering</h3>
            <p class="body-col mt-4 text-justify">
              Multi-agent systems, MCP server integrations, RAG pipelines, and full-stack AI applications.
              Production AI built with enterprise rigor — not hackathon demos. Agents that orchestrate,
              tools that connect, pipelines that scale.
            </p>
            <p class="body-col mt-4 text-justify">
              Starting at $175/hr for contract work. Project-based pricing available for defined scopes.
            </p>
          </div>
          <div class="col-ruled scroll-reveal-slow">
            <h3 class="ink-bleed parallax-text">Web Development</h3>
            <p class="body-col mt-4 text-justify">
              Custom Nuxt and Vue sites, immersive Three.js experiences, scroll-driven animations,
              and design systems. Small business packages starting at $2,500 including Google Business
              setup and local SEO.
            </p>
            <p class="body-col mt-4 text-justify">
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

.banner__content {
  max-width: 900px;
}

.banner__deck {
  max-width: 650px;
}

.deck {
  font-size: 1.0625rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--ink-light);
  max-width: none;
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
  max-width: none;
}

.lede {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--ink);
  max-width: none;
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
  max-width: none;
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

/* Stories */
.stories { display: flex; flex-direction: column; }

.story__inner {
  display: block;
  padding: var(--space-6) 0;
  text-decoration: none;
  color: inherit;
  transition: padding-left var(--duration-base) var(--ease-out);
}

.story__inner:hover { padding-left: var(--space-3); }
.story__inner:hover .story__headline { color: var(--red); }

.story__headline {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  transition: color var(--duration-base) var(--ease-out);
}

.story--lead .story__headline {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
}

.story__body {
  font-size: 0.8125rem;
  line-height: 1.7;
  max-width: 65ch;
}

.story__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.story__tags { display: flex; gap: var(--space-2); }

.story__tag {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  padding: 1px 5px;
  border: 1px solid var(--rule-light);
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
