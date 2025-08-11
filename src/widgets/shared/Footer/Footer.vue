<script setup lang="ts">
import { globalNavItems } from '@/entities/navigation'
</script>

<template>
  <footer :class="['footer', 'opacity-75']">
    <h1>App Footer</h1>
    <nav>
      <ul>
        <li
          v-for="item in globalNavItems"
          :key="item.name"
        >
          <NuxtLinkLocale :to="item.path">
            {{ $t(`${item.name}.subject`) }}
          </NuxtLinkLocale>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style src="./Footer.css" scoped></style>
