import { useState } from 'react'

import React from 'react'
import Intro from './pages/Intro'
import Portfolio from './pages/Portfolio'

const App = () => {

  const [page, setPage] = useState('intro')
  
  // 책에서 현재 보고 있는 페이지
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <>
      {page === 'intro' && (
        <Intro
          setPage={setPage}
          setCurrentPage={setCurrentPage} />
      )}

      {page === 'portfolio' && (
        <Portfolio
          setPage={setPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
      )}
    </>
  )
}

export default App
