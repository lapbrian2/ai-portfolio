<script setup lang="ts">
const year = new Date().getFullYear()

const socialLinks = [
  { href: 'https://github.com/lapbrian2', label: 'GitHub' },
  { href: 'https://linkedin.com/in/brian-lapinski', label: 'LinkedIn' },
  { href: '#', label: 'Substack' },
  { href: '#', label: 'Gumroad' },
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div>
          <p class="footer__heading">Let's build something</p>
          <NuxtLink to="/contact" class="link-arrow mt-6">Get in touch</NuxtLink>
        </div>
      </div>

      <div class="divider mt-16" />

      <div class="footer__bottom mt-8">
        <p class="footer__copy">&copy; {{ year }} Brian Lapinski</p>
        <nav class="footer__links" aria-label="Social links">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            class="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--space-32) 0 var(--space-12);
  border-top: 1px solid var(--border);
}

.footer__heading {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  max-width: none;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.footer__copy {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.footer__links {
  display: flex;
  gap: var(--space-6);
}

.footer__link {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__link:hover {
  color: var(--text-primary);
}
</style>
