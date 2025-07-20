// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes'
  }
})
