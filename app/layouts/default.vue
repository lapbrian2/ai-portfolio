<template>
  <div class="newspaper">
    <ShaderHero />
    <NewspaperTexture />
    <div class="scroll-progress" />
    <div class="newspaper__content">
      <NewsTicker />
      <AppHeader />
      <main>
        <slot />
      </main>
      <AppFooter />
    </div>
    <PageTransition />
  </div>
</template>

<style scoped>
.newspaper__content {
  position: relative;
  z-index: 3;
}
</style>
