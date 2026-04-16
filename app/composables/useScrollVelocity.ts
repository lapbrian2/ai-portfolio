import { onMounted, onUnmounted } from 'vue'

/**
 * Applies subtle skew/stretch to elements based on scroll velocity.
 * Fast scroll = text skews slightly, giving a kinetic newspaper feel.
 * Uses GSAP ticker for smooth interpolation.
 */
export function useScrollVelocity(selector: string = 'h1, h2, h3') {
  let ctx: any

  onMounted(() => {
    const { $gsap, $ScrollTrigger } = useNuxtApp() as any
    if (!$gsap) return

    let currentSkew = 0
    let targetSkew = 0

    const st = $ScrollTrigger.create({
      onUpdate: (self: any) => {
        const velocity = self.getVelocity()
        // Clamp velocity and map to a subtle skew angle (-2 to 2 degrees)
        targetSkew = $gsap.utils.clamp(-2, 2, velocity / 600)
      },
    })

    const elements = document.querySelectorAll(selector)

    $gsap.ticker.add(() => {
      // Smooth interpolation toward target
      currentSkew += (targetSkew - currentSkew) * 0.08
      // Decay target back to 0
      targetSkew *= 0.95

      if (Math.abs(currentSkew) > 0.01) {
        elements.forEach((el: Element) => {
          ;(el as HTMLElement).style.transform = `skewY(${currentSkew}deg)`
        })
      }
    })

    ctx = { st, elements }
  })

  onUnmounted(() => {
    if (ctx?.st) ctx.st.kill()
    if (ctx?.elements) {
      ctx.elements.forEach((el: Element) => {
        ;(el as HTMLElement).style.transform = ''
      })
    }
  })
}
