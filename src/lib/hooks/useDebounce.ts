import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeoutRef = window.setTimeout(() => setDebouncedValue(value), delay)
    return () => window.clearTimeout(timeoutRef)
  }, [value, delay])

  return debouncedValue
}
