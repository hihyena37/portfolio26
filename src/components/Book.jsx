import { useEffect, useState } from 'react'
import './Book.css'

import AboutMe from '../pages/AboutMe'
import Contents from '../pages/Contents'
import ProjectPage from '../pages/ProjectPage'
import Contact from '../pages/Contact'
import Thanks from '../pages/Thanks'

import pageFlipSound from '../assets/page-flip.mp3'

const Book = ({ currentPage, setCurrentPage }) => {
  const [previousPage, setPreviousPage] = useState(currentPage)
  const [mobileTurn, setMobileTurn] = useState(null)
  const [desktopTurn, setDesktopTurn] = useState(null)
  const [crossedSheets, setCrossedSheets] = useState([])

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
    if (currentPage > 0) {
      playPageSound()
      setCurrentPage(currentPage - 1)
    }
  }


  const nextPage = () => {
    if (currentPage < 11) {
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
      return <Contents side={side} onNavigate={(targetPage) => {
        if (targetPage === currentPage) return
        playPageSound()
        setCurrentPage(targetPage)
      }} />
    }

    if (pageNumber >= 2 && pageNumber <= 9) {
      return (
        <ProjectPage
          projectNumber={pageNumber - 1}
          side={side}
        />
      )
    }

    if (pageNumber === 10) {
      return <Contact side={side} />
    }

    if (pageNumber === 11) {
      return <Thanks side={side} />
    }

    return null
  }


  const papers = []

  for (let i = 0; i < 11; i++) {

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
            : 22 - i
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

      <div className="book">

        <div className="book-base left-page">
          {renderPage(0, 'left')}
        </div>

        <div className="book-base right-page">
          {renderPage(11, 'right')}
        </div>

        {papers}

        {currentPage > 0 && (
          <div className="mobile-left-page" aria-hidden="true" inert>
            {renderPage(currentPage, 'left')}
          </div>
        )}

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
          disabled={currentPage === 0}
          aria-label="이전 페이지"
        >
          <i className="bi bi-chevron-left"></i>
        </button>


        <button
          className="book-control-button next-button"
          onClick={nextPage}
          disabled={currentPage === 11}
          aria-label="다음 페이지"
        >
          <i className="bi bi-chevron-right"></i>
        </button>

      </div>

    </div>
  )
}

export default Book
