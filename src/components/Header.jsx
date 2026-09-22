import React from 'react'
import './Header.css'

import pageFlipSound from '../assets/page-flip.mp3'
import hoverSound from '../assets/hoverSound.mp3'

const Header = ({ setPage, currentPage, setCurrentPage }) => {

  const moveToIntro = () => {
    const audio = new Audio(hoverSound)
    audio.volume = 0.4
    audio.play().catch(() => {})
    setPage('intro')
  }

  const playPageSound = () => {
    const audio = new Audio(pageFlipSound)

    audio.volume = 0.4
    audio.play()
  }


  const moveToPage = (targetPage) => {

    if (currentPage === targetPage) return

    playPageSound()
    setCurrentPage(targetPage)
  }


  return (
    <header>

      <nav className="portfolio-nav">

        <button
          onClick={moveToIntro}
        >
          INTRO
        </button>


        <button
          className={currentPage === 0 ? 'active' : ''}
          onClick={() => moveToPage(0)}
        >
          ABOUT ME
        </button>


        <button
          className={
            currentPage >= 1 && currentPage <= 7
              ? 'active'
              : ''
          }
          onClick={() => moveToPage(1)}
        >
          PROJECT
        </button>


        <button
          className={currentPage >= 8 ? 'active' : ''}
          onClick={() => moveToPage(8)}
        >
          CONTACT
        </button>

      </nav>

    </header>
  )
}

export default Header
