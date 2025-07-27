// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  css: ['@/features/style/tailwindcss.css'],
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
})
