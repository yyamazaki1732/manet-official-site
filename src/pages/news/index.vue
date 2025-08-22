<script setup lang="ts">
import jaPostAll from '@/shared/i18n/locales/ja/post.json'
import jaPostEvent from '@/shared/i18n/locales/ja/post-event.json'
import jaPostTopics from '@/shared/i18n/locales/ja/post-topics.json'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const CATEGORY_MAP = {
  all: jaPostAll.post,
  event: jaPostEvent.post_event,
  topics: jaPostTopics.post_topics,
}
const categoryOptions = [
  { label: 'all', value: 'all', key: 'post' },
  { label: 'event', value: 'event', key: 'post_event' },
  { label: 'topics', value: 'topics', key: 'post_topics' },
]

const selectedCategoryKey = computed(() => {
  const found = categoryOptions.find(cat => cat.value === selectedCategory.value)
  return found ? found.key : ''
})
const route = useRoute()
const router = useRouter()
const selectedCategory = computed(() => {
  const cat = route.query.category
  if (cat === 'event' || cat === 'topics') return cat
  return 'all'
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

const postData = computed(() => CATEGORY_MAP[selectedCategory.value])
const totalCnt = computed(() => postData.value.pageInfo.totalCnt)
const perPage = computed(() => postData.value.pageInfo.perPage)
const totalPageCnt = computed(() => postData.value.pageInfo.totalPageCnt)
const currentPage = computed(() => {
  const page = Number(route.query.page)
  return !isNaN(page) && page >= 1 ? page : 1
})
const startIndex = computed(() => (currentPage.value - 1) * perPage.value)
const endIndex = computed(() => Math.min(startIndex.value + perPage.value, totalCnt.value))
const pageList = computed(() => postData.value.list.slice(startIndex.value, endIndex.value))
</script>

<template>
  <div class="surface-color-quaternary p-4">
    <h1>
      selectedCategoryKey | {{ selectedCategoryKey }}
    </h1>
    <!-- カテゴリーセレクター -->
    <div class="mb-4 flex gap-2">
      <button
        v-for="cat in categoryOptions"
        :key="cat.value"
        :class="[cat.value === selectedCategory ? 'font-bold underline' : '', 'px-2 py-1 border rounded']"
        @click="router.replace({ path: route.path, query: { ...route.query, category: cat.value, page: 1 } })"
      >
        {{ cat.label }}
      </button>
    </div>
    <ul class="flex gap-4">
      <li
        v-for="(_, index) in pageList"
        :key="index"
        class="w-max"
      >
        <NuxtLinkLocale
          :to="`/news/${$t(`${selectedCategoryKey}.list.${index}.slug`)}`"
          class="w-[300px] block"
        >
          <h2 class="thumbs w-[300px] h-[200px] p-2 surface-color-tertiary text-color-primary grid place-items-center">
            {{ $t(`${selectedCategoryKey}.list.${index}.slug`) }}
          </h2>
          <p class="w-full">
            {{ $t(`${selectedCategoryKey}.list.${index}.contents_type_slug`) }}
            {{ $t(`${selectedCategoryKey}.list.${index}.meta_description`) }}
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
