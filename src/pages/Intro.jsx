
import { useEffect, useRef } from 'react'
import IntroMenu from '../components/IntroMenu'
import FloatingLeaves from '../components/FloatingLeaves'
import useMediaQuery from '../hooks/useMediaQuery'

import './intro.css'
import bookshop1 from '../assets/bookshop1.gif'

// 조명의 중심이 실제 커서 위치를 부드럽게 따라갑니다.
const LIGHT_EASE = 0.08

const Intro = ({ onEnterBook, playOpening }) => {
  const introRef = useRef(null)
  const lightRef = useRef(null)
  const followPointer = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')

  useEffect(() => {
    const light = lightRef.current
    const intro = introRef.current
    if (!followPointer || !light || !intro) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame = 0

    const step = () => {
      current.x += (target.x - current.x) * LIGHT_EASE
      current.y += (target.y - current.y) * LIGHT_EASE
      light.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`
      // 목표에 거의 닿으면 멈춰 불필요한 프레임을 쓰지 않습니다.
      frame = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.05
        ? window.requestAnimationFrame(step)
        : 0
    }

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return
      const bounds = intro.getBoundingClientRect()
      // offset은 transform 영향을 받지 않아 움직이는 빛을 기준으로 좌표가 흔들리지 않습니다.
      target.x = event.clientX - bounds.left - (light.offsetLeft + light.offsetWidth / 2)
      target.y = event.clientY - bounds.top - (light.offsetTop + light.offsetHeight / 2)
      if (!frame) frame = window.requestAnimationFrame(step)
    }

    const reset = () => {
      target.x = 0
      target.y = 0
      if (!frame) frame = window.requestAnimationFrame(step)
    }

    intro.addEventListener('pointermove', onPointerMove, { passive: true })
    intro.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    window.addEventListener('resize', reset)
    return () => {
      intro.removeEventListener('pointermove', onPointerMove)
      intro.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      window.removeEventListener('resize', reset)
      window.cancelAnimationFrame(frame)
    }
  }, [followPointer])

  return (
    <main
      ref={introRef}
      className={`intro${playOpening ? ' intro-opening' : ''}`}
      style={{
        '--intro-background': `url(${bookshop1})`
      }}
    >

      <div className="intro-light" ref={lightRef} aria-hidden="true"></div>

      <FloatingLeaves />

      <div className="intro-title-info">
        <h1>SEONG HYENA</h1>

        <p className="intro-edition">
          BOOKSHOP EDITION
        </p>

        <p className="intro-keywords">
          DESIGN · CODE · INTERACTION
        </p>
      </div>

      <IntroMenu
        onEnterBook={onEnterBook}
      />

    </main>
  )
}

export default Intro
