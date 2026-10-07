import { useEffect, useRef, useState } from 'react'

import Intro from './pages/Intro'
import Portfolio from './pages/Portfolio'
import TopTicker from './components/TopTicker'
import CursorSparkles from './components/CursorSparkles'

import bgm from './assets/bgm.mp3'

const App = () => {

  const [page, setPage] = useState('intro')

  // 책에서 현재 보고 있는 페이지
  const [currentPage, setCurrentPage] = useState(0)

  // 책 표지 닫힘 여부 (currentPage와 별개로 관리)
  const [isCoverClosed, setIsCoverClosed] = useState(true)

  // 음악 ON / OFF 상태
  const [isMusicOn, setIsMusicOn] = useState(false)

  // audio 태그 제어용
  const audioRef = useRef(null)
  const musicEnabledRef = useRef(true)
  const startMusicRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    let disposed = false
    let suspended = document.hidden
    let starting = false
    audio.volume = 0.15

    const start = async () => {
      if (disposed || suspended || document.hidden || !musicEnabledRef.current || starting || !audio.paused) return
      starting = true
      try {
        await audio.play()
        // 재생 요청 도중 사이트를 벗어난 경우에도 멈춥니다.
        if (disposed || suspended || document.hidden || !musicEnabledRef.current) audio.pause()
      } catch {
        // 자동재생이 차단되면 다음 클릭이나 터치 때 다시 시도합니다.
      } finally {
        starting = false
      }
    }
    startMusicRef.current = start

    const suspend = () => {
      suspended = true
      audio.pause()
    }
    const resume = () => {
      suspended = document.hidden
      if (!suspended) void start()
    }
    const visibilityChanged = () => document.hidden ? suspend() : resume()
    const firstInteraction = (event) => {
      if (event.target instanceof Element && event.target.closest('.music-button')) return
      void start()
    }

    document.addEventListener('visibilitychange', visibilityChanged)
    window.addEventListener('pagehide', suspend)
    window.addEventListener('pageshow', resume)
    document.addEventListener('click', firstInteraction)
    document.addEventListener('keydown', firstInteraction)
    void start()

    return () => {
      disposed = true
      startMusicRef.current = null
      audio.pause()
      document.removeEventListener('visibilitychange', visibilityChanged)
      window.removeEventListener('pagehide', suspend)
      window.removeEventListener('pageshow', resume)
      document.removeEventListener('click', firstInteraction)
      document.removeEventListener('keydown', firstInteraction)
    }
  }, [])

  const enterBook = () => {
    setCurrentPage(0)
    setIsCoverClosed(true)
    setPage('portfolio')
  }


  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      musicEnabledRef.current = false
      audio.pause()
    } else {
      musicEnabledRef.current = true
      void startMusicRef.current?.()
    }
  }


  return (
    <>
      {page === 'intro' && <TopTicker />}
      <CursorSparkles screenKey={`${page}-${currentPage}-${isCoverClosed}`} />

      {/* 배경 음악 */}
      <audio
        ref={audioRef}
        src={bgm}
        loop
        preload="auto"
        onPlay={() => setIsMusicOn(true)}
        onPause={() => setIsMusicOn(false)}
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
          playOpening={true}
          onEnterBook={enterBook}
        />
      )}


      {page === 'portfolio' && (
        <Portfolio
          setPage={setPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isCoverClosed={isCoverClosed}
          setIsCoverClosed={setIsCoverClosed}
        />
      )}

    </>
  )
}

export default App
