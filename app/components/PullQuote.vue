<script setup lang="ts">
defineProps<{
  quote: string
  attribution?: string
}>()
</script>

<template>
  <blockquote class="pq scroll-reveal">
    <div class="pq__rule" />
    <p class="pq__text">&ldquo;{{ quote }}&rdquo;</p>
    <div class="pq__rule pq__rule--thin" />
    <cite v-if="attribution" class="pq__cite">&mdash; {{ attribution }}</cite>
  </blockquote>
</template>

<style scoped>
.pq {
  margin: var(--space-12) auto;
  padding: var(--space-6) 0;
  text-align: center;
  max-width: 500px;
}

.pq__rule {
  width: 80px;
  height: 4px;
  background: var(--ink);
  margin: 0 auto var(--space-4);
}

.pq__rule--thin {
  height: 1px;
  margin: var(--space-4) auto 0;
}

.pq__text {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 700;
  line-height: 1.3;
  color: var(--ink);
  font-style: italic;
  max-width: none;
  text-align: center;
  text-transform: none;
}

.pq__cite {
  display: block;
  margin-top: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.5rem;
  font-style: normal;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faded);
}
</style>
