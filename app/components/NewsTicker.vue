<script setup lang="ts">
const headlines = [
  'BREAKING: AI agent orchestrates 46 skills autonomously',
  'TORONTO DEVELOPER ships production systems from home studio',
  'EXCLUSIVE: MCP integration connects desktop software to AI',
  'LEAN SIX SIGMA meets machine learning in new engineering practice',
  'REPORT: Scroll-driven 3D web experiences gain critical acclaim',
  'LOCAL BUILDER: "Every system ships, every process is measurable"',
  'NEW: Custom websites with Google Business setup now available',
  'TECHNOLOGY: Three.js + GSAP + Lenis powers next-generation portfolios',
]

// Double the headlines for seamless loop
const tickerText = [...headlines, ...headlines].join('  \u2022  ')
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker__track">
      <span class="ticker__text">{{ tickerText }}</span>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  overflow: hidden;
  background: var(--ink);
  padding: var(--space-2) 0;
  white-space: nowrap;
}

.ticker__track {
  display: inline-block;
  animation: ticker-scroll 60s linear infinite;
}

.ticker__text {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--paper);
  opacity: 0.7;
}

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .ticker__track { animation: none; }
}
</style>
