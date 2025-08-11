<script setup lang="ts">
import { globalNavItems } from '@/entities/navigation'
</script>

<template>
  <footer :class="['footer', 'opacity-75']">
    <h1 :class="['title']">
      Footer
    </h1>
    <ul :class="['list']">
      <li
        v-for="item in globalNavItems"
        :key="item.name"
      >
        <NuxtLinkLocale :to="item.path">
          {{ $t(`${item.name}.subject`) }}
        </NuxtLinkLocale>
      </li>
    </ul>
    <small :class="['copyright', 'text-center']">© Copyright 2006 - 2025 Ochanomizu Christian Center All Rights Reserved.
    </small>
  </footer>
</template>

<style src="./Footer.css" scoped></style>
