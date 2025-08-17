<script lang="ts" setup>
import type { PostDetails } from '@/entities/api/model/post-details'

const props = defineProps<{
  slug?: string | string[]
}>()

const { sanitize } = useSanitize()

const { locale } = useI18n()

const config = useRuntimeConfig()

const { data: response, status, error } = await useFetch<PostDetails>(
  () => `${config.public.apiBaseURL}/rcms-api/3/post-details/${props.slug}?_lang=${locale.value}`,
  {
    headers: {
      'x-rcms-api-access-token': `${config.public.staticToken}`,
    },
  },
)

useSeoMeta({
  title: response.value?.details.subject,
  ogTitle: response.value?.details.subject,
  description: response.value?.details.meta_description,
  ogDescription: response.value?.details.meta_description,
})
</script>

<template>
  <div v-if="(status === 'success' && response)">
    <br>
    {{ response.details.meta_description }}
    {{ response.details.ymd }}
    {{ locale }}
    <div v-html="sanitize(response.details.content)" />
  </div>
  <div v-else-if="status === 'error'">
    <p>Error: {{ error }}</p>
  </div>
</template>
