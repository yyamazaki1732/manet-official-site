// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'
import cssPlugin from '@eslint/css'

export default withNuxt(
  {
    plugins: {
      css: cssPlugin,
    },
    rules: {
      ...stylistic.configs['recommended'].rules,
      ...cssPlugin.configs['recommended'].rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  },
)
