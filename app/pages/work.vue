<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects } from '~/data/projects'

const activeCategory = ref<'all' | 'ai' | 'web' | 'creative'>('all')
const gridRef = ref<HTMLElement | null>(null)

useScrollReveal(gridRef)
useHead({ title: 'Work — Brian Lapinski' })

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects
  return projects.filter(p => p.category === activeCategory.value)
})

const categories = [
  { value: 'all', label: 'All' },
  { value: 'ai', label: 'AI' },
  { value: 'web', label: 'Web' },
  { value: 'creative', label: 'Creative' },
] as const
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <p class="overline mb-6">Portfolio</p>
        <h1>Selected work</h1>
        <p class="mt-8">
          AI systems, web experiences, and creative experiments.<br>
          Each project ships to production.
        </p>

        <nav class="filter mt-12" aria-label="Filter projects">
          <button
            v-for="cat in categories"
            :key="cat.value"
            class="filter__btn"
            :class="{ 'filter__btn--active': activeCategory === cat.value }"
            @click="activeCategory = cat.value"
          >
            {{ cat.label }}
          </button>
        </nav>

        <div ref="gridRef" class="grid grid--3 mt-12">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.title"
            :project="project"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: var(--space-1);
}

.filter__btn {
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: none;
  border: 1px solid transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.filter__btn:hover {
  color: var(--text-secondary);
}

.filter__btn--active {
  color: var(--text-primary);
  border-color: var(--border);
  background: var(--surface);
}
</style>
