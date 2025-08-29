<script setup lang="ts">
import jaPostFiles from '@/shared/i18n/locales/ja/post.json'
import jaPostEventFiles from '@/shared/i18n/locales/ja/post-event.json'
import jaPostTopicsFiles from '@/shared/i18n/locales/ja/post-topics.json'

import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const CATEGORY_MAP = {
  all: jaPostFiles.post,
  event: jaPostEventFiles['post-event'],
  topics: jaPostTopicsFiles['post-topics'],
}
const categoryOptions = [
  { label: 'ALL', value: 'all' },
  { label: 'EVENT', value: 'event' },
  { label: 'TOPICS', value: 'topics' },
]

const fileName = computed(() => {
  const cat = route.query.category
  if (cat === 'event' || cat === 'topics') return `post-${cat}`
  return 'post'
})

const selectedCategory = computed(() => {
  const cat = route.query.category
  if (cat === 'event' || cat === 'topics') return cat
  return 'all'
})

const route = useRoute()
const router = useRouter()
const currentPage = computed(() => {
  const page = Number(route.query.page)
  return !isNaN(page) && page >= 1 ? page : 1
})

onMounted(() => {
  const hasCategory = 'category' in route.query
  const hasPage = 'page' in route.query
  if (!hasCategory && !hasPage) {
    router.replace({ path: route.path, query: { ...route.query, category: 'all', page: 1 } })
    return
  }
  if (!hasCategory && hasPage) {
    router.replace({ path: route.path, query: { ...route.query, category: 'all', page: 1 } })
    return
  }
  if (hasCategory && !hasPage) {
    router.replace({ path: route.path, query: { ...route.query, category: route.query.category, page: 1 } })
    return
  }
})

const postData = computed(() => CATEGORY_MAP[selectedCategory.value])
const totalCnt = computed(() => postData.value.pageInfo.totalCnt)
const perPage = computed(() => postData.value.pageInfo.perPage)
const totalPageCnt = computed(() => postData.value.pageInfo.totalPageCnt)
const startIndex = computed(() => (currentPage.value - 1) * perPage.value)
const endIndex = computed(() => Math.min(startIndex.value + perPage.value, totalCnt.value))
const pageIndexes = computed(() => Array.from({ length: endIndex.value - startIndex.value }, (_, i) => startIndex.value + i))
</script>

<template>
  <div class="surface-color-quaternary p-4">
    <h1>News.vue</h1>
    <div class="mb-4 flex justify-center gap-2">
      <button
        v-for="cat in categoryOptions"
        :key="cat.value"
        :class="[cat.value === selectedCategory ? 'font-bold underline' : '', 'px-2 py-1 border rounded']"
        @click="router.replace({ path: route.path, query: { ...route.query, category: cat.value, page: 1 } })"
      >
        {{ cat.label }}
      </button>
    </div>
    <ul class="flex justify-center gap-4">
      <li
        v-for="index in pageIndexes"
        :key="index"
        class="w-max"
      >
        <NuxtLinkLocale
          :to="`/news/${$t(`${fileName}.list.${index}.slug`)}`"
          class="w-[300px] block"
        >
          <h2 class="thumbs w-[300px] h-[200px] p-2 surface-color-tertiary text-color-primary grid place-items-center">
            {{ $t(`${fileName}.list.${index}.slug`) }}
          </h2>
          <p class="w-full">
            {{ $t(`${fileName}.list.${index}.contents_type_nm`) }}
            {{ $t(`${fileName}.list.${index}.subject`) }}
            {{ $t(`${fileName}.list.${index}.content`) }}
            {{ $t(`${fileName}.list.${index}.meta_description`) }}
          </p>
        </NuxtLinkLocale>
      </li>
    </ul>

    <!-- ページネーション -->
    <nav class="flex gap-2 mt-6 justify-center">
      <NuxtLinkLocale
        v-if="currentPage > 1"
        :to="`/news?page=${currentPage - 1}&category=${selectedCategory}`"
      >
        前へ
      </NuxtLinkLocale>
      <NuxtLinkLocale
        v-for="page in totalPageCnt"
        :key="page"
        :to="`/news?page=${page}&category=${selectedCategory}`"
        :class="{ 'font-bold': page === currentPage }"
      >
        {{ page }}
      </NuxtLinkLocale>
      <NuxtLinkLocale
        v-if="currentPage < totalPageCnt"
        :to="`/news?page=${currentPage + 1}&category=${selectedCategory}`"
      >
        次へ
      </NuxtLinkLocale>
    </nav>
  </div>
</template>
