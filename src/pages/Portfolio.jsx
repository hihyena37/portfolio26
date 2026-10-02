import React from 'react'
import './Portfolio.css'

import Header from '../components/Header'
import Book from '../components/Book'

import bg2 from '../assets/bg2.jpg'

const Portfolio = ({ setPage, currentPage, setCurrentPage, isCoverClosed, setIsCoverClosed }) => {
  return (
    <div
      className="portfolio-bg"
      style={{ backgroundImage: `url(${bg2})` }}
    >

      <div className="portfolio-content">

        <Header
          setPage={setPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isCoverClosed={isCoverClosed}
          setIsCoverClosed={setIsCoverClosed}
        />

        <Book
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