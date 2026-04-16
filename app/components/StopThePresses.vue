<script setup lang="ts">
/**
 * STOP THE PRESSES — a dramatic interstitial banner
 * that scrolls into view with theatrical energy.
 * Full-width, black background, massive white type.
 */
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="stp scroll-reveal">
    <div class="stp__inner">
      <div class="stp__stars">&starf; &starf; &starf;</div>
      <h2 class="stp__text">{{ text || 'STOP THE PRESSES' }}</h2>
      <div class="stp__stars">&starf; &starf; &starf;</div>
    </div>
  </div>
</template>

<style scoped>
.stp {
  background: var(--ink);
  color: var(--paper);
  padding: var(--space-8) var(--space-6);
  text-align: center;
  overflow: hidden;
  position: relative;
}

.stp__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.stp__text {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--paper);
  line-height: 1;
  white-space: nowrap;
}

.stp__stars {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--paper);
  opacity: 0.5;
}
</style>
