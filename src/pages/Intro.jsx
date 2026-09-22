import React from 'react'

import IntroMenu from '../components/IntroMenu'
import FloatingLeaves from '../components/FloatingLeaves'

import './intro.css'
import bookshop1 from '../assets/bookshop1.gif'

const Intro = ({ setPage, setCurrentPage }) => {
  return (
    <main
      className="intro"
      style={{
        backgroundImage: `url(${bookshop1})`
      }}
    >

      <FloatingLeaves />


      <IntroMenu
        setPage={setPage}
        setCurrentPage={setCurrentPage}
      />

    </main>
  )
}

export default Intro