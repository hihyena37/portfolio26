import { useEffect, useLayoutEffect, useRef } from 'react'

// 페이지 내부 요소가 다시 렌더링돼도 고정된 책 영역에서 같은 손가락을 추적합니다.
export function bindBookSwipe(root, getOptions) {
  let gesture = null
  let suppressClickUntil = 0
  const reset = () => { gesture = null }
  const findTouch = (touches, id) => Array.from(touches).find((touch) => touch.identifier === id)

  const start = (event) => {
    reset()
    suppressClickUntil = 0
    const options = getOptions()
    if (!options.enabled || event.touches.length !== 1) return
    if (event.target.closest?.('a, button, input, textarea, select, summary, [contenteditable="true"]')) return
    const touch = event.touches[0]
    gesture = { id: touch.identifier, x: touch.clientX, y: touch.clientY, axis: null, page: options.page }
  }

  const move = (event) => {
    if (!gesture) return
    const options = getOptions()
    if (!options.enabled || options.page !== gesture.page || event.touches.length !== 1) return reset()
    const touch = findTouch(event.touches, gesture.id)
    if (!touch) return reset()
    const dx = Math.abs(touch.clientX - gesture.x)
    const dy = Math.abs(touch.clientY - gesture.y)
    if (!gesture.axis && Math.max(dx, dy) >= 12) {
      if (dy >= dx) return reset() // 세로 스크롤로 시작하면 책장을 넘기지 않습니다.
      if (dx > dy * 1.4) gesture.axis = 'horizontal'
    }
    if (gesture.axis === 'horizontal' && event.cancelable) event.preventDefault()
  }

  const end = (event) => {
    if (!gesture) return
    const saved = gesture
    reset()
    const options = getOptions()
    const touch = findTouch(event.changedTouches, saved.id)
    if (!touch || !options.enabled || options.page !== saved.page || event.touches.length) return
    const dx = touch.clientX - saved.x
    const dy = touch.clientY - saved.y
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy) * 1.4) return
    suppressClickUntil = Date.now() + 500
    options.onSwipe(dx < 0 ? 'next' : 'previous')
  }

  const click = (event) => {
    if (Date.now() >= suppressClickUntil) return
    event.preventDefault()
    event.stopPropagation()
  }

  root.addEventListener('touchstart', start, { capture: true, passive: true })
  root.addEventListener('touchmove', move, { capture: true, passive: false })
  root.addEventListener('touchend', end, { capture: true, passive: true })
  root.addEventListener('touchcancel', reset, true)
  root.addEventListener('click', click, true)
  return () => {
    reset()
    root.removeEventListener('touchstart', start, true)
    root.removeEventListener('touchmove', move, true)
    root.removeEventListener('touchend', end, true)
    root.removeEventListener('touchcancel', reset, true)
    root.removeEventListener('click', click, true)
  }
}

export default function useBookSwipe(ref, options) {
  const optionsRef = useRef(options)
  useLayoutEffect(() => { optionsRef.current = options })
  useEffect(() => {
    const root = ref.current
    if (!root) return
    return bindBookSwipe(root, () => ({
      ...optionsRef.current,
      enabled: optionsRef.current.enabled && window.matchMedia('(max-width: 767px)').matches,
    }))
  }, [ref])
}
