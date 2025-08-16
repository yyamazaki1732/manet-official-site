<script setup lang="ts">
import Page from '@/pages/index.vue'

useSeoMeta({
  title: $t('home.list.0.subject'),
  ogTitle: $t('home.list.0.subject'),
  description: $t('home.list.0.meta_description'),
  ogDescription: $t('home.list.0.meta_description'),
})
</script>

<template>
  <div>
    <Page />
    <JsonLDTop />
  </div>
</template>
