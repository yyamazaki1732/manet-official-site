import DOMPurify from 'dompurify'

export function useSanitize() {
  const sanitize = (dirty: string) => DOMPurify.sanitize(dirty)
  return { sanitize }
}
