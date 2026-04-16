<script setup lang="ts">
defineProps<{
  number: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="step">
    <div class="step__num">
      <span class="mono">{{ number }}</span>
    </div>
    <div class="step__body">
      <h3 class="step__title">{{ title }}</h3>
      <p class="step__desc">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.step {
  display: flex;
  gap: var(--space-8);
  padding: var(--space-8) 0;
  border-top: 1px solid var(--border);
}

.step__num {
  flex-shrink: 0;
  font-size: 0.6875rem;
  color: var(--accent);
  padding-top: var(--space-1);
}

.step__title {
  font-size: 1.5rem;
}

.step__desc {
  margin-top: var(--space-3);
  font-size: 0.9375rem;
}
</style>
