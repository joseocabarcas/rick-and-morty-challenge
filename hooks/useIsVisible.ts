import { useEffect, useState } from 'react'

export function useIsVisible(ref: React.RefObject<HTMLDivElement>) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { threshold: 1.0, rootMargin: '150px' }
      )

      observer.observe(ref.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [ref])

  return isIntersecting
}
