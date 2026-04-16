<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import heroVert from '~/shaders/hero.vert?raw'
import heroFrag from '~/shaders/hero.frag?raw'

const canvas = ref<HTMLCanvasElement | null>(null)

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let material: THREE.ShaderMaterial
let animationId: number
const mouse = new THREE.Vector2(0.5, 0.5)

function onMouseMove(e: MouseEvent) {
  mouse.x = e.clientX / window.innerWidth
  mouse.y = 1.0 - e.clientY / window.innerHeight
}

function onResize() {
  if (!canvas.value || !renderer) return
  const w = canvas.value.clientWidth
  const h = canvas.value.clientHeight
  renderer.setSize(w, h)
  material.uniforms.uResolution.value.set(w, h)
}

onMounted(() => {
  if (!canvas.value) return

  const w = canvas.value.clientWidth
  const h = canvas.value.clientHeight

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: false,
    alpha: false,
  })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  material = new THREE.ShaderMaterial({
    vertexShader: heroVert,
    fragmentShader: heroFrag,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(w, h) },
    },
  })

  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const clock = new THREE.Clock()

  function animate() {
    animationId = requestAnimationFrame(animate)
    material.uniforms.uTime.value = clock.getElapsedTime()
    material.uniforms.uMouse.value.lerp(mouse, 0.05)
    renderer.render(scene, camera)
  }
  animate()

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas ref="canvas" class="shader-hero" aria-hidden="true" />
</template>

<style scoped>
.shader-hero {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
