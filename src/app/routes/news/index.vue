<script setup lang="ts">
import Page from '@/pages/about/index.vue'

useSeoMeta({
  title: $t('news.list.0.subject'),
  ogTitle: $t('news.list.0.subject'),
  description: $t('news.list.0.meta_description'),
  ogDescription: $t('news.list.0.meta_description'),
})
</script>

<template>
  <div>
    <Page />
    <JsonLDNews />
  </div>
</template>
