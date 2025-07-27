// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  devtools: { enabled: true },
  css: ['@/features/style/tailwindcss.css'],
  runtimeConfig: {
    public: {
    },
  },
  dir: {
    pages: '../src/app/routes',
    layouts: '../src/app/layouts',
    public: '../src/app/public',
  },
  srcDir: 'src',
  alias: {
    '@': '../src',
    '#shared': '../src/shared',
  },
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    locales: [
      { code: 'ja', language: 'ja-JP', file: 'ja.json' },
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'ja',
  },
})
