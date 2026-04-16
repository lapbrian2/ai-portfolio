<script setup lang="ts">
useHead({ title: 'Services — The Brian Lapinski Record' })
useScrollVelocity('.ink-bleed')
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <h4 class="section-head">Services Directory</h4>
        <h2 class="ink-bleed mt-6">What I Build</h2>
        <ScrollRevealText
          class="deck mt-6"
          text="From AI agent systems to immersive web experiences, every project ships with Lean Six Sigma rigor. Available for contracts, creative partnerships, and collaborations."
        />
      </div>
    </section>

    <div class="container"><hr class="rule rule--thick" /></div>

    <!-- Creative -->
    <section class="section">
      <div class="container">
        <div class="grid grid--sidebar">
          <div class="scroll-reveal">
            <h4 class="section-head">Digital Art & Creative</h4>
            <h3 class="ink-bleed mt-4">Images That Speak Without Words</h3>
            <p class="body-col mt-4 text-justify">
              AI-generated art rooted in personal exploration, emotion, and connection.
              Midjourney, ImagineArt, and custom workflows through a systematic Style DNA
              methodology — treating image generation as reproducible craft.
            </p>
            <ul class="service-list mt-6">
              <li>Digital art creation & curation</li>
              <li>Style DNA extraction & documentation</li>
              <li>Creative direction for AI art projects</li>
              <li>Gallery exhibition & publication submissions</li>
            </ul>
          </div>
          <aside class="sidebar scroll-reveal-slow">
            <div class="sidebar-box">
              <div class="sidebar-box__title">Credentials</div>
              <ul class="credential-list">
                <li>Lürzer's Archive 200 Best Digital Artists</li>
                <li>creAtIva Magazine Vol. 7</li>
                <li>Choice Dao 2026 Mover and Shaker</li>
                <li>ImagineArt Ambassador</li>
                <li>Caimera Creative Partner</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule" /></div>

    <!-- AI Engineering -->
    <section class="section">
      <div class="container">
        <div class="grid grid--2">
          <div class="scroll-reveal">
            <h4 class="section-head">AI Engineering</h4>
            <h3 class="ink-bleed mt-4">Intelligent Systems That Ship</h3>
            <p class="body-col mt-4 text-justify">
              Multi-agent systems, MCP server integrations, RAG pipelines, and full-stack AI applications.
              Production AI built with enterprise rigor — not hackathon demos.
            </p>
            <ul class="service-list mt-6">
              <li>Agent orchestration & tool-use patterns</li>
              <li>MCP server development (Python, TypeScript)</li>
              <li>RAG pipelines with eval frameworks</li>
              <li>Full-stack AI applications</li>
              <li>AI workflow automation</li>
            </ul>
            <p class="price mt-6">Starting at $175/hr</p>
          </div>
          <div class="col-ruled scroll-reveal-slow">
            <h4 class="section-head">Web Development</h4>
            <h3 class="ink-bleed mt-4">Experiences That Stop the Scroll</h3>
            <p class="body-col mt-4 text-justify">
              Custom Nuxt and Vue sites, immersive Three.js experiences, scroll-driven animations,
              and design systems. Performance-first architecture.
            </p>
            <ul class="service-list mt-6">
              <li>Custom websites (Nuxt, Vue, React)</li>
              <li>Immersive 3D & WebGL experiences</li>
              <li>Scroll-driven animations (GSAP, Lenis)</li>
              <li>Custom GLSL shaders</li>
              <li>Small business packages with SEO</li>
            </ul>
            <p class="price mt-6">Sites from $2,500 &middot; Contracts from $175/hr</p>
          </div>
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule rule--thick" /></div>

    <!-- Process -->
    <section class="section">
      <div class="container">
        <h4 class="section-head">Process</h4>
        <h2 class="ink-bleed mt-6">How It Works</h2>
        <div class="process mt-12 scroll-stagger">
          <ProcessStep number="01" title="Talk" description="We get on a call. You tell me what you need. I tell you what it'll take. No surprises, no jargon." />
          <ProcessStep number="02" title="Build" description="I build it. You see progress. We iterate fast until it's right. Lean methodology — eliminate waste, ship value." />
          <ProcessStep number="03" title="Ship" description="It goes live. I verify everything works. You get the keys. Documentation included." />
        </div>
      </div>
    </section>

    <div class="container"><hr class="rule" /></div>

    <!-- CTA -->
    <section class="section">
      <div class="container text-center scroll-reveal">
        <h2 class="ink-bleed">Ready to Start?</h2>
        <p class="mt-4 text-center" style="margin: var(--space-4) auto 0; max-width: 45ch;">
          Tell me what you're building. I'll tell you how I can help.
        </p>
        <div class="mt-8">
          <NuxtLink to="/contact" class="btn" data-cursor>Send an Enquiry &rarr;</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.deck {
  font-size: 1.0625rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--ink-light);
  max-width: 55ch;
}

.body-col {
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--ink-light);
  max-width: none;
}

.service-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.service-list li {
  font-size: 0.8125rem;
  color: var(--ink-light);
  padding-left: var(--space-6);
  position: relative;
}

.service-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 12px;
  height: 1px;
  background: var(--red);
}

.price {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--red);
  max-width: none;
}

.process {
  max-width: 600px;
}

.credential-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: 0;
}

.credential-list li {
  font-size: 0.6875rem;
  color: var(--ink-light);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--rule-light);
}

.sidebar {
  padding-top: var(--space-2);
}

@media (max-width: 768px) {
  .sidebar {
    margin-top: var(--space-8);
  }
}
</style>
