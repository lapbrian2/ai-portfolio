import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Make an element subtly follow the cursor when hovered.
 * Snaps back with an elastic ease on leave.
 */
export function useMagnetic(
  target: Ref<HTMLElement | null>,
  strength: number = 0.3
) {
  let handleMove: ((e: MouseEvent) => void) | null = null
  let handleLeave: (() => void) | null = null

  onMounted(() => {
    const { $gsap } = useNuxtApp() as any
    if (!$gsap || !target.value) return

    const el = target.value

    handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      $gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    handleLeave = () => {
      $gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
  })

  onUnmounted(() => {
    if (target.value && handleMove && handleLeave) {
      target.value.removeEventListener('mousemove', handleMove)
      target.value.removeEventListener('mouseleave', handleLeave)
    }
  })
}
