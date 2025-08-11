<script setup lang="ts">
import Page from '@/pages/about/index.vue'

useSeoMeta({
  title: $t('news.subject'),
  ogTitle: $t('news.subject'),
  description: $t('news.meta_description'),
  ogDescription: $t('news.meta_description'),
})
</script>

<template>
  <div>
    <Page />
    <JsonLDNews />
  </div>
</template>
