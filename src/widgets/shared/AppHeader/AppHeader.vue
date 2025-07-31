<template>
  <header :class="['header']">
    <h1>App Header / 'welcome'<br>{{ $t('home.subject') }}<br>{{ $t('about.subject') }}</h1>
    <div class="locales">
      <NuxtLink
        v-for="locale in locales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        <h2> {{ locale.code }}</h2>
      </NuxtLink>
    </div>
    <h2>isOpen : {{ isOpen }}</h2>
    <button @click="toggle">
      click
    </button>
  </header>
</template>

<script setup lang="ts">
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { isOpen, toggle } = useGlobalNav()
</script>

<style src="./AppHeader.css" scoped></style>
