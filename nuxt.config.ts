export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Instrument+Serif': [400],
      'DM+Sans': [400, 500, 600],
    },
    display: 'swap',
    preload: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Brian Lapinski — Artist, Builder, Engineer',
      meta: [
        { name: 'description', content: 'Digital artist, AI architect, and builder. Lürzer\'s Archive 200 Best. Exploring what it means to be human through images and code.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Brian Lapinski — AI Engineer & Web Developer' },
        { property: 'og:description', content: 'AI engineering and web development. Agents, MCP integrations, immersive web experiences.' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: [
    '~/assets/css/base.css',
    '~/assets/css/layout.css',
    '~/assets/css/utilities.css',
    '~/assets/css/animations.css',
  ],
})
