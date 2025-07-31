<template>
  <header :class="['header']">
    <h1>App Header / 'welcome'<br>{{ $t('home.subject') }}<br>{{ $t('about.subject') }}</h1>
    <div class="locales">
      <button
        v-for="(locale, index) in locales"
        :key="locale.code"
        type="button"
        @click="setLocale(locale.code)"
      >
        {{ locale.code }} <span v-if="index < locales.length - 1">-</span>
        {{ locale.name }}
      </button>
    </div>
    <h2>isOpen : {{ isOpen }}</h2>
    <button @click="toggle">
      click
    </button>
  </header>
</template>

<script setup lang="ts">
const { locales, setLocale } = useI18n()
const { isOpen, toggle } = useGlobalNav()
</script>

<style scoped>
.header {
    background-color: #213141;
    color: white;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #dee2e6;
    min-height: 30px;
}
</style>
