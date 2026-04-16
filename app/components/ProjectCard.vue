<script setup lang="ts">
import type { Project } from '~/data/projects'

defineProps<{ project: Project }>()

const categoryLabel: Record<string, string> = {
  ai: 'AI',
  web: 'Web',
  creative: 'Creative',
}
</script>

<template>
  <component
    :is="project.url ? 'a' : 'div'"
    :href="project.url"
    :target="project.url ? '_blank' : undefined"
    :rel="project.url ? 'noopener noreferrer' : undefined"
    class="card"
  >
    <div class="card__header">
      <span class="overline">{{ categoryLabel[project.category] }}</span>
      <span class="card__arrow" v-if="project.url">&nearr;</span>
    </div>
    <h3 class="card__title">{{ project.title }}</h3>
    <p class="card__desc">{{ project.description }}</p>
    <div class="card__tags">
      <span v-for="tag in project.tags" :key="tag" class="card__tag">{{ tag }}</span>
    </div>
  </component>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: var(--space-8);
  background: var(--surface);
  border: 1px solid var(--border);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-glow) 0%, transparent 50%);
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
}

.card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.card:hover::before {
  opacity: 1;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.card__arrow {
  font-size: 1.25rem;
  color: var(--text-muted);
  transition: all var(--duration-base) var(--ease-out);
}

.card:hover .card__arrow {
  color: var(--accent);
  transform: translate(2px, -2px);
}

.card__title {
  margin-top: var(--space-6);
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
}

.card__desc {
  margin-top: var(--space-3);
  font-size: 0.875rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}

.card__tags {
  margin-top: var(--space-6);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  position: relative;
  z-index: 1;
}

.card__tag {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  padding: var(--space-1) var(--space-3);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  border: 1px solid var(--border);
}
</style>
