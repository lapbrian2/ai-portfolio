<script setup lang="ts">
defineProps<{
  type?: 'note' | 'correction' | 'dispatch' | 'wire'
  text: string
}>()

const labels: Record<string, string> = {
  note: "Editor\u2019s Note",
  correction: 'Correction',
  dispatch: 'Special Dispatch',
  wire: 'Wire Service Report',
}
</script>

<template>
  <aside class="ed-note scroll-fade">
    <div class="ed-note__header">
      <span class="ed-note__ornament">&sect;</span>
      <span class="ed-note__label">{{ labels[type || 'note'] }}</span>
      <span class="ed-note__ornament">&sect;</span>
    </div>
    <p class="ed-note__text">{{ text }}</p>
  </aside>
</template>

<style scoped>
.ed-note {
  margin: var(--space-8) 0;
  padding: var(--space-4) var(--space-6);
  border: 1px solid var(--ink);
  position: relative;
}

.ed-note__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.ed-note__ornament {
  font-size: 0.625rem;
  color: var(--ink-ghost);
}

.ed-note__label {
  font-family: var(--font-body);
  font-size: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--ink);
}

.ed-note__text {
  font-size: 0.8125rem;
  font-style: italic;
  line-height: 1.65;
  color: var(--ink-light);
  max-width: none;
}
</style>
