<script setup lang="ts">
/**
 * Tongue-in-cheek "weather" box — actually shows project/availability status.
 * Classic newspaper sidebar element.
 */
</script>

<template>
  <div class="weather">
    <div class="weather__header">Today's Forecast</div>
    <div class="weather__body">
      <div class="weather__main">
        <span class="weather__icon">&#9728;</span>
        <div>
          <p class="weather__temp">Open</p>
          <p class="weather__desc">Clear skies for new projects</p>
        </div>
      </div>
      <div class="weather__details">
        <div class="weather__detail">
          <span class="weather__label">Availability</span>
          <span class="weather__value weather__value--good">Taking contracts</span>
        </div>
        <div class="weather__detail">
          <span class="weather__label">Response Time</span>
          <span class="weather__value">&lt; 24 hours</span>
        </div>
        <div class="weather__detail">
          <span class="weather__label">Current Load</span>
          <span class="weather__value">Light</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather {
  border: 2px solid var(--ink);
}

.weather__header {
  font-family: var(--font-body);
  font-size: 0.5625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-align: center;
  background: var(--ink);
  color: var(--paper);
  padding: var(--space-2) var(--space-4);
}

.weather__body {
  padding: var(--space-4);
}

.weather__main {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--rule-light);
}

.weather__icon {
  font-size: 1.75rem;
  line-height: 1;
}

.weather__temp {
  font-family: var(--font-display);
  font-size: 1.125rem;
  max-width: none;
  color: var(--ink);
}

.weather__desc {
  font-size: 0.625rem;
  color: var(--ink-faded);
  max-width: none;
  margin-top: 2px;
}

.weather__details {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

.weather__detail {
  display: flex;
  justify-content: space-between;
}

.weather__label {
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-ghost);
}

.weather__value {
  font-size: 0.625rem;
  color: var(--ink-light);
}

.weather__value--good {
  color: var(--red);
  font-weight: 600;
}
</style>
