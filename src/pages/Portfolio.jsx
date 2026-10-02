import React, { useState } from 'react'
import './Portfolio.css'

import Header from '../components/Header'
import Book from '../components/Book'

import bg2 from '../assets/bg2.jpg'

const Portfolio = ({ setPage, currentPage, setCurrentPage, isCoverClosed, setIsCoverClosed }) => {
  const [isCoverClosing, setIsCoverClosing] = useState(false)
  return (
    <div
      className="portfolio-bg"
      style={{ backgroundImage: `url(${bg2})` }}
    >

      <div className="portfolio-content">

        <Header
          disabled={isCoverClosing}
          setPage={setPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isCoverClosed={isCoverClosed}
          setIsCoverClosed={setIsCoverClosed}
        />

        <Book
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
