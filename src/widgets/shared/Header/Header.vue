<script setup lang="ts">
import { ref } from 'vue'
import { globalNavItems } from '@/entities/navigation'

const isMenuOpen = ref(false)
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

const { locale } = useI18n()
</script>

<template>
  <header :class="['header']">
    <h1 :class="['title']">
      <NuxtLinkLocale :to="'/'">
        Header
      </NuxtLinkLocale>
    </h1>
    <ul :class="['list']">
      <li
        v-for="item in globalNavItems"
        :key="item.name"
      >
        <NuxtLinkLocale :to="item.path">
          {{ locale }}
        </NuxtLinkLocale>
      </li>
    </ul>
    <UiLangSwitcher />
    <button
      :aria-expanded="isMenuOpen"
      aria-controls="main-nav"
      aria-label="メニュー"
      class="hamburger-btn"
      @click="toggleMenu"
    >
      <span>☰</span>
    </button>
    <Teleport to="body">
      <nav
        v-if="isMenuOpen"
        id="main-nav"
        role="menu"
        tabindex="0"
        class="menu-overlay"
      >
        <button
          aria-label="閉じる"
          class="close-btn"
          @click="toggleMenu"
        >
          ×
        </button>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
        </ul>
      </nav>
    </Teleport>
  </header>
</template>

<style src="./Header.css" scoped></style>
