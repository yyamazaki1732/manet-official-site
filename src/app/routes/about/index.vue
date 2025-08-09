<script setup lang="ts">
import Page from '@/pages/about/index.vue'

useSeoMeta({
  title: $t('about.subject'),
  ogTitle: $t('about.subject'),
  description: $t('about.meta_description'),
  ogDescription: $t('about.meta_description'),
})
</script>

<template>
  <div>
    <Page />
    <JsonLDAbout />
  </div>
</template>
