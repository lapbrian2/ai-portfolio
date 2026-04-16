<script setup lang="ts">
useHead({ title: 'About — The Brian Lapinski Record' })

const bioRef = ref<HTMLElement | null>(null)
useScrollReveal(bioRef, { y: 40, duration: 1 })
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <h4 class="section-head">Profile</h4>
        <div class="grid grid--sidebar mt-8">
          <div ref="bioRef">
            <h2 class="ink-bleed">The Artist Who Builds</h2>
            <div class="bio mt-8">
              <ScrollRevealText
                class="lede text-justify"
                text="Brian Lapinski uses images as a way to explore what it means to be human. His work is rooted in personal exploration, emotion, and connection — not trends or technique for its own sake. He's interested in images that speak without words and create a quiet connection between people."
              />
              <ScrollRevealText
                class="body-col mt-6 text-justify"
                text="Named to Lürzer's Archive 200 Best Digital Artists — one of the most prestigious recognitions in the global creative industry — Lapinski's work has shown at Dream AI Gallery in New Jersey, Fundación Nestlé Barcelona, FNAC Asturias, and Art Innovation Gallery New York. He was selected for creAtIva Magazine Volume 7 and recognized as a 2026 Mover and Shaker by Choice Dao."
              />
              <ScrollRevealText
                class="body-col mt-6 text-justify"
                text="But the work doesn't stop at images. Lapinski is a Villanova-trained Lean Six Sigma Black Belt who managed programs and led teams at Amazon as an Area Manager. He founded Quick Dry Floor Care, a residential carpet cleaning operation, and now supervises at US Hydrations. The operations mindset — eliminate waste, measure everything, ship on time — carried into everything he builds."
              />
              <ScrollRevealText
                class="body-col mt-6 text-justify"
                text="Through creating and teaching, he sees image-making as a form of self-discovery and shared understanding. As an AI Architect at The House of Curiosity and Ambassador for ImagineArt, he brings a systematic approach to AI art — treating image generation as reproducible craft rather than random experimentation."
              />
            </div>
            <NuxtLink to="/contact" class="link-arrow mt-8" data-cursor>Get in touch</NuxtLink>
          </div>
          <aside class="sidebar">
            <h4 class="section-head">Curriculum Vitae</h4>
            <dl class="cv mt-4">
              <div class="cv__item">
                <dt>Recognition</dt>
                <dd>Lürzer's Archive 200 Best Digital Artists</dd>
              </div>
              <div class="cv__item">
                <dt>Publication</dt>
                <dd>creAtIva Magazine Vol. 7 — Beauty</dd>
              </div>
              <div class="cv__item">
                <dt>Award</dt>
                <dd>Choice Dao 2026 Mover and Shaker</dd>
              </div>
              <div class="cv__item">
                <dt>Certification</dt>
                <dd>L5 Diamond Vibe Coder — Lovable</dd>
              </div>
              <div class="cv__item">
                <dt>Ambassador</dt>
                <dd>ImagineArt — Creative Partner</dd>
              </div>
              <div class="cv__item">
                <dt>Partner</dt>
                <dd>Caimera — Creative Partner</dd>
              </div>
              <div class="cv__item">
                <dt>Role</dt>
                <dd>AI Architect — The House of Curiosity</dd>
              </div>
              <div class="cv__item">
                <dt>Operations</dt>
                <dd>Supervisor — US Hydrations</dd>
              </div>
              <div class="cv__item">
                <dt>Past</dt>
                <dd>Amazon — Program Mgmt, Area Manager</dd>
              </div>
              <div class="cv__item">
                <dt>Founded</dt>
                <dd>Quick Dry Floor Care</dd>
              </div>
              <div class="cv__item">
                <dt>Education</dt>
                <dd>Villanova — Lean Six Sigma Black Belt</dd>
              </div>
              <div class="cv__item">
                <dt>Certification</dt>
                <dd>ASQ Lean Certified</dd>
              </div>
              <div class="cv__item">
                <dt>Certification</dt>
                <dd>Anthropic — AI Fluency Framework</dd>
              </div>
            </dl>

            <h4 class="section-head mt-12">Exhibitions</h4>
            <ul class="exhibitions mt-4">
              <li>Dream AI Gallery — New Jersey</li>
              <li>Fundación Nestlé — Barcelona</li>
              <li>FNAC — Asturias</li>
              <li>Art Innovation Gallery — New York</li>
            </ul>

            <h4 class="section-head mt-12">Elsewhere</h4>
            <nav class="sidebar-links mt-4">
              <a href="https://github.com/lapbrian2" target="_blank" rel="noopener noreferrer" data-cursor>GitHub</a>
              <a href="https://linkedin.com/in/brian-lapinski" target="_blank" rel="noopener noreferrer" data-cursor>LinkedIn</a>
              <a href="#" data-cursor>Substack</a>
              <a href="#" data-cursor>Gumroad</a>
            </nav>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bio {
  max-width: 650px;
}

.cv {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cv__item {
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--rule-light);
}

.cv__item dt {
  font-size: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-ghost);
}

.cv__item dd {
  font-size: 0.75rem;
  color: var(--ink-light);
  margin-top: 2px;
}

.exhibitions {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.exhibitions li {
  font-size: 0.75rem;
  color: var(--ink-light);
  padding-left: var(--space-4);
  position: relative;
}

.exhibitions li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 8px;
  height: 1px;
  background: var(--red);
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sidebar-links a {
  font-size: 0.75rem;
  color: var(--ink-faded);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.sidebar-links a:hover {
  color: var(--ink);
}

@media (max-width: 768px) {
  .sidebar {
    border-top: 1px solid var(--rule-light);
    padding-top: var(--space-8);
    margin-top: var(--space-8);
  }
}
</style>
