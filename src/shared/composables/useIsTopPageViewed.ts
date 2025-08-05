// composables/useIsHeaderColorWhite.ts
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useIsTopPageViewed = () => {
  const route = useRoute()
  const isWhite = ref<boolean>(false)

  const update = () => {
    console.log('useIsTopPageViewed', route.path)
    isWhite.value = route.path === '/' || route.path === '/en' || route.path === '/en/'
  }

  watch(
    () => route.path,
    update,
    { immediate: true },
  )

  return isWhite
}
