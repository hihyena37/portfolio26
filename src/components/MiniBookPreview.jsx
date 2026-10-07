import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import './MiniBookPreview.css'
import useMediaQuery from '../hooks/useMediaQuery'

import AboutMe from '../pages/AboutMe'
import Contents from '../pages/Contents'
import ProjectPage from '../pages/ProjectPage'
import Contact from '../pages/Contact'
import Thanks from '../pages/Thanks'

// 실제 책과 같은 페이지 수와 '다음 페이지' 단위를 사용합니다.
const LAST_PAGE = 12
const STEP_MS = 2000
const TURN_MS = 800
const FADE_MS = 400

// 미니북 내부는 PC 책 크기로 그린 뒤 영역에 맞게 축소합니다.
const STAGE_WIDTH = 1340
const STAGE_HEIGHT = 860


const subscribeDocumentVisibility = (callback) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const getDocumentVisible = () => !document.hidden

// 미리보기 전용 렌더러: 효과음·페이지 이동 없이 기존 페이지 컴포넌트만 사용합니다.
// Contents에는 illustration을 넘기지 않아 미니북이 다시 중첩되지 않습니다.
const renderPreviewPage = (pageNumber, side) => {
  if (pageNumber === 0) return <AboutMe side={side} />
  if (pageNumber === 1) return <Contents side={side} />
  if (pageNumber >= 2 && pageNumber <= 10) {
    return <ProjectPage projectNumber={pageNumber - 1} side={side} />
  }
  if (pageNumber === 11) return <Contact side={side} />
  if (pageNumber === LAST_PAGE) return <Thanks side={side} />
  return null
}

const MiniBookPreview = ({ active }) => {
  const frameRef = useRef(null)
  const pageRef = useRef(0)
  const [page, setPage] = useState(0)
  const [turning, setTurning] = useState(null)
  const [isRewinding, setIsRewinding] = useState(false)
  const [scale, setScale] = useState(0)
  const [isInView, setIsInView] = useState(false)

  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const documentVisible = useSyncExternalStore(subscribeDocumentVisibility, getDocumentVisible, () => true)
  const running = active && isInView && documentVisible && !reducedMotion

  // 영역 크기에 맞춰 미니북 전체 배율을 계산합니다.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setScale(Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT))
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  // 화면 밖(모바일의 숨은 왼쪽 페이지 등)에서는 넘김을 멈춥니다.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!running) return
    const timers = new Set()
    let rewinding = false
    const later = (callback, delay) => {
      const id = window.setTimeout(() => {
        timers.delete(id)
        callback()
      }, delay)
      timers.add(id)
    }

    const tick = () => {
      const current = pageRef.current
      if (current < LAST_PAGE) {
        pageRef.current = current + 1
        setTurning(current)
        setPage(current + 1)
        later(() => setTurning(null), TURN_MS + 50)
        later(tick, STEP_MS)
        return
      }
      // 마지막 장 뒤에는 첫 장면을 겹쳐 띄운 뒤, 아래 종이를 애니메이션 없이 되돌립니다.
      rewinding = true
      setIsRewinding(true)
      later(() => {
        pageRef.current = 0
        setPage(0)
      }, FADE_MS)
      later(() => {
        rewinding = false
        setIsRewinding(false)
      }, FADE_MS + 50)
      later(tick, FADE_MS + STEP_MS)
    }

    later(tick, STEP_MS)
    return () => {
      timers.forEach(window.clearTimeout)
      // 되돌리는 도중 멈춘 경우에도 첫 장면 상태로 정리합니다.
      setTurning(null)
      if (rewinding) {
        pageRef.current = 0
        setPage(0)
        setIsRewinding(false)
      }
    }
  }, [running])

  // 현재 장면과 넘김 중에 보이는 종이에만 내용을 채웁니다.
  const hasContent = (index) => index >= page - 2 && index <= page

  const papers = []
  for (let i = 0; i < LAST_PAGE; i++) {
    const isFlipped = page > i
    papers.push(
      <div
        key={i}
        className={`mini-paper${isFlipped ? ' flipped' : ''}`}
        style={{ zIndex: turning === i ? 60 : isFlipped ? i + 1 : 24 - i }}
      >
        <div className="mini-face mini-front">
          {hasContent(i) && renderPreviewPage(i, 'right')}
        </div>
        <div className="mini-face mini-back">
          {hasContent(i) && renderPreviewPage(i + 1, 'left')}
        </div>
      </div>
    )
  }

  return (
    <div className="mini-book-preview" ref={frameRef} aria-hidden="true" inert>
      <div className={`mini-book-float${running ? ' is-floating' : ''}`}>
        <div
          className="mini-book-stage"
          style={{
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <div className={`mini-book${page === 0 && !turning ? ' is-reset' : ''}`}>
            <div className="mini-hardcover">
              <span className="mini-hardcover-left"></span>
              <span className="mini-hardcover-right"></span>
            </div>

            <div className="mini-base mini-base-left">
              {page <= 1 && renderPreviewPage(0, 'left')}
            </div>
            <div className="mini-base mini-base-right">
              {page >= LAST_PAGE - 1 && renderPreviewPage(LAST_PAGE, 'right')}
            </div>

            {papers}

            {isRewinding && (
              <div className="mini-rewind">
                <div className="mini-base mini-base-left">{renderPreviewPage(0, 'left')}</div>
                <div className="mini-base mini-base-right">{renderPreviewPage(0, 'right')}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniBookPreview
