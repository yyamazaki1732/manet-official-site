// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'
import { ENDPOINTS } from './src/entities/api/constants/endpoints'

// pnpm app:fetch で生成されるJSONファイルのパスを定義
const jaFiles = ENDPOINTS.map(e => `ja/${e.key}.json`)
const enFiles = ENDPOINTS.map(e => `en/${e.key}.json`)

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxt/image', 'nuxt-jsonld'],
  components: [
    {
      path: 'widgets/layout',
      extensions: ['.vue'],
      prefix: 'Layout',
    },
    {
      path: 'widgets/shared',
      extensions: ['.vue'],
      prefix: 'Widget',
    },
    {
      path: 'features/lang-switcher',
      extensions: ['.vue'],
      prefix: 'Ui',
    },
  ],
  imports: {
    dirs: [
      'shared/composables/*',
    ],
  },
  devtools: { enabled: true },
  css: ['@/app/style/tailwindcss.css'],
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
    host: '0.0.0.0',
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
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
    langDir: '../src/shared/i18n/locales',
    locales: [
      {
        code: 'ja',
        language: 'ja-JP',
        files: jaFiles,
      },
      {
        code: 'en',
        language: 'en-US',
        files: enFiles,
      },
    ],
    defaultLocale: 'ja',
  },

})
