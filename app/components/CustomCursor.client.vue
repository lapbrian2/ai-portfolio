<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorEl = ref<HTMLElement | null>(null)
const visible = ref(false)
const hovering = ref(false)
const hoverText = ref('')

let x = -100
let y = -100
let renderX = -100
let renderY = -100
let rafId: number

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

function animate() {
  renderX += (x - renderX) * 0.15
  renderY += (y - renderY) * 0.15
  if (cursorEl.value) {
    cursorEl.value.style.transform = `translate(${renderX}px, ${renderY}px)`
  }
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  if ('ontouchstart' in window) return

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', () => { visible.value = false })

  const wire = () => {
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })
  }
  wire()
  new MutationObserver(() => setTimeout(wire, 150)).observe(document.body, { childList: true, subtree: true })

  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    ref="cursorEl"
    class="cur"
    :class="{ 'cur--vis': visible, 'cur--hov': hovering }"
    aria-hidden="true"
  >
    <div class="cur__dot" />
    <div class="cur__ring" />
    <div class="cur__handle" />
    <span v-if="hoverText" class="cur__text">{{ hoverText }}</span>
  </div>
</template>

<style scoped>
.cur {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10000;
  opacity: 0;
  will-change: transform;
}

.cur--vis { opacity: 1; }

/* Default: small ink dot */
.cur__dot {
  width: 5px;
  height: 5px;
  margin: -2.5px 0 0 -2.5px;
  background: var(--ink);
  border-radius: 50%;
  transition: opacity 0.25s ease;
}

.cur--hov .cur__dot { opacity: 0; }

/* Hover: magnifying glass ring */
.cur__ring {
  position: absolute;
  top: -24px;
  left: -24px;
  width: 48px;
  height: 48px;
  border: 1.5px solid var(--ink);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cur--hov .cur__ring {
  opacity: 0.7;
  transform: scale(1);
}

/* Handle */
.cur__handle {
  position: absolute;
  top: 18px;
  left: 18px;
  width: 16px;
  height: 1.5px;
  background: var(--ink);
  opacity: 0;
  transform: rotate(45deg) scaleX(0);
  transform-origin: left;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
}

.cur--hov .cur__handle {
  opacity: 0.5;
  transform: rotate(45deg) scaleX(1);
}

/* Label */
.cur__text {
  position: absolute;
  top: -24px;
  left: -24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.375rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink);
  opacity: 0;
  transition: opacity 0.2s ease 0.15s;
}

.cur--hov .cur__text { opacity: 1; }

@media (hover: none), (pointer: coarse) {
  .cur { display: none; }
}
</style>
