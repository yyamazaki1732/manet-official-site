<template>
  <header :class="['header']">
    <h1>App Header / 'welcome'<br>{{ $t('home.subject') }}<br>{{ $t('about.subject') }}</h1>
    <UiLangSwitcher />
    <h2>isOpen : {{ isOpen }}</h2>
    <button @click="toggle">
      click  topicsId   {{ test }}
    </button>
  </header>
</template>

<script setup lang="ts">
import type { Common } from '@/entities/api/model/common'

const { isOpen, toggle } = useGlobalNav()

const { locale, messages } = useI18n()
const commonObj = messages.value[locale.value]?.common as Common
const test = commonObj?.topics_id
</script>

<style src="./Header.css" scoped></style>
