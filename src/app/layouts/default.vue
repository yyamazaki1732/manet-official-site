<template>
  <div>
    <UiHeader />
    <main>
      <slot />
    </main>
    <UiFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: $t('common.ogp.url'),
  twitterCard: 'summary_large_image',
})
</script>
