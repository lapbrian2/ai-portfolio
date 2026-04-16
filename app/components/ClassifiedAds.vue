<script setup lang="ts">
const ads = [
  {
    category: 'SERVICES',
    title: 'AI Agent Development',
    body: 'Custom multi-agent systems built to spec. MCP server integration, tool orchestration, memory systems. Production-grade. No demos.',
    price: 'From $175/hr',
    contact: true,
  },
  {
    category: 'SERVICES',
    title: 'Website Design & Build',
    body: 'Custom Nuxt sites with Three.js, GSAP, scroll-driven animations. SEO & Google Business included. 3-5 day delivery.',
    price: 'From $2,500',
    contact: true,
  },
  {
    category: 'HELP WANTED',
    title: 'Looking for Clients',
    body: 'Experienced AI engineer & web developer seeks interesting problems. Lean Six Sigma background. Will ship on time.',
    price: 'Competitive',
    contact: true,
  },
  {
    category: 'FOR SALE',
    title: 'RAG Pipeline Setup',
    body: 'Vector store configuration, chunking strategy, eval framework. Your documents, searchable by AI. One-time setup.',
    price: 'Project-based',
    contact: true,
  },
  {
    category: 'ANNOUNCEMENT',
    title: 'Now Accepting Contracts',
    body: 'Brian Lapinski is available for AI engineering and web development contracts. Toronto-based, remote-friendly.',
    price: '',
    contact: true,
  },
  {
    category: 'SERVICES',
    title: 'MCP Server Integration',
    body: 'Connect your internal tools to Claude, GPT, or custom LLMs. 22 tools built and counting. Python & TypeScript.',
    price: 'From $175/hr',
    contact: true,
  },
  {
    category: 'FOR SALE',
    title: 'Immersive Web Experience',
    body: 'Three.js + GSAP + Lenis. Scroll-driven 3D. Custom GLSL shaders. The kind of site that wins awards and converts visitors.',
    price: 'From $5,000',
    contact: true,
  },
  {
    category: 'PERSONALS',
    title: 'Seeking: Hard Problems',
    body: 'Builder with ops background seeks challenges others avoid. Must require both AI and web skills. No boring allowed.',
    price: '',
    contact: true,
  },
]
</script>

<template>
  <section class="classifieds">
    <div class="classifieds__header container">
      <hr class="rule rule--thick" />
      <h4 class="classifieds__title">Classified Advertisements</h4>
      <hr class="rule" />
    </div>

    <div class="classifieds__scroll">
      <div class="classifieds__track">
        <div
          v-for="(ad, i) in ads"
          :key="i"
          class="classified-card"
        >
          <span class="classified-card__cat">{{ ad.category }}</span>
          <h3 class="classified-card__title">{{ ad.title }}</h3>
          <p class="classified-card__body">{{ ad.body }}</p>
          <div class="classified-card__footer">
            <span v-if="ad.price" class="classified-card__price">{{ ad.price }}</span>
            <NuxtLink
              v-if="ad.contact"
              to="/contact"
              class="classified-card__link"
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
  padding: var(--space-16) 0;
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

.classifieds__scroll {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: var(--space-8) var(--space-6);
}

.classifieds__scroll::-webkit-scrollbar {
  display: none;
}

.classifieds__track {
  display: flex;
  gap: 1px;
  width: max-content;
  background: var(--rule-light);
}

.classified-card {
  width: 260px;
  flex-shrink: 0;
  padding: var(--space-6);
  background: var(--paper);
  display: flex;
  flex-direction: column;
}

.classified-card__cat {
  font-family: var(--font-body);
  font-size: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--ink-ghost);
  background: var(--ink);
  color: var(--paper);
  padding: 1px 6px;
  align-self: flex-start;
}

.classified-card__title {
  margin-top: var(--space-3);
  font-size: 1rem;
  line-height: 1.2;
}

.classified-card__body {
  margin-top: var(--space-2);
  font-size: 0.6875rem;
  line-height: 1.6;
  color: var(--ink-light);
  max-width: none;
  flex-grow: 1;
}

.classified-card__footer {
  margin-top: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-3);
  border-top: 1px solid var(--rule-light);
}

.classified-card__price {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--red);
}

.classified-card__link {
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.classified-card__link:hover {
  color: var(--red);
}
</style>
