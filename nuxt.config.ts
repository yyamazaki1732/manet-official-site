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
  devServer: {
    port: 3456,
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
          'ja/home.json',
          'ja/about.json',
        ],
      },
      {
        code: 'en',
        language: 'en-US',
        files:
        [
          'en/home.json',
          'en/about.json',
        ],
      },
    ],
    defaultLocale: 'ja',
  },

})
