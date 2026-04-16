<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import transVert from '~/shaders/transition.vert?raw'
import transFrag from '~/shaders/transition.frag?raw'

const route = useRoute()
const canvas = ref<HTMLCanvasElement | null>(null)
const active = ref(false)

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let material: THREE.ShaderMaterial
let rafId: number

onMounted(() => {
  if (!canvas.value) return

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: false,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  material = new THREE.ShaderMaterial({
    vertexShader: transVert,
    fragmentShader: transFrag,
    transparent: true,
    uniforms: {
      uProgress: { value: 0 },
    },
  })

  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material))

  function render() {
    if (active.value) {
      renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(render)
  }
  render()

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  renderer?.dispose()
})

// Trigger ink-wash transition on route change
watch(() => route.path, () => {
  if (!material) return
  const { $gsap } = useNuxtApp() as any
  if (!$gsap) return

  active.value = true

  // Ink washes in
  $gsap.fromTo(material.uniforms.uProgress,
    { value: 0 },
    {
      value: 1.2,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        // Ink washes out
        $gsap.fromTo(material.uniforms.uProgress,
          { value: 1.2 },
          {
            value: 0,
            duration: 0.7,
            ease: 'power2.inOut',
            delay: 0.15,
            onComplete: () => {
              active.value = false
            },
          }
        )
      },
    }
  )
})
</script>

<template>
  <canvas
    ref="canvas"
    class="page-transition"
    :class="{ 'page-transition--active': active }"
    aria-hidden="true"
  />
</template>

<style scoped>
.page-transition {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s;
}

.page-transition--active {
  opacity: 1;
}
</style>
