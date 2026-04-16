<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)
const hovering = ref(false)
const hoverText = ref('')
let targetX = 0
let targetY = 0
let rafId: number

function onMouseMove(e: MouseEvent) {
  targetX = e.clientX
  targetY = e.clientY
}

function onMouseEnterLink(e: Event) {
  const el = e.target as HTMLElement
  hovering.value = true
  hoverText.value = el.dataset.cursorText || ''
}

function onMouseLeaveLink() {
  hovering.value = false
  hoverText.value = ''
}

function animate() {
  // Lerp for smooth follow
  x.value += (targetX - x.value) * 0.15
  y.value += (targetY - y.value) * 0.15
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  // Only show on non-touch devices
  if ('ontouchstart' in window) return

  document.addEventListener('mousemove', onMouseMove)

  // Attach hover listeners to all interactive elements
  const addHoverListeners = () => {
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })
  }

  addHoverListeners()

  // Re-attach on route changes (MutationObserver)
  const observer = new MutationObserver(() => {
    setTimeout(addHoverListeners, 100)
  })
  observer.observe(document.body, { childList: true, subtree: true })

  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  document.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div
    class="cursor"
    :class="{ 'cursor--hover': hovering }"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
    aria-hidden="true"
  >
    <span v-if="hoverText" class="cursor__text">{{ hoverText }}</span>
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  top: -8px;
  left: -8px;
  width: var(--cursor-size);
  height: var(--cursor-size);
  background: var(--text-primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  transition: width 0.3s var(--ease-out),
              height 0.3s var(--ease-out),
              top 0.3s var(--ease-out),
              left 0.3s var(--ease-out);
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cursor--hover {
  width: 64px;
  height: 64px;
  top: -32px;
  left: -32px;
  background: var(--accent);
  mix-blend-mode: normal;
}

.cursor__text {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
}

.cursor--hover .cursor__text {
  opacity: 1;
}

@media (hover: none), (pointer: coarse) {
  .cursor { display: none; }
}
</style>
