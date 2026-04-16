import { onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: {
    y?: number
    opacity?: number
    duration?: number
    delay?: number
    stagger?: number
  } = {}
) {
  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
  } = options

  let ctx: any

  onMounted(() => {
    const { $gsap, $ScrollTrigger } = useNuxtApp() as any
    if (!$gsap || !target.value) return

    const children = target.value.children.length > 1
      ? target.value.children
      : target.value

    ctx = $gsap.context(() => {
      $gsap.from(children, {
        y,
        opacity,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target.value,
          start: 'top 85%',
          once: true,
        },
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
