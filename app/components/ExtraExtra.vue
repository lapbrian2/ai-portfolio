<script setup lang="ts">
/**
 * EXTRA! EXTRA! — angled banner strip that rotates slightly
 * like a newsboy shouting headlines. Absolute chaos energy.
 */
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="extra scroll-scale" aria-hidden="true">
    <div class="extra__track">
      <span class="extra__text" v-for="n in 6" :key="n">
        {{ text || 'EXTRA! EXTRA! READ ALL ABOUT IT!' }} &bull;
      </span>
    </div>
  </div>
</template>

<style scoped>
.extra {
  background: var(--red-bright);
  color: white;
  padding: var(--space-2) 0;
  overflow: hidden;
  margin: var(--space-8) 0;
  position: relative;
  z-index: 5;
}

.extra__track {
  display: flex;
  white-space: nowrap;
  animation: extraScroll 30s linear infinite;
}

.extra__text {
  font-family: var(--font-ui);
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  flex-shrink: 0;
  padding: 0 var(--space-4);
}

@keyframes extraScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .extra__track { animation: none; }
}
</style>
