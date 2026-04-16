<script setup lang="ts">
useHead({ title: 'About — The Brian Lapinski Record' })

const bioRef = ref<HTMLElement | null>(null)
useScrollReveal(bioRef, { y: 40, duration: 1 })
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <h4 class="section-head">Profile</h4>
        <div class="grid grid--sidebar mt-8">
          <div ref="bioRef">
            <h2 class="ink-bleed">The Man Behind the Masthead</h2>
            <div class="bio mt-8">
              <p class="lede drop-cap text-justify">
                Brian Lapinski didn't start in tech. He started in operations — managing programs and
                leading teams at Amazon as an Area Manager, where he earned his stripes in Lean methodology
                and Six Sigma process optimization. The systems thinking stuck.
              </p>
              <p class="body-col mt-6 text-justify">
                From Amazon, he built Quick Dry Floor Care — a residential low-moisture carpet cleaning
                company — from the ground up. Now at US Hydrations, the operations instinct remains:
                find the process, eliminate the waste, ship the result.
              </p>
              <p class="body-col mt-6 text-justify">
                The pivot to AI engineering and web development wasn't a career change — it was an
                evolution. The same Lean thinking that optimized warehouse operations now drives
                multi-agent orchestration systems. The same Six Sigma rigor that measured cleaning
                quality now benchmarks AI pipeline performance.
              </p>
              <p class="body-col mt-6 text-justify">
                Today, Lapinski builds production AI systems — agents, MCP integrations, RAG pipelines —
                and immersive web experiences using Three.js, GSAP, and custom GLSL shaders. Every project
                ships. Every system is measurable. Every build has a purpose.
              </p>
            </div>
            <NuxtLink to="/contact" class="link-arrow mt-8" data-cursor>Get in touch</NuxtLink>
          </div>
          <aside class="sidebar">
            <h4 class="section-head">Curriculum Vitae</h4>
            <dl class="cv mt-4">
              <div class="cv__item">
                <dt>Current</dt>
                <dd>Independent AI Engineer & Web Developer</dd>
              </div>
              <div class="cv__item">
                <dt>Current</dt>
                <dd>US Hydrations</dd>
              </div>
              <div class="cv__item">
                <dt>Venture</dt>
                <dd>Quick Dry Floor Care — Founder</dd>
              </div>
              <div class="cv__item">
                <dt>Corporate</dt>
                <dd>Amazon — Program Management, Area Manager</dd>
              </div>
              <div class="cv__item">
                <dt>Certifications</dt>
                <dd>Lean Certified, Six Sigma</dd>
              </div>
              <div class="cv__item">
                <dt>Location</dt>
                <dd>Toronto, Canada</dd>
              </div>
            </dl>

            <h4 class="section-head mt-12">Elsewhere</h4>
            <nav class="sidebar-links mt-4">
              <a href="https://github.com/lapbrian2" target="_blank" rel="noopener noreferrer" data-cursor>GitHub</a>
              <a href="https://linkedin.com/in/brian-lapinski" target="_blank" rel="noopener noreferrer" data-cursor>LinkedIn</a>
              <a href="#" data-cursor>Substack</a>
              <a href="#" data-cursor>Gumroad</a>
            </nav>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bio {
  max-width: 650px;
}

.cv {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.cv__item {
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--rule-light);
}

.cv__item dt {
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-ghost);
}

.cv__item dd {
  font-size: 0.8125rem;
  color: var(--ink-light);
  margin-top: 2px;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sidebar-links a {
  font-size: 0.8125rem;
  color: var(--ink-faded);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.sidebar-links a:hover {
  color: var(--ink);
}

@media (max-width: 768px) {
  .sidebar {
    border-top: 1px solid var(--rule-light);
    padding-top: var(--space-8);
    margin-top: var(--space-8);
  }
}
</style>
