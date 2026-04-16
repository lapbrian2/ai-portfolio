<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="late-breaking scroll-scale">
    <div class="late-breaking__stamp">
      <span class="late-breaking__label">LATE BREAKING</span>
    </div>
    <p class="late-breaking__text">{{ text }}</p>
  </div>
</template>

<style scoped>
.late-breaking {
  margin: var(--space-8) 0;
  padding: var(--space-4) var(--space-6);
  border: 2px solid var(--red);
  position: relative;
}

.late-breaking__stamp {
  position: absolute;
  top: -10px;
  left: var(--space-4);
  background: var(--paper);
  padding: 0 var(--space-2);
}

.late-breaking__label {
  font-family: var(--font-body);
  font-size: 0.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--red);
}

.late-breaking__text {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--ink);
  font-style: italic;
  max-width: none;
}
</style>
