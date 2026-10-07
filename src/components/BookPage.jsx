import { useLayoutEffect, useRef } from 'react'

// 숨은 페이지를 해제해도 다시 방문하면 스크롤과 펼친 소개를 복원합니다.
const BookPage = ({ cache, pageKey, children }) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const root = ref.current
    const scrollAreas = [...root.querySelectorAll('.about-scroll, .project-info, .project-preview-scroll, .contact-right')]
    const details = [...root.querySelectorAll('.mobile-project-details')]
    const saved = cache.get(pageKey)
    const restore = () => {
      if (!saved) return
      details.forEach((element, index) => { element.open = saved.details[index] ?? false })
      scrollAreas.forEach((element, index) => { element.scrollTop = saved.scroll[index] ?? 0 })
    }
    const remember = (event) => {
      const index = scrollAreas.indexOf(event.target)
      const detailIndex = details.indexOf(event.target)
      if (index < 0 && detailIndex < 0) return
      const state = cache.get(pageKey) ?? { scroll: [], details: [] }
      if (index >= 0) state.scroll[index] = event.target.scrollTop
      if (detailIndex >= 0) state.details[detailIndex] = event.target.open
      cache.set(pageKey, state)
    }
    restore()
    root.addEventListener('load', restore, true)
    root.addEventListener('scroll', remember, true)
    root.addEventListener('toggle', remember, true)
    return () => {
      root.removeEventListener('load', restore, true)
      root.removeEventListener('scroll', remember, true)
      root.removeEventListener('toggle', remember, true)
    }
  }, [cache, pageKey])

  return <div className="book-face-content" ref={ref}>{children}</div>
}

export default BookPage
