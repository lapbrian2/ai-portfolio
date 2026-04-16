<template>
  <div class="newspaper">
    <ShaderHero />
    <div class="newspaper__content">
      <AppHeader />
      <main>
        <slot />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<style scoped>
.newspaper__content {
  position: relative;
  z-index: 1;
}
</style>
