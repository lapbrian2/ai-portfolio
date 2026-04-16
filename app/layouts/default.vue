<template>
  <div class="page-wrapper">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  padding-top: 64px;
}
</style>
