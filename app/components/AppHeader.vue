<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)

const links = [
  { to: '/work', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

watch(() => route.path, () => { menuOpen.value = false })
</script>

<template>
  <header class="masthead">
    <div class="container">
      <!-- Top bar -->
      <div class="masthead__top">
        <span class="dateline">{{ today }}</span>
        <nav class="masthead__nav" aria-label="Main navigation">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="masthead__link"
            :class="{ 'masthead__link--active': route.path === link.to }"
            data-cursor
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <NuxtLink to="/contact" class="masthead__cta" data-cursor>
          Enquiries
        </NuxtLink>
      </div>

      <hr class="rule rule--double" />

      <!-- Masthead name -->
      <div class="masthead__title">
        <NuxtLink to="/" class="masthead__name" data-cursor>
          Brian Lapinski
        </NuxtLink>
        <p class="masthead__subtitle">Artist &middot; Builder &middot; Engineer</p>
      </div>

      <hr class="rule rule--thick" />

      <!-- Mobile toggle -->
      <button
        class="masthead__toggle"
        :aria-expanded="menuOpen"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
        data-cursor
      >
        Menu
      </button>
    </div>

    <!-- Mobile overlay -->
    <Transition name="overlay">
      <div v-if="menuOpen" class="masthead__overlay">
        <nav class="masthead__overlay-nav container">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="masthead__overlay-link"
            data-cursor
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.masthead {
  padding-top: var(--space-4);
  position: relative;
  z-index: 100;
}

.masthead__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--space-3);
}

.masthead__nav {
  display: flex;
  gap: var(--space-6);
}

.masthead__link {
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-faded);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.masthead__link:hover,
.masthead__link--active {
  color: var(--ink);
}

.masthead__cta {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink);
  text-decoration: none;
}

.masthead__title {
  text-align: center;
  padding: var(--space-6) 0;
}

.masthead__name {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 5rem);
  color: var(--ink);
  text-decoration: none;
  letter-spacing: -0.02em;
  line-height: 1;
}

.masthead__subtitle {
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--ink-faded);
  margin-top: var(--space-2);
  max-width: none;
}

.masthead__toggle {
  display: none;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: none;
  border: none;
  color: var(--ink);
  cursor: none;
  padding: var(--space-2) 0;
}

/* Mobile overlay */
.masthead__overlay {
  position: fixed;
  inset: 0;
  background: var(--paper);
  z-index: 99;
  display: flex;
  align-items: center;
}

.masthead__overlay-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.masthead__overlay-link {
  font-family: var(--font-display);
  font-size: 3rem;
  color: var(--ink);
  text-decoration: none;
  line-height: 1.1;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s var(--ease-in-out);
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .masthead__nav,
  .masthead__cta {
    display: none;
  }
  .masthead__toggle {
    display: block;
  }
}
</style>
