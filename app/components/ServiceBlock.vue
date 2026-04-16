<script setup lang="ts">
defineProps<{
  overline: string
  title: string
  description: string
  items: string[]
}>()
</script>

<template>
  <div class="svc">
    <p class="overline">{{ overline }}</p>
    <h3 class="svc__title">{{ title }}</h3>
    <p class="svc__desc">{{ description }}</p>
    <ul class="svc__list">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped>
.svc {
  padding: var(--space-8);
  background: var(--surface);
  border: 1px solid var(--border);
  transition: border-color var(--duration-base) var(--ease-out);
}

.svc:hover {
  border-color: var(--border-hover);
}

.svc__title {
  margin-top: var(--space-4);
}

.svc__desc {
  margin-top: var(--space-4);
  font-size: 0.9375rem;
}

.svc__list {
  margin-top: var(--space-8);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.svc__list li {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  padding-left: var(--space-6);
  position: relative;
}

.svc__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 12px;
  height: 1px;
  background: var(--accent);
  opacity: 0.5;
}
</style>
