<script setup lang="ts">
/**
 * Scroll-scrubbed text reveal — words go from ghosted (20% opacity) to
 * fully visible as the user scrolls through the section.
 * Like reading a newspaper with a spotlight following your eye.
 *
 * Pattern from: 21st.dev TextRevealByWord (adapted for Vue + GSAP)
 */
const props = withDefaults(defineProps<{
  text: string
  tag?: string
}>(), {
  tag: 'p',
})

const containerRef = ref<HTMLElement | null>(null)
const words = computed(() => props.text.split(' '))

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp() as any
  if (!$gsap || !containerRef.value) return

  const wordEls = containerRef.value.querySelectorAll('.scroll-word')

  // Each word's opacity is tied to scroll progress
  wordEls.forEach((word: Element, i: number) => {
    const start = i / wordEls.length
    const end = start + 1 / wordEls.length

    $gsap.to(word, {
      color: 'var(--ink)',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true,
      },
      // Stagger by calculating individual progress thresholds
      keyframes: {
        '0%': { color: 'var(--ink-ghost)' },
        [`${start * 100}%`]: { color: 'var(--ink-ghost)' },
        [`${end * 100}%`]: { color: 'var(--ink)' },
        '100%': { color: 'var(--ink)' },
      },
    })
  })

  // Simpler approach — batch stagger with scrub
  $gsap.fromTo(wordEls,
    { opacity: 0.15 },
    {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 1,
      },
    }
  )
})
</script>

<template>
  <component :is="tag" ref="containerRef" class="scroll-text" :aria-label="text">
    <span
      v-for="(word, i) in words"
      :key="i"
      class="scroll-word"
    >{{ word }}&nbsp;</span>
  </component>
</template>

<style scoped>
.scroll-text {
  max-width: none;
  line-height: 1.75;
}

.scroll-word {
  display: inline;
  opacity: 0.15;
  transition: opacity 0.1s ease;
  will-change: opacity;
}
</style>
