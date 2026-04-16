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
  x.value += (targetX - x.value) * 0.12
  y.value += (targetY - y.value) * 0.12
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
    <span v-if="hoverText" class="cursor__text">{{ hoverText }}</span>
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  margin-top: -5px;
  background: var(--ink);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  opacity: 0;
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              margin 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.25s ease,
              opacity 0.3s ease;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cursor--visible {
  opacity: 1;
}

.cursor--hover {
  width: 56px;
  height: 56px;
  margin-left: -28px;
  margin-top: -28px;
  background: var(--red);
}

.cursor__text {
  font-family: var(--font-mono);
  font-size: 0.4375rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease 0.1s;
}

.cursor--hover .cursor__text {
  opacity: 1;
}

@media (hover: none), (pointer: coarse) {
  .cursor { display: none; }
}
</style>
