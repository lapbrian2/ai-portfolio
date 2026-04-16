import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Split text into characters and animate them in on scroll.
 * Wraps each char in a <span class="char"> inside an overflow:hidden container.
 */
export function useTextReveal(
  target: Ref<HTMLElement | null>,
  options: {
    stagger?: number
    duration?: number
    y?: string
    delay?: number
    start?: string
  } = {}
) {
  const {
    stagger = 0.02,
    duration = 0.9,
    y = '105%',
    delay = 0,
    start = 'top 85%',
  } = options

  let ctx: any

  onMounted(() => {
    const { $gsap, $ScrollTrigger } = useNuxtApp() as any
    if (!$gsap || !target.value) return

    const el = target.value
    const text = el.textContent || ''

    // Split into chars, wrap in spans
    el.innerHTML = text
      .split('')
      .map(char =>
        char === ' '
          ? '<span class="char">&nbsp;</span>'
          : `<span class="char">${char}</span>`
      )
      .join('')

    el.style.overflow = 'hidden'

    const chars = el.querySelectorAll('.char')

    ctx = $gsap.context(() => {
      $gsap.from(chars, {
        y,
        duration,
        delay,
        stagger,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
