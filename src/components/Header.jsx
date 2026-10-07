import { playEffect } from '../utils/sound'
import './Header.css'

import pageFlipSound from '../assets/page-flip.mp3'
import hoverSound from '../assets/hoverSound.mp3'

const Header = ({ setPage, currentPage, setCurrentPage, isCoverClosed, openCoverTo, disabled = false }) => {

  const moveToIntro = () => {
    const audio = new Audio(hoverSound)
    audio.volume = 0.4
    playEffect(audio)
    setPage('intro')
  }

  const playPageSound = () => {
    const audio = new Audio(pageFlipSound)

    audio.volume = 0.4
    playEffect(audio)
  }


  const moveToPage = (targetPage) => {

    // 표지가 닫혀 있으면 표지를 먼저 연 뒤 해당 페이지로 넘깁니다. (Book에서 처리)
    if (isCoverClosed) {
      openCoverTo(targetPage)
      return
    }

    if (currentPage === targetPage) return

    playPageSound()
    setCurrentPage(targetPage)
  }


  // 표지가 덮여 있거나 덮이는 중(disabled)에는 모든 책갈피를 내려 둡니다.
  const isBookOpen = !isCoverClosed && !disabled

  const menus = [
    { label: 'ABOUT ME', page: 0, active: isBookOpen && currentPage === 0 },
    { label: 'CONTENTS', page: 1, active: isBookOpen && currentPage === 1 },
    { label: 'WORKS', page: 2, active: isBookOpen && currentPage >= 2 && currentPage <= 10 },
    { label: 'CONTACT', page: 11, active: isBookOpen && currentPage >= 11 },
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
