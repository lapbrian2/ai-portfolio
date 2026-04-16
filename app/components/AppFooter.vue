<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <hr class="rule rule--thick" />

      <div class="footer__grid mt-8">
        <div>
          <h4 class="section-head">Enquiries</h4>
          <p class="footer__text mt-4">
            For project enquiries, contracts, or collaborations.
          </p>
          <NuxtLink to="/contact" class="link-arrow mt-4" data-cursor>
            Send an enquiry
          </NuxtLink>
        </div>

        <div class="col-ruled">
          <h4 class="section-head">Navigation</h4>
          <nav class="footer__nav mt-4">
            <NuxtLink to="/work" data-cursor>Projects</NuxtLink>
            <NuxtLink to="/services" data-cursor>Services</NuxtLink>
            <NuxtLink to="/about" data-cursor>About</NuxtLink>
            <NuxtLink to="/contact" data-cursor>Contact</NuxtLink>
          </nav>
        </div>

        <div class="col-ruled">
          <h4 class="section-head">Elsewhere</h4>
          <nav class="footer__nav mt-4">
            <a href="https://github.com/lapbrian2" target="_blank" rel="noopener noreferrer" data-cursor>GitHub</a>
            <a href="https://linkedin.com/in/brian-lapinski" target="_blank" rel="noopener noreferrer" data-cursor>LinkedIn</a>
            <a href="#" data-cursor>Substack</a>
            <a href="#" data-cursor>Gumroad</a>
          </nav>
        </div>
      </div>

      <hr class="rule mt-12" />

      <div class="footer__bottom mt-4">
        <span class="dateline">&copy; {{ year }} Brian Lapinski. All rights reserved.</span>
        <span class="dateline">Toronto, Canada</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--space-16) 0 var(--space-8);
}

.footer__grid {
  display: grid;
  gap: var(--gutter);
}

@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

.footer__text {
  font-size: 0.875rem;
  max-width: 35ch;
}

.footer__nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer__nav a {
  font-size: 0.8125rem;
  color: var(--ink-faded);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__nav a:hover {
  color: var(--ink);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
}
</style>
