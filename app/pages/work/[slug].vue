<script setup lang="ts">
import { projects, getProjectBySlug } from '~/data/projects'

const route = useRoute()
const slug = route.params.slug as string
const project = getProjectBySlug(slug)

if (!project) {
  throw createError({ statusCode: 404, message: 'Story not found' })
}

useHead({
  title: `${project.headline} — The Lapinski Record`,
  meta: [
    { name: 'description', content: project.deck },
  ],
})

// Related stories — other stories in the same category, excluding current
const related = projects
  .filter(p => p.slug !== slug)
  .slice(0, 3)

useScrollVelocity('.article__headline')
</script>

<template>
  <div v-if="project">
    <!-- Article header -->
    <section class="section" style="padding-bottom: 0;">
      <div class="container">
        <span class="kicker entrance entrance--1">{{ project.category === 'art' ? 'Art' : project.category === 'tech' ? 'Technology' : 'Creative' }}</span>
        <h1 class="article__headline ink-bleed entrance--hero mt-2">{{ project.headline }}</h1>
        <p class="article__deck entrance entrance--3 mt-4">{{ project.deck }}</p>
        <ArticleMeta
          :byline="project.byline"
          :dateline="project.dateline"
          :read-time="String(Math.ceil(project.body.split(' ').length / 200) + 2)"
          :section="project.category === 'art' ? 'Art' : project.category === 'tech' ? 'Technology' : 'Creative'"
        />
      </div>
    </section>

    <!-- Hero image -->
    <section v-if="project.image" style="padding: var(--space-6) 0;">
      <div class="container">
        <figure class="article__hero entrance--image">
          <img :src="project.image" :alt="project.title" class="img-hover" loading="eager" />
          <figcaption class="article__caption">
            (Staff Illustration) &mdash; {{ project.title }}
          </figcaption>
        </figure>
      </div>
    </section>

    <div class="container"><hr class="rule rule--thick" /></div>

    <!-- Article body -->
    <section class="section">
      <div class="container">
        <div class="article__body">
          <p class="article__text drop-cap scroll-reveal">{{ project.body }}</p>
        </div>

        <PullQuote
          v-if="project.pullQuote"
          :quote="project.pullQuote"
          :attribution="project.byline"
        />

        <!-- Tags -->
        <div class="article__tags mt-8">
          <span v-for="tag in project.tags" :key="tag" class="article__tag">{{ tag }}</span>
        </div>
      </div>
    </section>

    <OrnamentalRule />

    <!-- Related stories -->
    <section class="section">
      <div class="container">
        <h4 class="section-head">Also in This Edition</h4>
        <div class="related mt-6">
          <NuxtLink
            v-for="story in related"
            :key="story.slug"
            :to="`/work/${story.slug}`"
            class="related__item story-hover"
            data-cursor
          >
            <span class="kicker">{{ story.category === 'art' ? 'Art' : story.category === 'tech' ? 'Technology' : 'Creative' }}</span>
            <h3 class="related__headline mt-1">{{ story.headline }}</h3>
            <span class="dateline mt-2">{{ story.dateline }} &mdash; {{ story.byline }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.article__headline {
  font-size: clamp(1.75rem, 4.5vw, 3rem);
  line-height: 1.05;
  max-width: 800px;
}

.article__deck {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 400;
  font-style: italic;
  color: var(--ink-faded);
  max-width: 60ch;
  text-transform: none;
  line-height: 1.4;
}

.article__hero {
  margin: 0;
  max-width: 800px;
}

.article__hero img {
  width: 100%;
  display: block;
  border: 1px solid var(--rule-light);
}

.article__caption {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--ink-faded);
  padding: var(--space-2) 0;
  font-style: italic;
  max-width: none;
}

.article__body {
  max-width: 680px;
}

.article__text {
  font-size: 1rem;
  line-height: 1.85;
  color: var(--ink-light);
}

.article__tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.article__tag {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  padding: 2px 8px;
  border: 1px solid var(--rule-light);
}

/* Related stories */
.related {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

@media (min-width: 768px) {
  .related {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gutter);
  }

  .related__item:not(:first-child) {
    border-left: 1px solid var(--rule-light);
    padding-left: var(--gutter);
  }
}

.related__item {
  display: block;
  padding: var(--space-4) 0;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid var(--rule-light);
}

.related__headline {
  font-size: 0.9375rem;
  line-height: 1.2;
  transition: color var(--duration-fast) var(--ease-out);
}

.related__item:hover .related__headline {
  color: var(--red-bright);
}
</style>
