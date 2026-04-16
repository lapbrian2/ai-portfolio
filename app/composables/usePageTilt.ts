/**
 * Subtle page tilt on mouse movement — like holding a newspaper.
 * The entire page container rotates slightly based on cursor position.
 * Max rotation: 0.3 degrees. Barely perceptible but adds physical depth.
 */
export function usePageTilt(selector: string = '.newspaper__page') {
  onMounted(() => {
    const { $gsap } = useNuxtApp() as any
    if (!$gsap) return

    const el = document.querySelector(selector) as HTMLElement
    if (!el) return

    // Only on desktop with hover capability
    if (window.matchMedia('(hover: none)').matches) return

    el.style.transformStyle = 'preserve-3d'
    el.style.perspective = '2000px'

    let targetRotateX = 0
    let targetRotateY = 0
    let currentRotateX = 0
    let currentRotateY = 0

    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2  // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2

      targetRotateX = y * -0.2  // tilt away from cursor vertically
      targetRotateY = x * 0.3   // tilt toward cursor horizontally
    })

    $gsap.ticker.add(() => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.05
      currentRotateY += (targetRotateY - currentRotateY) * 0.05

      if (Math.abs(currentRotateX) > 0.001 || Math.abs(currentRotateY) > 0.001) {
        el.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`
      }
    })
  })
}
