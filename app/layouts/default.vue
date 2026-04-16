<template>
  <div class="newspaper">
    <ShaderHero />
    <NewspaperTexture />
    <div class="scroll-progress" />
    <div class="newspaper__page">
      <div class="newspaper__content">
        <InkSpots />
        <NewsTicker />
        <AppHeader />
        <main>
          <slot />
        </main>
        <AppFooter />
      </div>
    </div>
    <PageTransition />
  </div>
</template>

<style scoped>
/* The page sits on a surface — like a real newspaper on a desk */
.newspaper__page {
  position: relative;
  z-index: 3;
  max-width: 1400px;
  margin: 0 auto;
  background: var(--paper);
  box-shadow:
    0 0 0 1px rgba(26, 23, 20, 0.06),
    4px 4px 0 rgba(26, 23, 20, 0.04),
    8px 8px 20px rgba(26, 23, 20, 0.08),
    16px 16px 40px rgba(26, 23, 20, 0.06);
}

/* Desktop: visible page edges */
@media (min-width: 1440px) {
  .newspaper__page {
    margin-top: var(--space-8);
    margin-bottom: var(--space-8);
  }
}

.newspaper__content {
  position: relative;
  overflow: hidden;
}
</style>
