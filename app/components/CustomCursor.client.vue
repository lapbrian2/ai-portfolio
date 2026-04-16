<script setup lang="ts">
/**
 * Magnifying glass cursor — actually magnifies the paper texture.
 * Samples from the shader canvas at cursor position, renders at 2x in a lens.
 * The glass has a rim, handle, and subtle lens distortion.
 */
import { ref, onMounted, onUnmounted } from 'vue'

const cursorEl = ref<HTMLElement | null>(null)
const lensCanvas = ref<HTMLCanvasElement | null>(null)
const visible = ref(false)
const hovering = ref(false)
const hoverText = ref('')

let x = -200
let y = -200
let renderX = -200
let renderY = -200
let rafId: number
let shaderCanvas: HTMLCanvasElement | null = null

const LENS_SIZE = 80
const ZOOM = 2.5

function onMouseMove(e: MouseEvent) {
  x = e.clientX
  y = e.clientY
  if (!visible.value) visible.value = true
}

function onMouseEnterLink(e: Event) {
  hovering.value = true
  const el = e.target as HTMLElement
  hoverText.value = el.dataset.cursorText || ''
}

function onMouseLeaveLink() {
  hovering.value = false
  hoverText.value = ''
}

function onMouseLeaveWindow() {
  visible.value = false
}

function animate() {
  // Smooth follow
  renderX += (x - renderX) * 0.12
  renderY += (y - renderY) * 0.12

  if (cursorEl.value) {
    cursorEl.value.style.transform = `translate(${renderX}px, ${renderY}px)`
  }

  // Sample shader canvas and draw magnified into lens
  if (lensCanvas.value && shaderCanvas && hovering.value) {
    const ctx = lensCanvas.value.getContext('2d')
    if (ctx) {
      const dpr = window.devicePixelRatio || 1
      const sourceSize = LENS_SIZE / ZOOM

      // Source coordinates on the shader canvas (in canvas pixel space)
      const sx = (renderX / window.innerWidth) * shaderCanvas.width - (sourceSize * dpr) / 2
      const sy = ((window.innerHeight - renderY) / window.innerHeight) * shaderCanvas.height - (sourceSize * dpr) / 2

      ctx.clearRect(0, 0, LENS_SIZE * dpr, LENS_SIZE * dpr)

      try {
        ctx.drawImage(
          shaderCanvas,
          Math.max(0, sx), Math.max(0, sy),
          sourceSize * dpr, sourceSize * dpr,
          0, 0,
          LENS_SIZE * dpr, LENS_SIZE * dpr
        )
      } catch {
        // Canvas tainted or not ready — fail silently
      }
    }
  }

  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  if ('ontouchstart' in window) return

  // Find the shader canvas
  shaderCanvas = document.querySelector('.paper-texture') as HTMLCanvasElement

  // Setup lens canvas resolution
  if (lensCanvas.value) {
    const dpr = window.devicePixelRatio || 1
    lensCanvas.value.width = LENS_SIZE * dpr
    lensCanvas.value.height = LENS_SIZE * dpr
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeaveWindow)

  const addHoverListeners = () => {
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })
  }
  addHoverListeners()

  const observer = new MutationObserver(() => setTimeout(addHoverListeners, 150))
  observer.observe(document.body, { childList: true, subtree: true })

  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeaveWindow)
})
</script>

<template>
  <div
    ref="cursorEl"
    class="mag"
    :class="{
      'mag--visible': visible,
      'mag--hover': hovering,
    }"
    aria-hidden="true"
  >
    <!-- Default: small ink dot -->
    <div class="mag__dot" />

    <!-- Hover: magnifying glass -->
    <div class="mag__glass">
      <!-- Lens with magnified paper texture -->
      <canvas
        ref="lensCanvas"
        class="mag__lens-canvas"
        :width="80"
        :height="80"
      />
      <!-- Glass reflection -->
      <div class="mag__reflection" />
      <!-- Glass rim -->
      <div class="mag__rim" />
      <!-- Label text inside lens -->
      <span v-if="hoverText" class="mag__text">{{ hoverText }}</span>
    </div>

    <!-- Handle -->
    <div class="mag__handle" />
  </div>
</template>

<style scoped>
.mag {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10000;
  opacity: 0;
  will-change: transform;
}

.mag--visible {
  opacity: 1;
}

/* Default dot */
.mag__dot {
  width: 6px;
  height: 6px;
  margin-left: -3px;
  margin-top: -3px;
  background: var(--ink);
  border-radius: 50%;
  transition: opacity 0.3s ease;
}

.mag--hover .mag__dot {
  opacity: 0;
}

/* Glass container */
.mag__glass {
  position: absolute;
  top: -40px;
  left: -40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.3);
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.mag--hover .mag__glass {
  opacity: 1;
  transform: scale(1);
}

/* Canvas showing magnified paper */
.mag__lens-canvas {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  image-rendering: auto;
}

/* Subtle glass reflection overlay */
.mag__reflection {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 40%,
    transparent 60%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

/* Glass rim */
.mag__rim {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 2px solid var(--ink);
  opacity: 0.6;
}

/* Handle */
.mag__handle {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 28px;
  height: 2px;
  background: var(--ink);
  opacity: 0;
  transform: rotate(45deg) scaleX(0);
  transform-origin: left center;
  transition: opacity 0.3s ease 0.1s,
              transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
}

.mag--hover .mag__handle {
  opacity: 0.6;
  transform: rotate(45deg) scaleX(1);
}

/* Label text */
.mag__text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.4375rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink);
  opacity: 0;
  transition: opacity 0.2s ease 0.2s;
  text-shadow: 0 0 4px var(--paper);
}

.mag--hover .mag__text {
  opacity: 1;
}

@media (hover: none), (pointer: coarse) {
  .mag { display: none; }
}
</style>
