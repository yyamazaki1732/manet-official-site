<script setup lang="ts">
import jaPostFiles from '@/shared/i18n/locales/ja/post.json'

import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const totalCnt = jaPostFiles.post.pageInfo.totalCnt
const perPage = jaPostFiles.post.pageInfo.perPage
const totalPageCnt = jaPostFiles.post.pageInfo.totalPageCnt

const route = useRoute()
const router = useRouter()
const currentPage = computed(() => {
  const page = Number(route.query.page)
  return !isNaN(page) && page >= 1 ? page : 1
})

onMounted(() => {
  // pageパラメータが無い場合は?page=1にリダイレクト
  if (!('page' in route.query)) {
    router.replace({
      path: route.path,
      query: { ...route.query, page: 1 },
    })
  }
})

const startIndex = computed(() => (currentPage.value - 1) * perPage)
const endIndex = computed(() => Math.min(startIndex.value + perPage, totalCnt))
const pageIndexes = computed(() => Array.from({ length: endIndex.value - startIndex.value }, (_, i) => startIndex.value + i))
</script>

<template>
  <div class="surface-color-quaternary p-4">
    <h1>News.vue</h1>
    <ul class="flex gap-4">
      <li
        v-for="index in pageIndexes"
        :key="index"
        class="w-max"
      >
        <NuxtLinkLocale
          :to="`/news/${$t(`post.list.${index}.slug`)}`"
          class="w-[300px] block"
        >
          <h2 class="thumbs w-[300px] h-[200px] p-2 surface-color-tertiary text-color-primary grid place-items-center">
            {{ $t(`post.list.${index}.slug`) }}
          </h2>
          <p class="w-full">
            {{ $t(`post.list.${index}.contents_type_slug`) }}
            {{ $t(`post.list.${index}.meta_description`) }}
          </p>
        </NuxtLinkLocale>
      </li>
    </ul>

    <!-- ページネーション -->
    <nav class="flex gap-2 mt-6">
      <NuxtLinkLocale
        v-if="currentPage > 1"
        :to="`/news?page=${currentPage - 1}`"
      >
        前へ
      </NuxtLinkLocale>
      <NuxtLinkLocale
        v-for="page in totalPageCnt"
        :key="page"
        :to="`/news?page=${page}`"
        :class="{ 'font-bold': page === currentPage }"
      >
        {{ page }}
      </NuxtLinkLocale>
      <NuxtLinkLocale
        v-if="currentPage < totalPageCnt"
        :to="`/news?page=${currentPage + 1}`"
      >
        次へ
      </NuxtLinkLocale>
    </nav>
  </div>
</template>``
