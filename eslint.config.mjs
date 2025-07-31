// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt(
  {
    rules: {
      ...stylistic.configs['recommended'].rules,
      'vue/multi-word-component-names': 'off',
    },
  },
)
