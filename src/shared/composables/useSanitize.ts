import DOMPurify from 'dompurify'

export function useSanitize() {
  const sanitize = (dirty: string) => {
    if (import.meta.client) {
      return DOMPurify.sanitize(dirty)
    }
    return dirty // SSR時はそのまま返す
  }
  return { sanitize }
}
