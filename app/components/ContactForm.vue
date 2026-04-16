<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  type: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function handleSubmit() {
  status.value = 'sending'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    })
    status.value = 'sent'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit" v-if="status !== 'sent'">
    <div class="form__group">
      <label for="name">Name</label>
      <input id="name" v-model="form.name" type="text" required autocomplete="name" placeholder="Your name" />
    </div>
    <div class="form__group">
      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" required autocomplete="email" placeholder="you@company.com" />
    </div>
    <div class="form__group">
      <label for="type">What do you need?</label>
      <select id="type" v-model="form.type" required>
        <option value="" disabled>Select one</option>
        <option value="ai">AI Engineering</option>
        <option value="web">Web Development</option>
        <option value="both">Both</option>
        <option value="other">Something else</option>
      </select>
    </div>
    <div class="form__group">
      <label for="message">Tell me about your project</label>
      <textarea id="message" v-model="form.message" rows="5" required placeholder="What are you building?"></textarea>
    </div>
    <button type="submit" class="btn btn--primary" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Sending...' : 'Send message' }}
    </button>
    <p v-if="status === 'error'" class="form__error mt-4">Something went wrong. Try emailing me directly.</p>
  </form>
  <div v-else class="form__success">
    <h3>Message sent</h3>
    <p class="mt-2 text-secondary">I'll get back to you within 24 hours.</p>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 500px;
}

.form__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form__group label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

.form__group input,
.form__group select,
.form__group textarea {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  padding: var(--space-4);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-primary);
  transition: border-color var(--duration-fast) var(--ease-out);
}

.form__group input::placeholder,
.form__group textarea::placeholder {
  color: var(--text-muted);
}

.form__group input:focus,
.form__group select:focus,
.form__group textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.form__group textarea {
  resize: vertical;
  min-height: 140px;
}

.form__group select {
  cursor: pointer;
}

.form__error {
  color: #EF4444;
  font-size: 0.8125rem;
}

.form__success {
  padding: var(--space-8);
  border: 1px solid var(--accent);
  background: var(--accent-glow);
}
</style>
