<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/widgets/shared/AppHeader/AppHeader.vue'
import AppFooter from '@/widgets/shared/AppFooter/AppFooter.vue'
</script>
