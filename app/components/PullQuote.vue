<script setup lang="ts">
defineProps<{
  quote: string
  attribution?: string
}>()
</script>

<template>
  <blockquote class="pull-quote scroll-reveal">
    <div class="pull-quote__ornament">&diams;</div>
    <p class="pull-quote__text">&ldquo;{{ quote }}&rdquo;</p>
    <div class="pull-quote__rule" />
    <cite v-if="attribution" class="pull-quote__cite">&mdash; {{ attribution }}</cite>
  </blockquote>
</template>

<style scoped>
.pull-quote {
  margin: var(--space-12) auto;
  padding: var(--space-8) var(--space-6);
  text-align: center;
  max-width: 550px;
  position: relative;
}

.pull-quote__ornament {
  font-size: 1.5rem;
  color: var(--ink);
  margin-bottom: var(--space-4);
  letter-spacing: 0.5em;
}

.pull-quote__text {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  line-height: 1.35;
  color: var(--ink);
  font-style: italic;
  max-width: none;
  text-align: center;
}

.pull-quote__rule {
  width: 60px;
  height: 1px;
  background: var(--ink);
  margin: var(--space-4) auto;
}

.pull-quote__cite {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.5rem;
  font-style: normal;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faded);
}
</style>
