<script setup lang="ts">
useHead({ title: 'About — Brian Lapinski' })
</script>

<template>
  <div>
    <section class="section">
      <div class="container about-grid">
        <div class="about-content">
          <p class="overline mb-4">About</p>
          <h1>Brian Lapinski</h1>
          <div class="about-text mt-8">
            <p>
              I'm an AI engineer and web developer based in Canada. I build intelligent systems and immersive web experiences for companies that care about craft.
            </p>
            <p>
              Before going independent, I worked at Microsoft, Amazon, and Aya Healthcare — building production software at scale. Now I bring that engineering rigor to AI agents, MCP integrations, and creative web projects.
            </p>
            <p>
              I believe the best technology disappears into the experience. Whether it's an AI workflow that saves your team hours or a website that makes visitors stop scrolling — the goal is the same: build things that work and feel inevitable.
            </p>
          </div>

          <div class="about-links mt-16">
            <p class="overline mb-4">Elsewhere</p>
            <nav class="about-nav">
              <a href="https://github.com/lapbrian2" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/brian-lapinski" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Substack</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Gumroad</a>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--surface">
      <div class="container text-center">
        <h2>Want to work together?</h2>
        <p class="mt-4 text-secondary">I'm taking on new projects.</p>
        <div class="mt-8">
          <NuxtLink to="/contact" class="btn btn--primary">Get in touch</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-grid {
  max-width: 700px;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.about-nav {
  display: flex;
  gap: var(--space-6);
}

.about-nav a {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.about-nav a:hover {
  color: var(--text-primary);
}
</style>
