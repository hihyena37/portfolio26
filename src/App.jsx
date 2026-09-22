import { useRef, useState } from 'react'

import React from 'react'
import Intro from './pages/Intro'
import Portfolio from './pages/Portfolio'
import TopTicker from './components/TopTicker'

import bgm from './assets/bgm.mp3'

const App = () => {

  const [page, setPage] = useState('intro')

  // 책에서 현재 보고 있는 페이지
  const [currentPage, setCurrentPage] = useState(0)

  // 음악 ON / OFF 상태
  const [isMusicOn, setIsMusicOn] = useState(false)

  // audio 태그 제어용
  const audioRef = useRef(null)


  const toggleMusic = async () => {

    if (!audioRef.current) return

    if (isMusicOn) {

      audioRef.current.pause()
      setIsMusicOn(false)

    } else {

      audioRef.current.volume = 0.15
      try {
        await audioRef.current.play()
        setIsMusicOn(true)
      } catch {
        setIsMusicOn(false)
      }

    }

  }


  return (
    <>
      <TopTicker />

      {/* 배경 음악 */}
      <audio
        ref={audioRef}
        src={bgm}
        loop
      />


      {/* 음악 ON / OFF 버튼 */}
      <button
        className="music-button"
        onClick={toggleMusic}
        aria-label={isMusicOn ? '음악 끄기' : '음악 켜기'}
        aria-pressed={isMusicOn}
      >
        <span className="music-label">
          {isMusicOn ? '재즈 잠시 쉬기 ♫' : '재즈와 함께 둘러보기 ♫'}
        </span>
        <i
          aria-hidden="true"
          className={
            isMusicOn
              ? 'bi bi-volume-up-fill'
              : 'bi bi-volume-mute-fill'
          }
        ></i>
      </button>


      {page === 'intro' && (
        <Intro
          setPage={setPage}
          setCurrentPage={setCurrentPage}
        />
      )}


      {page === 'portfolio' && (
        <Portfolio
          setPage={setPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

    </>
  )
}

export default App
