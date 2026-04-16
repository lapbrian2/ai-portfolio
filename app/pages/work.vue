<script setup lang="ts">
import { projects } from '~/data/projects'

useHead({ title: 'Archives — The Lapinski Record' })
useScrollVelocity('.ink-bleed')
</script>

<template>
  <div>
    <section class="section" style="padding-bottom: var(--space-8);">
      <div class="container">
        <h4 class="section-head entrance entrance--1">Archives</h4>
        <h2 class="ink-bleed mt-6 entrance entrance--2">All Stories</h2>
        <ScrollRevealText
          class="deck mt-4"
          text="A complete record of dispatches filed by our correspondents. Art, technology, and creative experiments — each story verified by the editors of this publication."
        />
      </div>
    </section>

    <ExtraExtra text="THE COMPLETE ARCHIVES &bull; EVERY DISPATCH &bull; EVERY STORY &bull; VERIFIED BY THE EDITORS" />

    <!-- Full articles -->
    <template v-for="(project, i) in projects" :key="project.title">
      <article class="section article-full">
        <div class="container">
          <!-- Article header -->
          <ArticleMeta
            :byline="project.byline"
            :dateline="project.dateline"
            :read-time="String(Math.ceil(project.body.split(' ').length / 200) + 2)"
            :section="project.category === 'art' ? 'Art' : project.category === 'tech' ? 'Technology' : 'Creative'"
          />

          <!-- Image + headline layout -->
          <div class="article-full__layout" :class="{ 'article-full__layout--reverse': i % 2 !== 0 }">
            <div class="article-full__text">
              <span class="kicker">{{ project.category === 'art' ? 'Art' : project.category === 'tech' ? 'Technology' : 'Creative' }}</span>
              <NuxtLink :to="`/work/${project.slug}`" class="article-full__link" data-cursor data-cursor-text="Read">
                <h2 class="article-full__headline ink-bleed mt-2 scroll-reveal">{{ project.headline }}</h2>
              </NuxtLink>
              <p class="article-full__deck mt-2">{{ project.deck }}</p>
            </div>
            <figure v-if="project.image" class="article-full__fig scroll-scale">
              <img :src="project.image" :alt="project.title" class="img-hover" loading="lazy" />
              <figcaption class="article-full__caption">
                (Staff Illustration) &mdash; {{ project.title }}
              </figcaption>
            </figure>
          </div>

          <!-- Body text -->
          <div class="article-full__body mt-8 scroll-reveal">
            <p class="article-full__lede drop-cap">{{ project.body }}</p>
          </div>

          <!-- Pull quote -->
          <PullQuote
            v-if="project.pullQuote"
            :quote="project.pullQuote"
            :attribution="project.byline === 'By Our Special Correspondent' ? 'As told to our correspondent' : project.byline"
          />

          <!-- Tags -->
          <div class="article-full__tags mt-6">
            <span v-for="tag in project.tags" :key="tag" class="article-full__tag">{{ tag }}</span>
          </div>
        </div>
      </article>

      <!-- Divider between articles -->
      <div v-if="i < projects.length - 1" class="container">
        <OrnamentalRule />
      </div>
    </template>
  </div>
</template>

<style scoped>
.deck {
  font-style: italic;
  font-size: 1rem;
  color: var(--ink-faded);
  max-width: 55ch;
}

.article-full {
  padding: var(--space-12) 0;
}

.article-full__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: start;
  margin-top: var(--space-6);
}

@media (min-width: 768px) {
  .article-full__layout {
    grid-template-columns: 1.3fr 1fr;
  }

  .article-full__layout--reverse {
    grid-template-columns: 1fr 1.3fr;
  }

  .article-full__layout--reverse .article-full__text {
    order: 2;
  }

  .article-full__layout--reverse .article-full__fig {
    order: 1;
  }
}

.article-full__link {
  text-decoration: none;
  color: inherit;
}

.article-full__link:hover .article-full__headline {
  color: var(--red-bright);
}

.article-full__headline {
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  line-height: 1.1;
  transition: color var(--duration-base) var(--ease-out);
}

.article-full__deck {
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--ink-faded);
  max-width: 50ch;
}

.article-full__fig {
  margin: 0;
}

.article-full__fig img {
  width: 100%;
  display: block;
  border: 1px solid var(--rule-light);
}

.article-full__caption {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--ink-faded);
  padding: var(--space-2) 0;
  font-style: italic;
  max-width: none;
}

.article-full__body {
  max-width: 700px;
}

.article-full__lede {
  font-size: 0.9375rem;
  line-height: 1.85;
  color: var(--ink-light);
}

.article-full__tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.article-full__tag {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  padding: 2px 6px;
  border: 1px solid var(--rule-light);
}
</style>
