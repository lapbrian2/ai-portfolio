<script setup lang="ts">
useHead({ title: 'Letters to the Editor — The Lapinski Record' })
</script>

<template>
  <div>
    <!-- Mail room illustration -->
    <section style="padding: var(--space-8) 0 0;">
      <div class="container">
        <figure class="mailroom entrance--image">
          <img src="/images/practice-1.png" alt="The mail room — letters piled high" class="img-hover" loading="eager" />
          <figcaption class="mailroom__caption">
            (Staff Illustration) &mdash; The letters desk at The Lapinski Record. Your correspondence is sorted and answered within 24 hours.
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h4 class="section-head">Letters to the Editor</h4>
        <div class="grid grid--sidebar mt-8">
          <div>
            <h2 class="ink-bleed">Write to Us</h2>
            <ScrollRevealText
              class="deck mt-6"
              text="Have a project in mind? Need a creative partner? Want to collaborate on something interesting? Every letter is read. Every message receives a reply within 24 hours. Your correspondent awaits."
            />
            <div class="contact-info mt-12">
              <h4 class="section-head">Direct Wire</h4>
              <p class="mt-4"><a href="mailto:brian@lapinski.dev" data-cursor>brian@lapinski.dev</a></p>
              <p class="mt-2"><a href="https://www.linkedin.com/in/brian-lapinski-a65238352" target="_blank" rel="noopener noreferrer" data-cursor>LinkedIn</a></p>
              <p class="mt-2"><a href="https://www.instagram.com/brian_lapinski1/" target="_blank" rel="noopener noreferrer" data-cursor>Instagram</a></p>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.mailroom {
  margin: 0;
  max-width: 700px;
}

.mailroom img {
  width: 100%;
  display: block;
  border: 1px solid var(--rule-light);
}

.mailroom__caption {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--ink-faded);
  padding: var(--space-2) 0;
  font-style: italic;
  max-width: none;
}

.deck {
  font-size: 1rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--ink-faded);
  max-width: 50ch;
}

.contact-info a {
  font-size: 0.875rem;
  color: var(--ink);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.contact-info a:hover {
  color: var(--red-bright);
}
</style>
