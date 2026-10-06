import { useCallback, useEffect, useState } from 'react'
import './Book.css'

import AboutMe from '../pages/AboutMe'
import Contents from '../pages/Contents'
import ProjectPage from '../pages/ProjectPage'
import Contact from '../pages/Contact'
import Thanks from '../pages/Thanks'
import MiniBookPreview from './MiniBookPreview'

import pageFlipSound from '../assets/page-flip.mp3'
import coverSound from '../assets/cover-sound.mp3'

const COVER_OPEN_DURATION = 2000

const Book = ({ nav, currentPage, setCurrentPage, isCoverClosed, setIsCoverClosed, isCoverClosing, setIsCoverClosing }) => {
  // 진입 시 자동으로 표지를 엽니다. (PC: 오른쪽 이동 + 열림, 모바일: 제자리에서 왼쪽으로 열림)
  const [isCoverOpening, setIsCoverOpening] = useState(isCoverClosed)
  const openingCover = isCoverClosed && isCoverOpening
  const [previousPage, setPreviousPage] = useState(currentPage)
  const [mobileTurn, setMobileTurn] = useState(null)
  const [desktopTurn, setDesktopTurn] = useState(null)
  const [crossedSheets, setCrossedSheets] = useState([])

  const finishClosing = useCallback(() => {
    setIsCoverClosing(false)
    setIsCoverClosed(true)
    setIsCoverOpening(false)
    setPreviousPage(0)
    setCurrentPage(0)
    setMobileTurn(null)
    setDesktopTurn(null)
    setCrossedSheets([])
  }, [setIsCoverClosing, setIsCoverClosed, setCurrentPage])

  useEffect(() => {
    if (!isCoverClosing) return
    const audio = new Audio(coverSound)
    audio.volume = 0.4
    audio.play().catch(() => {})
    const timeout = window.setTimeout(finishClosing, COVER_OPEN_DURATION + 250)
    const query = window.matchMedia('(max-width: 767px)')
    query.addEventListener('change', finishClosing)
    return () => {
      window.clearTimeout(timeout)
      query.removeEventListener('change', finishClosing)
      audio.pause()
    }
  }, [isCoverClosing, finishClosing])

  useEffect(() => {
    if (!openingCover) return
    const audio = new Audio(coverSound)
    audio.volume = 0.4
    audio.play().catch(() => {})
    const finish = () => {
      setIsCoverOpening(false)
      setIsCoverClosed(false)
    }
    // animationend가 누락된 경우에만 애니메이션 종료 후 정리합니다.
    const timeout = window.setTimeout(finish, COVER_OPEN_DURATION + 250)
    // 열리는 도중 PC/모바일 구간이 바뀌면 열린 상태로 마무리합니다.
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    mobileQuery.addEventListener('change', finish)
    return () => {
      window.clearTimeout(timeout)
      mobileQuery.removeEventListener('change', finish)
      audio.pause()
    }
  }, [openingCover, setIsCoverClosed])

  // 헤더나 목차로 이동할 때도 같은 페이지 전환을 적용합니다.
  if (previousPage !== currentPage) {
    setPreviousPage(currentPage)
    setCrossedSheets([])
    const animate = window.matchMedia('(max-width: 767px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMobileTurn(animate ? {
      from: previousPage,
      to: currentPage,
      direction: currentPage > previousPage ? 'next' : 'prev',
    } : null)
    setDesktopTurn(window.matchMedia('(min-width: 768px)').matches ? {
      from: previousPage,
      to: currentPage,
    } : null)
  }

  useEffect(() => {
    if (!desktopTurn) return
    const count = Math.abs(desktopTurn.to - desktopTurn.from)
    const step = count > 1 ? Math.min(60, 300 / (count - 1)) : 0
    const timers = Array.from({ length: count }, (_, order) => {
      const sheet = desktopTurn.to > desktopTurn.from
        ? desktopTurn.from + order
        : desktopTurn.from - 1 - order
      // 종이가 책등을 통과한 뒤에는 도착하는 쪽의 쌓임 순서를 사용합니다.
      return window.setTimeout(() => {
        setCrossedSheets((sheets) => [...sheets, sheet])
      }, 400 + order * step)
    })
    timers.push(window.setTimeout(() => setDesktopTurn(null), 850 + (count - 1) * step))
    return () => timers.forEach(window.clearTimeout)
  }, [desktopTurn])

  useEffect(() => {
    if (!mobileTurn) return
    // 탭 전환 등으로 animationend가 누락되어도 평면 상태로 복귀합니다.
    const timeout = window.setTimeout(() => setMobileTurn(null), 900)
    return () => window.clearTimeout(timeout)
  }, [mobileTurn])

  const playPageSound = () => {
    const audio = new Audio(pageFlipSound)

    audio.volume = 0.4
    audio.play()
  }


  const prevPage = () => {
    if (isCoverClosed || openingCover || isCoverClosing) return
    if (currentPage === 0) {
      if (desktopTurn || mobileTurn) return
      setIsCoverClosing(true)
      return
    }
    if (currentPage > 0) {
      playPageSound()
      setCurrentPage(currentPage - 1)
    }
  }


  // 표지를 열면 currentPage 0(ABOUT ME)이 그대로 보입니다.
  const openCover = () => {
    // 자동으로 열리는 중에는 중복 클릭을 무시합니다.
    if (openingCover || isCoverClosing) return
    setIsCoverOpening(true)
  }


  const nextPage = () => {
    if (isCoverClosed) {
      openCover()
      return
    }

    if (currentPage < 12) {
      playPageSound()
      setCurrentPage(currentPage + 1)
    }
  }


  const renderPage = (pageNumber, side) => {

    if (pageNumber === 0) {
      if (side === 'right') {
        return (
          <>
            <div className="about-desktop-side"><AboutMe side="right" /></div>
            <div className="about-single-page"><AboutMe side="combined" /></div>
          </>
        )
      }
      return <AboutMe side={side} />
    }

    if (pageNumber === 1) {
      // 미니북은 실제 책의 페이지 상태와 별개로 자동 재생합니다.
      return <Contents side={side} illustration={side === 'left' && (
        <MiniBookPreview active={currentPage === 1 && !isCoverClosed && !isCoverClosing} />
      )} onNavigate={(targetPage) => {
        if (targetPage === currentPage) return
        playPageSound()
        setCurrentPage(targetPage)
      }} />
    }

    if (pageNumber >= 2 && pageNumber <= 10) {
      return (
        <ProjectPage
          projectNumber={pageNumber - 1}
          side={side}
          magnify={side === 'right' && currentPage === pageNumber && !isCoverClosed && !isCoverClosing}
        />
      )
    }

    if (pageNumber === 11) {
      return <Contact side={side} />
    }

    if (pageNumber === 12) {
      return <Thanks side={side} />
    }

    return null
  }


  const papers = []

  for (let i = 0; i < 12; i++) {

    const isFlipped = currentPage > i
    const isTurning = desktopTurn &&
      i >= Math.min(desktopTurn.from, desktopTurn.to) &&
      i < Math.max(desktopTurn.from, desktopTurn.to)
    const count = desktopTurn ? Math.abs(desktopTurn.to - desktopTurn.from) : 0
    const order = isTurning
      ? (desktopTurn.to > desktopTurn.from ? i - desktopTurn.from : desktopTurn.from - 1 - i)
      : 0
    const delay = count > 1 ? order * Math.min(60, 300 / (count - 1)) : 0

    papers.push(
      <div
        key={i}
        className={`paper ${isFlipped ? 'flipped' : ''} ${currentPage === i ? 'is-current' : ''}`}
        style={{
          transitionDelay: isTurning ? `${delay}ms` : '0ms',
          zIndex: isTurning && !crossedSheets.includes(i)
            ? (desktopTurn.to > desktopTurn.from ? 60 - i : 40 + i)
            : isFlipped
            ? i + 1
            : 24 - i
        }}
      >

        <div className="front">
          {renderPage(i, 'right')}
        </div>

        <div className="back">
          {renderPage(i + 1, 'left')}
        </div>

      </div>
    )
  }


  return (
    <div className="book-area">

      <div
        className={`book${isCoverClosed ? ' is-cover-closed' : ''}${openingCover ? ' is-cover-opening' : ''}${isCoverClosing ? ' is-cover-closing' : ''}`}
        style={{ '--cover-open-duration': `${COVER_OPEN_DURATION}ms` }}
        inert={openingCover || isCoverClosing}
        aria-busy={openingCover || isCoverClosing}
      >
        <div className="book-bookmarks">{nav}</div>

        {/* 펼친 뒤에도 속지 아래에 남아 있는 하드커버 */}
        <div className="book-hardcover" aria-hidden="true">
          <span className="book-hardcover-left"></span>
          <span className="book-hardcover-right"></span>
        </div>

        {isCoverClosing && (
          <div className="book-closing-page" aria-hidden="true">
            {renderPage(currentPage, 'right')}
          </div>
        )}

        {(isCoverClosed || isCoverClosing) && (
          <button
            type="button"
            className="book-cover"
            onClick={openCover}
            aria-label="책 표지 열기"
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget && isCoverClosing) {
                finishClosing()
                return
              }
              if (event.target === event.currentTarget && openingCover) {
                setIsCoverOpening(false)
                setIsCoverClosed(false)
              }
            }}
          >
            <span className="book-cover-front">
              <img
                className="book-cover-image"
                src={`${import.meta.env.BASE_URL}book-cover.jpg`}
                alt=""
                draggable={false}
              />
            </span>
            <span className="book-cover-back" aria-hidden="true">
              <span className="book-cover-inside">
                {renderPage(isCoverClosing ? currentPage : 0, 'left')}
              </span>
            </span>
          </button>
        )}

        <div className="book-base left-page">
          {renderPage(0, 'left')}
        </div>

        <div className="book-base right-page">
          {renderPage(12, 'right')}
        </div>

        {papers}

        <div className="mobile-left-page" aria-hidden="true" inert>
          {renderPage(currentPage, 'left')}
        </div>

        {mobileTurn && (
          <div
            key={`${mobileTurn.from}-${mobileTurn.to}`}
            className={`mobile-book-turn turn-${mobileTurn.direction}`}
            aria-hidden="true"
            inert
          >
            <div
              className="mobile-turn-page turn-outgoing"
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) setMobileTurn(null)
              }}
            >
              {renderPage(mobileTurn.from, 'right')}
            </div>
            <div
              className="mobile-turn-page turn-incoming"
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) setMobileTurn(null)
              }}
            >
              {renderPage(mobileTurn.to, 'right')}
            </div>
          </div>
        )}

      </div>


      <div className="book-controls">

        <button
          className="book-control-button prev-button"
          onClick={prevPage}
          disabled={isCoverClosing || isCoverClosed || (currentPage === 0 && Boolean(desktopTurn || mobileTurn))}
          aria-label={currentPage === 0 ? '책 덮기' : '이전 페이지'}
          title={currentPage === 0 ? '책 덮기' : '이전 페이지'}
        >
          <i className="bi bi-chevron-left"></i>
        </button>


        <button
          className="book-control-button next-button"
          onClick={nextPage}
          disabled={isCoverClosing || openingCover || (!isCoverClosed && currentPage === 12)}
          aria-label="다음 페이지"
        >
          <i className="bi bi-chevron-right"></i>
        </button>

      </div>

    </div>
  )
}

export default Book
