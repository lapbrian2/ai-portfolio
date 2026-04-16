import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  const { $lenis } = useNuxtApp()
  if ($lenis) {
    ;($lenis as any).on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time: number) => {
      ;($lenis as any).raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }

  return {
    provide: { gsap, ScrollTrigger },
  }
})
