<template>
  <div class="lang-switcher">
    <NuxtLink
      v-for="locale in locales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      <h2> {{ locale.code }}</h2>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<style src="./LangSwitcher.css" scoped> </style>
