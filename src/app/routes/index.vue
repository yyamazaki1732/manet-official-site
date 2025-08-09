<script setup lang="ts">
import Page from '@/pages/index.vue'

useSeoMeta({
  title: $t('home.subject'),
  ogTitle: $t('home.subject'),
  description: $t('home.meta_description'),
  ogDescription: $t('home.meta_description'),
})
</script>

<template>
  <div>
    <Page />
    <JsonLDTop />
  </div>
</template>
