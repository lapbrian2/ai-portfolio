<script setup lang="ts">
/**
 * Horizontal scrolling classified ads — GSAP ScrollTrigger pinned + scrubbed.
 * The section pins in place while the ads scroll horizontally through.
 */
const wrapperRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

const ads = [
  {
    category: 'SERVICES',
    title: 'AI Agent Development',
    body: 'Custom multi-agent systems built to spec. MCP server integration, tool orchestration, memory systems. Production-grade.',
    price: 'From $175/hr',
  },
  {
    category: 'SERVICES',
    title: 'Website Design & Build',
    body: 'Custom Nuxt sites with Three.js, GSAP, scroll-driven animations. SEO & Google Business included. 3-5 day delivery.',
    price: 'From $2,500',
  },
  {
    category: 'HELP WANTED',
    title: 'Seeking Interesting Problems',
    body: 'Experienced builder seeks challenges others avoid. Must require both creative and technical skill. No boring allowed.',
    price: '',
  },
  {
    category: 'FOR SALE',
    title: 'RAG Pipeline Setup',
    body: 'Vector store configuration, chunking strategy, eval framework. Your documents, searchable by AI. One-time setup.',
    price: 'Project-based',
  },
  {
    category: 'ANNOUNCEMENT',
    title: 'Now Open for Contracts',
    body: 'Brian Lapinski is available for AI engineering and creative web development. Remote-friendly, Lean Six Sigma approach.',
    price: '',
  },
  {
    category: 'SERVICES',
    title: 'MCP Server Integration',
    body: 'Connect your internal tools to Claude, GPT, or custom LLMs. Python & TypeScript. Built and tested in production.',
    price: 'From $175/hr',
  },
  {
    category: 'FOR SALE',
    title: 'Immersive Web Experience',
    body: 'Three.js + GSAP + Lenis. Scroll-driven 3D. Custom GLSL shaders. The kind of site that wins awards and stops the scroll.',
    price: 'From $5,000',
  },
  {
    category: 'PERSONALS',
    title: 'Images That Speak Without Words',
    body: 'Digital artist exploring what it means to be human. Lürzer\'s Archive 200 Best. Available for creative partnerships.',
    price: '',
  },
]

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp() as any
  if (!$gsap || !wrapperRef.value || !trackRef.value) return

  const track = trackRef.value
  const scrollWidth = track.scrollWidth - wrapperRef.value.offsetWidth

  $gsap.to(track, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: 'top 20%',
      end: () => `+=${scrollWidth}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })
})
</script>

<template>
  <section ref="wrapperRef" class="classifieds">
    <div class="classifieds__header container">
      <hr class="rule rule--thick" />
      <h4 class="classifieds__title">Classified Advertisements</h4>
      <hr class="rule" />
    </div>

    <div class="classifieds__viewport">
      <div ref="trackRef" class="classifieds__track">
        <div
          v-for="(ad, i) in ads"
          :key="i"
          class="cl-card"
        >
          <div class="cl-card__cat">{{ ad.category }}</div>
          <h3 class="cl-card__title">{{ ad.title }}</h3>
          <p class="cl-card__body">{{ ad.body }}</p>
          <div class="cl-card__footer">
            <span v-if="ad.price" class="cl-card__price">{{ ad.price }}</span>
            <NuxtLink
              to="/contact"
              class="cl-card__link"
              data-cursor
              data-cursor-text="Reply"
            >
              Enquire &rarr;
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.classifieds {
  padding: var(--space-16) 0 var(--space-8);
  overflow: hidden;
}

.classifieds__title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
  padding: var(--space-4) 0;
  letter-spacing: 0.02em;
}

.classifieds__viewport {
  overflow: hidden;
  padding: var(--space-8) var(--space-6);
}

.classifieds__track {
  display: flex;
  gap: 1px;
  width: max-content;
  background: var(--rule-light);
}

.cl-card {
  width: 280px;
  flex-shrink: 0;
  padding: var(--space-6);
  background: var(--paper);
  display: flex;
  flex-direction: column;
  transition: background-color var(--duration-base) var(--ease-out);
}

.cl-card:hover {
  background: var(--paper-dark);
}

.cl-card__cat {
  font-family: var(--font-body);
  font-size: 0.4375rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  background: var(--ink);
  color: var(--paper);
  padding: 2px 8px;
  align-self: flex-start;
}

.cl-card__title {
  margin-top: var(--space-4);
  font-size: 1.0625rem;
  line-height: 1.2;
}

.cl-card__body {
  margin-top: var(--space-3);
  font-size: 0.6875rem;
  line-height: 1.65;
  color: var(--ink-light);
  max-width: none;
  flex-grow: 1;
}

.cl-card__footer {
  margin-top: var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-3);
  border-top: 1px solid var(--rule-light);
}

.cl-card__price {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  font-weight: 600;
  color: var(--red);
}

.cl-card__link {
  font-size: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.cl-card__link:hover {
  color: var(--red);
}
</style>
