import { useEffect } from 'react'

// 3D 책 안의 스크롤 영역에서 휠 입력을 처리하는 공통 동작.
export default function useWheelScroll(ref, enabled = true, resetKey) {
  useEffect(() => {
    const area = ref.current
    if (!enabled || !area) return
    const handleWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      if (area.scrollHeight <= area.clientHeight) return
      const unit = event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? area.clientHeight : 1
      event.preventDefault()
      area.scrollTop += event.deltaY * unit
    }
    area.addEventListener('wheel', handleWheel, { passive: false })
    return () => area.removeEventListener('wheel', handleWheel)
  }, [ref, enabled, resetKey])
}
