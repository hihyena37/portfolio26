import React from 'react'
import './Book.css'

import AboutMe from '../pages/AboutMe'
import Contents from '../pages/Contents'
import ProjectPage from '../pages/ProjectPage'
import Contact from '../pages/Contact'
import Thanks from '../pages/Thanks'

import pageFlipSound from '../assets/page-flip.mp3'

const Book = ({ currentPage, setCurrentPage }) => {

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

    papers.push(
      <div
        key={i}
        className={`paper ${isFlipped ? 'flipped' : ''} ${currentPage === i ? 'is-current' : ''}`}
        style={{
          zIndex: isFlipped
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
