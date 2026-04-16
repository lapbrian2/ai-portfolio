<script setup lang="ts">
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

  $gsap.fromTo(wordEls,
    { opacity: 0.15 },
    {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 75%',
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
    >{{ word }} </span>
  </component>
</template>

<style scoped>
.scroll-text {
  line-height: 1.75;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.scroll-word {
  opacity: 0.15;
  will-change: opacity;
}
</style>
