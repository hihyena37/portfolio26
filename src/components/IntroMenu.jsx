import { useEffect, useRef } from 'react'
import './IntroMenu.css'

import hoverSound from '../assets/hoverSound.mp3'

const IntroMenu = ({ onEnterBook }) => {
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

      <nav className="intro-nav">

        <button
          type="button"
          className="intro-menu-button"
          aria-label="책 보러가기"
          onMouseEnter={playHoverSound}
          onClick={onEnterBook}
        >
          <span className="intro-menu-invitation" aria-hidden="true">
            <span className="intro-invitation-default">COME CLOSER</span>
            <span className="intro-invitation-hover">OPEN THE BOOK</span>
          </span>
          <img src={`${import.meta.env.BASE_URL}infomenu.png`} alt="" className="intro-menu-image" draggable="false" />
          <img src={`${import.meta.env.BASE_URL}infomenu_hover_aligned.png`} alt="" className="intro-menu-image intro-menu-image-hover" draggable="false" />
        </button>

      </nav>

    </div>
  )
}

export default IntroMenu
