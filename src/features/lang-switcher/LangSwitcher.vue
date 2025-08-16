<template>
  <div class="lang-switcher">
    <SwitchLocalePathLink
      v-for="locale in locales"
      :key="locale.code"
      :locale="locale.code"
      :class="['link']"
    >
      <p :class="['link-text']">
        {{ locale.code }}
      </p>
    </SwitchLocalePathLink>
  </div>
</template>

<script setup lang="ts">
const { locales } = useI18n()
</script>

<style src="./LangSwitcher.css" scoped> </style>
