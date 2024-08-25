import { useIsVisible } from "@rick-and-morty-ch/hooks/useIsVisible"
import { useRef } from "react"

export function useHandleInfinite() {
  const container = useRef<HTMLDivElement>(null)
  const visible = useIsVisible(container)

  return {
    container,
    visible,
  }
}