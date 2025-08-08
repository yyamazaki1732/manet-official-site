<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${$t('common.subject')}` : $t('common.subject')
  },
})
useSeoMeta({
  ogImage: {
    url: $t('common.ogp.url'),
    width: '1200',
    height: '630',
    alt: 'alt',
  },
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <WidgetHeader />
  <main :class="['footer', 'opacity-75']">
    <h1>DefaultLayout</h1>
    <slot />
  </main>
  <WidgetFooter />
</template>

<style src="./Default.css" scoped />
