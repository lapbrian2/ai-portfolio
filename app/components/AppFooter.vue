<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- Printing press illustration -->
      <figure class="footer__press scroll-scale">
        <img src="/images/printing-press.png" alt="Pressman watching the letterpress run" class="img-hover" loading="lazy" />
        <figcaption class="footer__press-caption">
          (Staff Illustration) &mdash; The presses run late into the evening at The Lapinski Record.
        </figcaption>
      </figure>

      <hr class="rule rule--thick mt-8" />

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
            <a href="https://www.linkedin.com/in/brian-lapinski-a65238352" target="_blank" rel="noopener noreferrer" data-cursor>LinkedIn</a>
            <a href="https://www.instagram.com/brian_lapinski1/" target="_blank" rel="noopener noreferrer" data-cursor>Instagram</a>
          </nav>
        </div>
      </div>

      <hr class="rule mt-8" />

      <div class="footer__bottom mt-4">
        <span class="dateline">&copy; {{ year }} The Lapinski Record. All rights reserved.</span>
        <span class="dateline">Drums, Pennsylvania</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--space-16) 0 var(--space-8);
}

.footer__press {
  margin: 0;
  max-width: 700px;
}

.footer__press img {
  width: 100%;
  display: block;
  border: 1px solid var(--rule-light);
}

.footer__press-caption {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--ink-faded);
  padding: var(--space-2) 0;
  font-style: italic;
  max-width: none;
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
  font-size: 0.8125rem;
  max-width: 35ch;
}

.footer__nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer__nav a {
  font-size: 0.75rem;
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
