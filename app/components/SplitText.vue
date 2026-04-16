<script setup lang="ts">
/**
 * Text splitting component — wraps each character in a span with --char-index CSS variable.
 * Pairs with CSS scroll-driven animations for compositor-thread text reveals.
 * No JavaScript animation library needed for the stagger — pure CSS calc().
 */
const props = withDefaults(defineProps<{
  text: string
  tag?: string
  by?: 'chars' | 'words'
  class?: string
}>(), {
  tag: 'span',
  by: 'chars',
})

const words = computed(() => props.text.split(/\s+/))
const totalChars = computed(() => props.text.replace(/\s/g, '').length)
</script>

<template>
  <component
    :is="tag"
    class="split-text"
    :class="props.class"
    :style="{ '--char-total': totalChars, '--word-total': words.length }"
    :aria-label="text"
  >
    <template v-for="(word, wi) in words" :key="wi">
      <span
        class="split-word"
        :style="{ '--word-index': wi }"
        aria-hidden="true"
      >
        <span
          v-for="(char, ci) in word.split('')"
          :key="ci"
          class="split-char"
          :style="{ '--char-index': text.replace(/\s/g, '').indexOf(char, word.split('').slice(0, ci).join('').length > 0 ? ci : 0) }"
          :data-char="char"
        >{{ char }}</span>
      </span>
      <span v-if="wi < words.length - 1" class="split-space" aria-hidden="true">&nbsp;</span>
    </template>
  </component>
</template>

<style scoped>
.split-text {
  display: inline;
}

.split-word {
  display: inline-block;
  overflow: hidden;
}

.split-char {
  display: inline-block;
  will-change: transform, opacity;
}

.split-space {
  display: inline;
}
</style>
