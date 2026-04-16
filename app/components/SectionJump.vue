<script setup lang="ts">
defineProps<{
  sections: { label: string; id: string }[]
}>()
</script>

<template>
  <nav class="section-jump scroll-fade" aria-label="Jump to section">
    <span class="section-jump__label">In This Issue</span>
    <div class="section-jump__links">
      <a
        v-for="section in sections"
        :key="section.id"
        :href="`#${section.id}`"
        class="section-jump__link"
        data-cursor
      >
        {{ section.label }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
.section-jump {
  margin: var(--space-6) 0;
  padding: var(--space-4);
  border: 1px solid var(--rule-light);
}

.section-jump__label {
  font-family: var(--font-body);
  font-size: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--ink-ghost);
}

.section-jump__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  margin-top: var(--space-3);
}

.section-jump__link {
  font-size: 0.6875rem;
  color: var(--ink-faded);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.section-jump__link:hover {
  color: var(--red);
}
</style>
