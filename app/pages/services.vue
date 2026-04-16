<script setup lang="ts">
const processRef = ref<HTMLElement | null>(null)
const aiRef = ref<HTMLElement | null>(null)
const webRef = ref<HTMLElement | null>(null)

useScrollReveal(processRef, { stagger: 0.15 })
useScrollReveal(aiRef)
useScrollReveal(webRef)

useHead({ title: 'Services — Brian Lapinski' })
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <p class="overline mb-4">Services</p>
        <h1>What I build</h1>
        <p class="mt-6 text-secondary hero-desc">
          I help companies build AI systems that work in production and websites that convert.
          Available for contracts, projects, and ongoing partnerships.
        </p>
      </div>
    </section>

    <!-- AI Engineering -->
    <section ref="aiRef" class="section section--surface">
      <div class="container">
        <p class="overline mb-4">AI Engineering</p>
        <h2>Intelligent systems that ship</h2>
        <div class="grid grid--2 mt-8">
          <div class="service-item">
            <h4>Agents & Orchestration</h4>
            <p class="mt-2 text-secondary service-item__desc">Multi-agent systems, tool-use patterns, autonomous workflows. Claude, OpenAI, custom LLM pipelines.</p>
          </div>
          <div class="service-item">
            <h4>MCP Integrations</h4>
            <p class="mt-2 text-secondary service-item__desc">Connect your internal tools to AI. Custom MCP servers, tool definitions, structured output.</p>
          </div>
          <div class="service-item">
            <h4>RAG Pipelines</h4>
            <p class="mt-2 text-secondary service-item__desc">Retrieval-augmented generation with vector stores, chunking strategies, and eval frameworks.</p>
          </div>
          <div class="service-item">
            <h4>Full-Stack AI Apps</h4>
            <p class="mt-2 text-secondary service-item__desc">End-to-end applications with AI features. From prototype to production.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Web Development -->
    <section ref="webRef" class="section">
      <div class="container">
        <p class="overline mb-4">Web Development</p>
        <h2>Sites that prove your brand</h2>
        <div class="grid grid--2 mt-8">
          <div class="service-item">
            <h4>Custom Websites</h4>
            <p class="mt-2 text-secondary service-item__desc">Nuxt, Vue, React. Performance-first architecture. SEO and accessibility built in.</p>
          </div>
          <div class="service-item">
            <h4>Immersive Experiences</h4>
            <p class="mt-2 text-secondary service-item__desc">Three.js, WebGL, GSAP. Scroll-driven storytelling. The kind of sites that win awards.</p>
          </div>
          <div class="service-item">
            <h4>Design Systems</h4>
            <p class="mt-2 text-secondary service-item__desc">Typography, color, spacing, motion — codified into reusable component libraries.</p>
          </div>
          <div class="service-item">
            <h4>Small Business Packages</h4>
            <p class="mt-2 text-secondary service-item__desc">Get found online. Custom site + Google Business + local SEO. Starting at $2,500.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section ref="processRef" class="section section--surface">
      <div class="container">
        <p class="overline mb-4">Process</p>
        <h2>How it works</h2>
        <div class="mt-8 process-list">
          <ProcessStep
            number="01"
            title="Talk"
            description="We get on a call. You tell me what you need. I tell you what it'll take. No surprises."
          />
          <ProcessStep
            number="02"
            title="Build"
            description="I build it. You see progress. We iterate fast until it's right."
          />
          <ProcessStep
            number="03"
            title="Ship"
            description="It goes live. I make sure everything works. You get the keys."
          />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container text-center">
        <h2>Ready to start?</h2>
        <p class="mt-4 text-secondary">Tell me what you're building. I'll tell you how I can help.</p>
        <div class="mt-8">
          <NuxtLink to="/contact" class="btn btn--primary">Get in touch</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-desc {
  font-size: 1.125rem;
  max-width: 55ch;
}

.service-item__desc {
  font-size: 0.9375rem;
}

.process-list {
  max-width: 600px;
}
</style>
