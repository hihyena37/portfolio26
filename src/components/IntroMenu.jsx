import React, { useEffect, useRef } from 'react'
import './IntroMenu.css'

import introMenuBg from '../assets/intromenubg.png'
import hoverSound from '../assets/hoverSound.mp3'

const IntroMenu = ({ setPage, setCurrentPage }) => {
  const hoverSoundsRef = useRef(new Set())

  useEffect(() => {
    const sounds = hoverSoundsRef.current

    return () => {
      sounds.forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
      })
      sounds.clear()
    }
  }, [])

  const playHoverSound = () => {
    const audio = new Audio(hoverSound)
    const sounds = hoverSoundsRef.current
    audio.volume = 0.4
    sounds.add(audio)
    audio.addEventListener('ended', () => sounds.delete(audio), { once: true })
    // 첫 클릭 전에는 브라우저가 호버 소리를 차단할 수 있어요.
    audio.play().catch(() => sounds.delete(audio))
  }

  return (
    <div className="intro-menu-board">

      <img
        src={introMenuBg}
        alt=""
        className="intro-menu-bg"
      />

      <nav className="intro-nav">

        <button
          className="intro-menu-button"
          onMouseEnter={playHoverSound}
          onClick={() => {
            setCurrentPage(0)
            setPage('portfolio')
          }}
        >
          <i className="bi bi-person-fill menu-icon"></i>

          <span className="menu-label">
            ABOUT ME
          </span>

          <i className="bi bi-chevron-right menu-arrow"></i>
        </button>


        <button
          className="intro-menu-button"
          onMouseEnter={playHoverSound}
          onClick={() => {
            setCurrentPage(1)
            setPage('portfolio')
          }}
        >
          <i className="bi bi-book-fill menu-icon"></i>

          <span className="menu-label">
            PROJECT
          </span>

          <i className="bi bi-chevron-right menu-arrow"></i>
        </button>


        <button
          className="intro-menu-button"
          onMouseEnter={playHoverSound}
          onClick={() => {
            setCurrentPage(8)
            setPage('portfolio')
          }}
        >
          <i className="bi bi-envelope-fill menu-icon"></i>

          <span className="menu-label">
            CONTACT
          </span>

          <i className="bi bi-chevron-right menu-arrow"></i>
        </button>

      </nav>

    </div>
  )
}

export default IntroMenu
