import './Header.css'

import pageFlipSound from '../assets/page-flip.mp3'
import hoverSound from '../assets/hoverSound.mp3'

const Header = ({ setPage, currentPage, setCurrentPage, isCoverClosed, setIsCoverClosed, disabled = false }) => {

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

    // 표지가 닫혀 있으면 표지를 열고 해당 페이지로 이동합니다.
    if (isCoverClosed) {
      playPageSound()
      setIsCoverClosed(false)
      setCurrentPage(targetPage)
      return
    }

    if (currentPage === targetPage) return

    playPageSound()
    setCurrentPage(targetPage)
  }


  const menus = [
    { label: 'ABOUT ME', page: 0, active: currentPage === 0 },
    { label: 'CONTENTS', page: 1, active: currentPage === 1 },
    { label: 'WORKS', page: 2, active: currentPage >= 2 && currentPage <= 10 },
    { label: 'CONTACT', page: 11, active: currentPage >= 11 },
  ]


  return (
    <header inert={disabled}>

      {/* 책 뒤에서 위로 꽂혀 나온 세로 책갈피 메뉴 */}
      <nav className="portfolio-nav" aria-label="포트폴리오 메뉴">

        <button
          type="button"
          onClick={moveToIntro}
        >
          <span>INTRO</span>
        </button>

        {menus.map(({ label, page, active }) => (
          <button
            key={label}
            type="button"
            className={active ? 'active' : ''}
            aria-current={active ? 'page' : undefined}
            onClick={() => moveToPage(page)}
          >
            <span>{label}</span>
          </button>
        ))}

      </nav>

    </header>
  )
}

export default Header
