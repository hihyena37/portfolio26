import { useEffect, useRef } from 'react'
import './IntroMenu.css'

import hoverSound from '../assets/hoverSound.mp3'

const IntroMenu = ({ onEnterBook }) => {
  const hoverSoundRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(hoverSound)
    audio.volume = 0.4
    hoverSoundRef.current = audio

    return () => {
      audio.pause()
      hoverSoundRef.current = null
    }
  }, [])

  const playHoverSound = () => {
    const audio = hoverSoundRef.current
    if (!audio) return
    audio.currentTime = 0
    // 첫 클릭 전에는 브라우저가 호버 소리를 차단할 수 있어요.
    audio.play().catch(() => {})
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
