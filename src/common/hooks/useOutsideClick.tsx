import { useEffect, RefObject } from "react"

function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  callback: () => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null
      if (ref.current && target && !ref.current.contains(target)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback])
}

export default useOutsideClick
