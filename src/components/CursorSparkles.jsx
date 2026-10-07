import { useEffect, useRef } from 'react'
import './CursorSparkles.css'

const clickable = 'a[href], button, summary, [role="button"], input[type="button"], input[type="submit"], .clickable'

export default function CursorSparkles({ screenKey }) {
  const sparkleRef = useRef(null)

  useEffect(() => {
    const element = sparkleRef.current
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let position = null
    const hide = () => {
      position = null
      element.hidden = true
    }
    const update = () => {
      frame = 0
      if (!position || !media.matches) {
        element.hidden = true
        return
      }
      const target = document.elementFromPoint(position.x, position.y)
      const control = target?.closest(clickable)
      const blocked = control?.matches(':disabled') || target?.closest('[inert], [aria-disabled="true"]')
      element.hidden = !control || !!blocked
      element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const move = (event) => {
      if (event.pointerType !== 'mouse') return hide()
      position = { x: event.clientX, y: event.clientY }
      schedule()
    }
    const leave = (event) => {
      if (!event.relatedTarget) hide()
    }
    hide()
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', move, { passive: true })
    document.addEventListener('pointerout', leave)
    document.addEventListener('scroll', schedule, true)
    document.addEventListener('click', schedule)
    document.addEventListener('visibilitychange', hide)
    window.addEventListener('blur', hide)
    media.addEventListener('change', hide)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', move)
      document.removeEventListener('pointerout', leave)
      document.removeEventListener('scroll', schedule, true)
      document.removeEventListener('click', schedule)
      document.removeEventListener('visibilitychange', hide)
      window.removeEventListener('blur', hide)
      media.removeEventListener('change', hide)
    }
  }, [screenKey])

  return (
    <div className="cursor-sparkles" ref={sparkleRef} hidden aria-hidden="true">
      <span>✦</span><span>✧</span><span>✦</span><span>✧</span>
      <span>✦</span><span>✧</span><span>✦</span><span>✧</span>
    </div>
  )
}
