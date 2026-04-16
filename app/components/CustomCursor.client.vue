<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(-100)
const y = ref(-100)
const hovering = ref(false)
const hoverText = ref('')
const visible = ref(false)
let targetX = -100
let targetY = -100
let rafId: number

function onMouseMove(e: MouseEvent) {
  targetX = e.clientX
  targetY = e.clientY
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
  x.value += (targetX - x.value) * 0.15
  y.value += (targetY - y.value) * 0.15
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  if ('ontouchstart' in window) return

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeaveWindow)

  const addHoverListeners = () => {
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })
  }

  addHoverListeners()

  const observer = new MutationObserver(() => {
    setTimeout(addHoverListeners, 150)
  })
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
    class="cursor"
    :class="{
      'cursor--hover': hovering,
      'cursor--visible': visible,
    }"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
    aria-hidden="true"
  >
    <!-- Magnifying glass lens effect -->
    <div class="cursor__lens" />
    <!-- Glass handle -->
    <div v-if="hovering" class="cursor__handle" />
    <!-- Label text -->
    <span v-if="hoverText" class="cursor__text">{{ hoverText }}</span>
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10000;
  opacity: 0;
  will-change: transform;
}

.cursor--visible {
  opacity: 1;
}

/* Default: tiny ink dot */
.cursor__lens {
  width: 6px;
  height: 6px;
  margin-left: -3px;
  margin-top: -3px;
  background: var(--ink);
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Hover: magnifying glass lens */
.cursor--hover .cursor__lens {
  width: 48px;
  height: 48px;
  margin-left: -24px;
  margin-top: -24px;
  background: transparent;
  border: 1.5px solid var(--ink);
  backdrop-filter: brightness(1.08) contrast(1.05);
  -webkit-backdrop-filter: brightness(1.08) contrast(1.05);
  box-shadow:
    inset 0 0 12px rgba(255, 255, 255, 0.15),
    inset 0 0 4px rgba(255, 255, 255, 0.1),
    0 2px 8px rgba(26, 23, 20, 0.1);
}

/* Handle — angled line from the lens */
.cursor__handle {
  position: absolute;
  bottom: -14px;
  right: -10px;
  width: 18px;
  height: 1.5px;
  background: var(--ink);
  transform: rotate(45deg);
  transform-origin: left center;
  animation: handleAppear 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes handleAppear {
  from { transform: rotate(45deg) scaleX(0); }
  to { transform: rotate(45deg) scaleX(1); }
}

/* Label */
.cursor__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-mono);
  font-size: 0.375rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease 0.15s;
}

.cursor--hover .cursor__text {
  opacity: 1;
}

@media (hover: none), (pointer: coarse) {
  .cursor { display: none; }
}
</style>
