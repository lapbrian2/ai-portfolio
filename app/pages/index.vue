<script setup lang="ts">
import { projects } from '~/data/projects'

const servicesRef = ref<HTMLElement | null>(null)
const workRef = ref<HTMLElement | null>(null)

useScrollReveal(servicesRef)
useScrollReveal(workRef)

const featuredProjects = projects.slice(0, 3)
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <ShaderHero />
      <div class="container hero__content">
        <p class="overline mb-6">AI Engineer & Web Developer</p>
        <h1 class="hero__title">
          Building intelligent<br>
          <em>systems</em> & immersive<br>
          web experiences
        </h1>
        <p class="hero__sub mt-8">
          Agents, MCP integrations, RAG pipelines, and high-performance creative websites.
        </p>
        <div class="hero__cta mt-12">
          <NuxtLink to="/contact" class="btn btn--primary">Start a project</NuxtLink>
          <NuxtLink to="/work" class="link-arrow">View work</NuxtLink>
        </div>
      </div>
      <div class="hero__scroll">
        <span class="mono">Scroll</span>
      </div>
    </section>

    <!-- Services -->
    <section ref="servicesRef" class="section">
      <div class="container">
        <div class="section__header">
          <p class="overline mb-6">What I Do</p>
          <h2>Two disciplines,<br>one builder</h2>
        </div>
        <div class="grid grid--2 mt-16">
          <ServiceBlock
            overline="Engineering"
            title="AI Systems"
            description="Production AI that works — not demos."
            :items="['Agents & orchestration', 'MCP server integrations', 'RAG pipelines', 'Full-stack AI applications']"
          />
          <ServiceBlock
            overline="Development"
            title="Web Experiences"
            description="Custom sites that prove your brand is serious."
            :items="['Immersive 3D & WebGL', 'Scroll-driven animations', 'Performance-first architecture', 'Custom design systems']"
          />
        </div>
        <div class="mt-12">
          <NuxtLink to="/services" class="link-arrow">View services & process</NuxtLink>
        </div>
      </div>
    </section>

    <div class="divider container" />

    <!-- Featured work -->
    <section ref="workRef" class="section">
      <div class="container">
        <div class="section__header">
          <p class="overline mb-6">Selected Work</p>
          <h2>Recent projects</h2>
        </div>
        <div class="grid grid--3 mt-16">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.title"
            :project="project"
          />
        </div>
        <div class="mt-12">
          <NuxtLink to="/work" class="link-arrow">All projects</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__content {
  position: relative;
  z-index: 1;
}

.hero__title em {
  font-style: italic;
  color: var(--accent);
}

.hero__sub {
  font-size: 1.0625rem;
  max-width: 45ch;
  color: var(--text-secondary);
}

.hero__cta {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.hero__scroll {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.hero__scroll .mono {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  animation: fadeInUp 1s var(--ease-out) 1.5s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section__header {
  max-width: 600px;
}
</style>
