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
      PostDetailsStaticToken: '4aa06a43138a68e6c2d835b44954db0da0ca33523a0b6906912184804bbe79fe',
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
        files: [
          ...jaFiles,
          'ja/post-event.json',
          'ja/post-topics.json',
        ],
      },
      {
        code: 'en',
        language: 'en-US',
        files: [
          ...enFiles,
          'en/post-event.json',
          'en/post-topics.json',
        ],
      },
    ],
    defaultLocale: 'ja',
  },
})
