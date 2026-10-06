import { useEffect, useState } from 'react'
import './Portfolio.css'

import Header from '../components/Header'
import Book from '../components/Book'

import bg2 from '../assets/bg2.jpg'

// 작은 PC에서도 책 너비 960px을 유지해 1024px 태블릿 배치와 이어집니다.
// 높이가 부족할 때는 지나치게 축소하지 않고 화면 스크롤을 허용합니다.
const getDesktopScale = () => Math.max(960 / 1272,
  Math.min(1, window.innerWidth / 2560, window.innerHeight / 1100))

const Portfolio = ({ setPage, currentPage, setCurrentPage, isCoverClosed, setIsCoverClosed }) => {
  const [isCoverClosing, setIsCoverClosing] = useState(false)
  const [desktopScale, setDesktopScale] = useState(getDesktopScale)

  useEffect(() => {
    const resize = () => setDesktopScale(getDesktopScale())
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  return (
    <div
      className="portfolio-bg"
      style={{ backgroundImage: `url(${bg2})` }}
    >

      <div className="portfolio-content" style={{ '--portfolio-scale': desktopScale }}>

        {/* 책갈피 메뉴는 책 위치를 따라가도록 Book 안의 별도 레이어에 그립니다. */}
        <Book
          nav={(
            <Header
              disabled={isCoverClosing}
              setPage={setPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isCoverClosed={isCoverClosed}
              setIsCoverClosed={setIsCoverClosed}
            />
          )}
          isCoverClosing={isCoverClosing}
          setIsCoverClosing={setIsCoverClosing}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isCoverClosed={isCoverClosed}
          setIsCoverClosed={setIsCoverClosed}
        />

      </div>

    </div>
  )
}

export default Portfolio
