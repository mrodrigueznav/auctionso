// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode'
  ],
  css: ['~/assets/css/main.css'],
  components: {
    dirs: [
      '~/components',
      '~/components/ui',
      '~/components/admin',
      '~/components/admin/forms'
    ]
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  app: {
    head: {
      title: 'Wontolla Games - Subasta Benéfica',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Subasta benéfica de juegos de mesa por Wontolla Games' }
      ]
    }
  }
})