<script setup lang="ts">
import jaPostFiles from '@/shared/i18n/locales/ja/post.json'

import { ref, computed } from 'vue'

const totalCnt = jaPostFiles.post.pageInfo.totalCnt
const perPage = jaPostFiles.post.pageInfo.perPage
const totalPageCnt = jaPostFiles.post.pageInfo.totalPageCnt
const firstIndex = jaPostFiles.post.pageInfo.firstIndex
const lastIndex = jaPostFiles.post.pageInfo.lastIndex
const startPageNo = jaPostFiles.post.pageInfo.startPageNo
const endPageNo = jaPostFiles.post.pageInfo.endPageNo

const currentPage = ref(1)

const startIndex = computed(() => (currentPage.value - 1) * perPage)
const endIndex = computed(() => Math.min(startIndex.value + perPage, totalCnt))
const pageIndexes = computed(() => Array.from({ length: endIndex.value - startIndex.value }, (_, i) => startIndex.value + i))

function goPage(page: number) {
  if (page >= 1 && page <= totalPageCnt) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="surface-color-quaternary">
    <h1>News.vue</h1>
    <br>
    <p>totalCnt : {{ totalCnt }}</p>
    <p>perPage : {{ perPage }}</p>
    <p>totalPageCnt : {{ totalPageCnt }}</p>
    <p>firstIndex : {{ firstIndex }}</p>
    <p>lastIndex : {{ lastIndex }}</p>
    <p>startPageNo : {{ startPageNo }}</p>
    <p>endPageNo : {{ endPageNo }}</p>
    <br>
    <br>
    <ul class="flex flex-col gap-y-4">
      <li
        v-for="index in pageIndexes"
        :key="index"
      >
        <NuxtLinkLocale :to="`/news/${$t(`post.list.${index}.slug`)}`">
          {{ $t(`post.list.${index}.subject`) }}
          {{ $t(`post.list.${index}.content`) }}
        </NuxtLinkLocale>
      </li>
    </ul>

    <!-- ページネーション -->
    <nav class="flex gap-2 mt-6">
      <button
        :disabled="currentPage === 1"
        @click="goPage(currentPage - 1)"
      >
        前へ
      </button>
      <button
        v-for="page in totalPageCnt"
        :key="page"
        :class="{ 'font-bold': page === currentPage }"
        @click="goPage(page)"
      >
        {{ page }}
      </button>
      <button
        :disabled="currentPage === totalPageCnt"
        @click="goPage(currentPage + 1)"
      >
        次へ
      </button>
    </nav>
  </div>
</template>``
