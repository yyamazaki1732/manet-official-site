<script setup lang="ts">
import type { WithContext, BreadcrumbList } from 'schema-dts'

const breadcrumbs = [
  { url: 'https://example.com', text: 'top page' },
  { url: 'https://example.com/foo', text: 'foo' },
  { url: 'https://example.com/foo/bar', text: 'bar' },
]

function jsonld(): WithContext<BreadcrumbList> {
  const items = breadcrumbs.map((item, index) => ({
    '@type': 'ListItem' as const,
    'position': index + 1,
    'item': {
      '@id': item.url,
      'name': item.text,
    },
  }))
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items,
  }
}

useJsonld(jsonld())

useSeoMeta({
  title: $t('about.subject'),
  ogTitle: $t('about.subject'),
  description: $t('about.meta_description'),
  ogDescription: $t('about.meta_description'),
})
</script>

<template>
  <h1>about.vue</h1>
</template>
