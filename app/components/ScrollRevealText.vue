<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string
  tag?: string
}>(), {
  tag: 'p',
})

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const { $gsap } = useNuxtApp() as any
  if (!$gsap || !el.value) return

  $gsap.from(el.value, {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el.value,
      start: 'top 80%',
      once: true,
    },
  })
})
</script>

<template>
  <component :is="tag" ref="el" :class="$attrs.class">
    {{ text }}
  </component>
</template>
