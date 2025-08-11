<template>
  <div class="lang-switcher">
    <NuxtLink
      v-for="locale in locales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      :class="['link']"
    >
      <p :class="['link-text']"> {{ locale.code }}</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<style src="./LangSwitcher.css" scoped> </style>
