<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects } from '~/data/projects'

useHead({ title: 'Projects — The Brian Lapinski Record' })
useScrollVelocity('.ink-bleed')

const activeCategory = ref<'all' | 'art' | 'tech' | 'creative'>('all')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects
  return projects.filter(p => p.category === activeCategory.value)
})

const categories = [
  { value: 'all', label: 'All' },
  { value: 'art', label: 'Art' },
  { value: 'tech', label: 'Tech' },
  { value: 'creative', label: 'Creative' },
] as const
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <h4 class="section-head">Archives</h4>
        <h2 class="ink-bleed mt-6">All Stories</h2>
        <ScrollRevealText
          class="deck mt-6"
          text="Art, technology, and creative experiments. Each story represents work that shipped — exhibitions, tools, experiences, and recognition."
        />

        <nav class="filter mt-8" aria-label="Filter stories">
          <button
            v-for="cat in categories"
            :key="cat.value"
            class="filter__btn"
            :class="{ 'filter__btn--active': activeCategory === cat.value }"
            @click="activeCategory = cat.value"
            data-cursor
          >
            {{ cat.label }}
          </button>
        </nav>
      </div>
    </section>

    <div class="container"><hr class="rule rule--thick" /></div>

    <section class="section">
      <div class="container">
        <div class="stories scroll-stagger">
          <article
            v-for="project in filteredProjects"
            :key="project.title"
            class="story"
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
                <span class="kicker">{{ project.category === 'art' ? 'Art' : project.category === 'tech' ? 'Technology' : 'Creative' }}</span>
              </div>
              <h3 class="story__headline ink-bleed">{{ project.headline }}</h3>
              <p class="story__body mt-2">{{ project.description }}</p>
              <div class="story__foot mt-3">
                <span class="dateline">{{ project.dateline }} — {{ project.byline }}</span>
                <div class="story__tags">
                  <span v-for="tag in project.tags" :key="tag" class="story__tag">{{ tag }}</span>
                </div>
              </div>
            </component>
            <hr class="rule" />
          </article>
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

.filter {
  display: flex;
  gap: var(--space-1);
}

.filter__btn {
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: none;
  border: 1px solid transparent;
  color: var(--ink-ghost);
  cursor: none;
  transition: all var(--duration-fast) var(--ease-out);
}

.filter__btn:hover {
  color: var(--ink-faded);
}

.filter__btn--active {
  color: var(--ink);
  border-color: var(--ink);
}

.stories {
  display: flex;
  flex-direction: column;
}

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
</style>
