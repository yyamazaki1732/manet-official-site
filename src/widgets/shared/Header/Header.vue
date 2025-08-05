<template>
  <header :class="['header']">
    <h1>App Header / 'welcome'<br>{{ $t('home.subject') }}<br>{{ $t('about.subject') }}</h1>
    <UiLangSwitcher />
    <h2>isOpen : {{ isOpen }}</h2>
    <button @click="toggle">
      click
    </button>
  </header>
</template>

<script setup lang="ts">
const { isOpen, toggle } = useGlobalNav()
</script>

<style src="./Header.css" scoped></style>
