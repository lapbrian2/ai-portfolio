<script setup lang="ts">
useHead({ title: 'Contact — Brian Lapinski' })
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div>
            <p class="overline mb-4">Contact</p>
            <h1>Let's talk</h1>
            <p class="mt-6 text-secondary contact-desc">
              Have a project in mind? Need an AI engineer? Just want to say hello?
              I'll get back to you within 24 hours.
            </p>
            <div class="contact-info mt-12">
              <p class="overline mb-4">Or reach me directly</p>
              <p><a href="mailto:brian@lapinski.dev">brian@lapinski.dev</a></p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-desc {
  font-size: 1.0625rem;
  max-width: 45ch;
}

.contact-grid {
  display: grid;
  gap: var(--space-16);
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
</style>
