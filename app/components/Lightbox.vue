<script setup lang="ts">
const visible = ref(false)
const currentSrc = ref('')
const currentAlt = ref('')
const currentCaption = ref('')

function open(src: string, alt: string, caption?: string) {
  currentSrc.value = src
  currentAlt.value = alt
  currentCaption.value = caption || ''
  visible.value = true
  document.body.style.overflow = 'hidden'
}

function close() {
  visible.value = false
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)

  // Listen for clicks on any .img-hover image
  document.addEventListener('click', (e) => {
    const img = (e.target as HTMLElement).closest('.img-hover') as HTMLImageElement
    if (!img) return
    const caption = img.closest('figure')?.querySelector('figcaption')?.textContent || ''
    open(img.src, img.alt, caption)
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lb">
      <div v-if="visible" class="lb" @click.self="close" data-cursor data-cursor-text="Close">
        <div class="lb__inner">
          <img :src="currentSrc" :alt="currentAlt" class="lb__img" />
          <p v-if="currentCaption" class="lb__caption">{{ currentCaption }}</p>
        </div>
        <button class="lb__close" @click="close" aria-label="Close lightbox" data-cursor>&times;</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: rgba(10, 8, 6, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  cursor: none;
}

.lb__inner {
  max-width: 900px;
  max-height: 85vh;
  position: relative;
}

.lb__img {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  object-fit: contain;
  /* Full color — no grayscale, no sepia */
  filter: none;
  border: 4px solid var(--paper);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lb__caption {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  color: var(--paper);
  opacity: 0.6;
  text-align: center;
  margin-top: var(--space-3);
  max-width: none;
  letter-spacing: 0.04em;
}

.lb__close {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  font-size: 2rem;
  color: var(--paper);
  opacity: 0.5;
  background: none;
  border: none;
  cursor: none;
  line-height: 1;
  transition: opacity 0.2s ease;
}

.lb__close:hover {
  opacity: 1;
}

/* Transition */
.lb-enter-active {
  transition: opacity 0.3s ease;
}
.lb-enter-active .lb__img {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s ease;
}
.lb-leave-active {
  transition: opacity 0.2s ease;
}

.lb-enter-from {
  opacity: 0;
}
.lb-enter-from .lb__img {
  opacity: 0;
  transform: scale(0.92);
}

.lb-leave-to {
  opacity: 0;
}
</style>
