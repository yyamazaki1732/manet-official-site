// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'
import { ENDPOINTS } from './src/entities/api/constants/endpoints'

// pnpm app:fetch で生成されるJSONファイルのパスを定義
const jaFiles = ENDPOINTS.map(e => `ja/${e.key}.json`)
const enFiles = ENDPOINTS.map(e => `en/${e.key}.json`)

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxt/image', 'nuxt-jsonld', 'nuxt-gtag'],
  ssr: true,
  components: [
    {
      path: 'entities/jsonld/',
      extensions: ['.vue'],
      prefix: 'JsonLD',
    },
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
  css: ['@/app/style/base.css', '@/app/style/tailwindcss.css'],
  runtimeConfig: {
    public: {
      apiBaseURL: 'https://manet.g.kuroco.app',
      staticToken: '0c459601f46025f5ff46e57bb7605933065de5b0a31e7abd6509a448856d9229',
    },
  },
  dir: {
    pages: '../src/app/routes',
    layouts: '../src/app/layouts',
  },
  srcDir: 'src',
  alias: {
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
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: 'G-XXXXXXXXXX',
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
