import { useWindowSize } from "./useWindowSize"

export const useMaxWidth = (width: number) => {
  const size = useWindowSize()
  if (!size.width) {
    return false
  }
  return width > size.width
}