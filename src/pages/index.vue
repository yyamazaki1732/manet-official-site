<script setup lang="ts">
const { sanitize } = useSanitize()
</script>

<template>
  <h1>index.vue</h1>
  <NuxtPicture
    :img-attrs="{
      'id': 'my-id',
      'class': 'my-class',
      'style': 'display: block',
      'data-my-data': 'my-value',
    }"
    format="webp"
    :src="$t('home.list.0.img.url')"
    alt="image"
    width="400"
    height="400"
  />
  <div v-html="sanitize($t('home.list.0.wysiwyg'))" />
</template>
