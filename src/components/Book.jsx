import React from 'react'
import './Book.css'

import AboutMe from '../pages/AboutMe'
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
    if (currentPage < 9) {
      playPageSound()
      setCurrentPage(currentPage + 1)
    }
  }


  const renderPage = (pageNumber, side) => {

    if (pageNumber === 0) {
      return <AboutMe side={side} />
    }

    if (pageNumber >= 1 && pageNumber <= 7) {
      return (
        <ProjectPage
          projectNumber={pageNumber}
          side={side}
        />
      )
    }

    if (pageNumber === 8) {
      return <Contact side={side} />
    }

    if (pageNumber === 9) {
      return <Thanks side={side} />
    }

    return null
  }


  const papers = []

  for (let i = 0; i < 9; i++) {

    const isFlipped = currentPage > i

    papers.push(
      <div
        key={i}
        className={`paper ${isFlipped ? 'flipped' : ''}`}
        style={{
          zIndex: isFlipped
            ? i + 1
            : 20 - i
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
          {renderPage(9, 'right')}
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
          disabled={currentPage === 9}
          aria-label="다음 페이지"
        >
          <i className="bi bi-chevron-right"></i>
        </button>

      </div>

    </div>
  )
}

export default Book