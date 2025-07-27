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
    langDir: '../src/shared/i18n/locales',
    locales: [
      {
        code: 'ja',
        language: 'ja-JP',
        files:
        [
          'ja/default.json',
          'ja/top.json',
          'ja/all_rcms-api_3_home_ja.json',
          'ja/all_rcms-api_3_about_ja.json',
        ],
      },
      {
        code: 'en',
        language: 'en-US',
        files:
        [
          'en/default.json',
          'en/top.json',
          'en/all_rcms-api_3_home_en.json',
          'en/all_rcms-api_3_about_en.json',
        ],
      },
    ],
    defaultLocale: 'ja',
  },
})
