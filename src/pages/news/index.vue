<template>
  <div class="surface-color-quaternary">
    <h1>News.vue</h1> <br>
    <ul class="flex flex-col gap-y-4">
      <li
        v-for="(_, index) in 9"
        :key="index"
      >
        <NuxtLinkLocale :to="`/news/${$t(`post.list.${index}.slug`)}`">
          {{ $t(`post.list.${index}.subject`) }}
          {{ $t(`post.list.${index}.content`) }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>``
