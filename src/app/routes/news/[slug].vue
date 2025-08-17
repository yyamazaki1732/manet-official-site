<script lang="ts" setup>
import Page from '@/pages/news/slug/index.vue'

const { slug } = useRoute().params
</script>

<template>
  <Page :slug="slug" />
</template>
