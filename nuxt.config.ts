// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: 'SparksWeb',

      htmlAttrs: {
        lang: 'en'
      },

      meta: [
        { charset: 'utf-8' },
        { name: 'keywords', content: 'SparksWeb, Sparks, Web, Developer, Development' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Need a website?' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
    }
  },

  compatibilityDate: '2025-09-17',

  devtools: {
    enabled: true
  },

  $development: {
    vite: {
      server: {
        hmr: {
          protocol: 'ws',
          host: 'localhost'
        },

        watch: {
          usePolling: true,
          interval: 100,
        },
      },
    },
  },

  ssr: false,

  // SSG Options
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  css: [
    '~/assets/styles/main.scss'
  ],

  plugins: [
    '~/plugins/event.ts'
  ],

  modules: ['@pinia/nuxt'],
})