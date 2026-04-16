<template>
  <div class="ornamental-rule" aria-hidden="true">
    <span class="ornamental-rule__wing">&mdash;&mdash;&mdash;</span>
    <span class="ornamental-rule__center">&diams;</span>
    <span class="ornamental-rule__wing">&mdash;&mdash;&mdash;</span>
  </div>
</template>

<style scoped>
.ornamental-rule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-6) 0;
  color: var(--ink-ghost);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
}

.ornamental-rule__center {
  font-size: 0.5rem;
}
</style>
