<script setup lang="ts">
defineProps<{
  byline: string
  dateline: string
  readTime?: string
  section?: string
}>()
</script>

<template>
  <div class="article-meta">
    <div class="article-meta__top">
      <span v-if="section" class="article-meta__section">{{ section }}</span>
    </div>
    <div class="article-meta__bottom">
      <span class="article-meta__byline">By {{ byline }}</span>
      <span class="article-meta__sep">&middot;</span>
      <span class="article-meta__dateline">{{ dateline }}</span>
      <template v-if="readTime">
        <span class="article-meta__sep">&middot;</span>
        <span class="article-meta__read">{{ readTime }} min read</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.article-meta {
  padding: var(--space-3) 0;
  border-top: 1px solid var(--rule-light);
  border-bottom: 1px solid var(--rule-light);
  margin: var(--space-4) 0 var(--space-8);
}

.article-meta__section {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--red);
}

.article-meta__bottom {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

.article-meta__byline {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--ink);
}

.article-meta__dateline,
.article-meta__read {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  color: var(--ink-ghost);
}

.article-meta__sep {
  color: var(--ink-ghost);
  font-size: 0.5rem;
}
</style>
