<script setup lang="ts">
import Page from '@/pages/about/index.vue'

useSeoMeta({
  title: $t('about.list.0.subject'),
  ogTitle: $t('about.list.0.subject'),
  description: $t('about.list.0.meta_description'),
  ogDescription: $t('about.list.0.meta_description'),
})
</script>

<template>
  <div>
    <Page />
    <JsonLDAbout />
  </div>
</template>
