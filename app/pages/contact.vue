<script setup lang="ts">
useHead({ title: 'Contact — The Brian Lapinski Record' })
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <h4 class="section-head">Letters to the Editor</h4>
        <div class="grid grid--sidebar mt-8">
          <div>
            <h2 class="ink-bleed">Send an Enquiry</h2>
            <ScrollRevealText
              class="deck mt-6"
              text="Have a project in mind? Need a creative partner? Want to collaborate on something interesting? I respond to every message within 24 hours."
            />
            <div class="contact-info mt-12">
              <h4 class="section-head">Direct Contact</h4>
              <p class="mt-4"><a href="mailto:brian@lapinski.dev" data-cursor>brian@lapinski.dev</a></p>
              <p class="mt-2"><a href="https://www.linkedin.com/in/brian-lapinski-a65238352" target="_blank" rel="noopener noreferrer" data-cursor>LinkedIn</a></p>
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
.deck {
  font-size: 1.0625rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--ink-light);
  max-width: 45ch;
}

.contact-info a {
  font-size: 0.875rem;
  color: var(--ink);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.contact-info a:hover {
  color: var(--red);
}
</style>
