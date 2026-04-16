<script setup lang="ts">
/**
 * SVG-based halftone and aged newspaper texture overlays.
 * Layered on top of the shader canvas for authentic print feel.
 * Uses SVG filters for halftone dot pattern + aging effects.
 */
</script>

<template>
  <div class="texture-layer" aria-hidden="true">
    <!-- SVG Filters -->
    <svg class="texture-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Halftone dot pattern -->
        <pattern id="halftone" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="rgba(26,23,20,0.06)" />
        </pattern>

        <!-- Larger halftone for images -->
        <pattern id="halftone-large" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.2" fill="rgba(26,23,20,0.08)" />
        </pattern>

        <!-- Crosshatch pattern (newspaper print artifact) -->
        <pattern id="crosshatch" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(26,23,20,0.02)" stroke-width="0.5" />
        </pattern>

        <!-- Noise filter for paper fiber -->
        <filter id="paper-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray-noise" />
          <feBlend in="SourceGraphic" in2="gray-noise" mode="multiply" />
        </filter>
      </defs>
    </svg>

    <!-- Halftone dot overlay -->
    <div class="texture-halftone" />

    <!-- Edge aging / foxing spots -->
    <div class="texture-edges" />

    <!-- Fold crease lines (CSS) -->
    <div class="texture-fold texture-fold--h" />
    <div class="texture-fold texture-fold--v" />

    <!-- Coffee ring stain -->
    <div class="texture-coffee" />
  </div>
</template>

<style scoped>
.texture-layer {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

.texture-svg {
  position: absolute;
  width: 0;
  height: 0;
}

/* Halftone dot grid overlay */
.texture-halftone {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(26,23,20,0.04) 1px, transparent 1px);
  background-size: 4px 4px;
  opacity: 0.7;
}

/* Edge darkening / foxing */
.texture-edges {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(26,23,20,0.04) 80%,
    rgba(26,23,20,0.08) 100%
  );
}

/* Fold creases */
.texture-fold {
  position: absolute;
  background: linear-gradient(
    to right,
    transparent,
    rgba(26,23,20,0.03) 49%,
    rgba(26,23,20,0.06) 50%,
    rgba(26,23,20,0.03) 51%,
    transparent
  );
}

.texture-fold--h {
  left: 0;
  right: 0;
  top: 50%;
  height: 3px;
  transform: translateY(-50%);
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(26,23,20,0.04) 49%,
    rgba(26,23,20,0.07) 50%,
    rgba(26,23,20,0.04) 51%,
    transparent
  );
}

.texture-fold--v {
  top: 0;
  bottom: 0;
  left: 50%;
  width: 3px;
  transform: translateX(-50%);
}

/* Coffee stain */
.texture-coffee {
  position: absolute;
  top: 28%;
  right: 8%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(139, 90, 43, 0.04) 0%,
    rgba(139, 90, 43, 0.02) 40%,
    transparent 50%,
    rgba(139, 90, 43, 0.06) 60%,
    rgba(139, 90, 43, 0.03) 70%,
    transparent 80%
  );
  transform: rotate(-15deg) scale(1.2, 1);
}
</style>
