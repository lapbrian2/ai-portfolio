<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)

const links = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

watch(() => route.path, () => {
  menuOpen.value = false
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="header__inner container">
      <NuxtLink to="/" class="header__logo">
        Brian Lapinski
      </NuxtLink>

      <button
        class="header__toggle"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <span class="header__bar" :class="{ 'header__bar--open': menuOpen }" />
        <span class="header__bar" :class="{ 'header__bar--open': menuOpen }" />
      </button>

      <nav
        class="header__nav"
        :class="{ 'header__nav--open': menuOpen }"
        aria-label="Main navigation"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="header__link"
          :class="{ 'header__link--active': route.path === link.to }"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink to="/contact" class="header__cta">
          Hire me
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all var(--duration-base) var(--ease-out);
}

.header--scrolled {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-color: rgba(10, 10, 15, 0.8);
  border-bottom: 1px solid var(--border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.header__logo {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  text-decoration: none;
  text-transform: uppercase;
}

.header__toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

.header__bar {
  display: block;
  width: 22px;
  height: 1px;
  background: var(--text-primary);
  transition: all var(--duration-base) var(--ease-out);
}

.header__bar--open:first-child {
  transform: rotate(45deg) translateY(3.5px);
}

.header__bar--open:last-child {
  transform: rotate(-45deg) translateY(-3.5px);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.header__link {
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color var(--duration-fast) var(--ease-out);
}

.header__link:hover,
.header__link--active {
  color: var(--text-primary);
}

.header__cta {
  font-size: 0.8125rem;
  font-weight: 500;
  padding: var(--space-2) var(--space-6);
  border: 1px solid var(--border);
  color: var(--text-primary);
  text-decoration: none;
  transition: all var(--duration-base) var(--ease-out);
}

.header__cta:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 768px) {
  .header__toggle {
    display: flex;
  }

  .header__nav {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: var(--space-24) var(--space-8);
    background-color: var(--bg-elevated);
    border-left: 1px solid var(--border);
    transform: translateX(100%);
    transition: transform var(--duration-slow) var(--ease-out);
  }

  .header__nav--open {
    transform: translateX(0);
  }

  .header__link {
    font-size: 1.25rem;
    padding: var(--space-4) 0;
  }

  .header__cta {
    margin-top: var(--space-8);
  }
}
</style>
