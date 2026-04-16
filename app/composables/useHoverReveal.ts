import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Reveals an image when hovering over story headlines.
 * Image follows cursor vertically, fades/scales in on enter.
 * Classic award-winning portfolio pattern (Dorian Lods, Robin Noguier).
 */
export function useHoverReveal(
  container: Ref<HTMLElement | null>,
  imageEl: Ref<HTMLElement | null>
) {
  let handleEnter: ((e: MouseEvent) => void) | null = null
  let handleMove: ((e: MouseEvent) => void) | null = null
  let handleLeave: (() => void) | null = null

  onMounted(() => {
    const { $gsap } = useNuxtApp() as any
    if (!$gsap || !container.value || !imageEl.value) return

    const img = imageEl.value

    // Start hidden
    $gsap.set(img, {
      opacity: 0,
      scale: 0.9,
      display: 'none',
    })

    handleEnter = (e: MouseEvent) => {
      $gsap.to(img, {
        opacity: 1,
        scale: 1,
        display: 'block',
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    handleMove = (e: MouseEvent) => {
      const rect = container.value!.getBoundingClientRect()
      const y = e.clientY - rect.top

      $gsap.to(img, {
        y: y - img.offsetHeight / 2,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    handleLeave = () => {
      $gsap.to(img, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          $gsap.set(img, { display: 'none' })
        },
      })
    }

    container.value.addEventListener('mouseenter', handleEnter)
    container.value.addEventListener('mousemove', handleMove)
    container.value.addEventListener('mouseleave', handleLeave)
  })

  onUnmounted(() => {
    if (container.value && handleEnter && handleMove && handleLeave) {
      container.value.removeEventListener('mouseenter', handleEnter)
      container.value.removeEventListener('mousemove', handleMove)
      container.value.removeEventListener('mouseleave', handleLeave)
    }
  })
}
