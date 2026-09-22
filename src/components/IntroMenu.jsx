import React from 'react'
import './IntroMenu.css'

import introMenuBg from '../assets/intromenubg.png'

const IntroMenu = ({ setPage, setCurrentPage }) => {
  return (
    <div className="intro-menu-board">

      <div
        className="intro-menu-bg"
        style={{ backgroundImage: `url(${introMenuBg})` }}
      >

      <nav className="intro-nav">

        <button
          className="intro-menu-button"
          onClick={() => {
            setCurrentPage(0)
            setPage('portfolio')
          }}
        >
          <i className="bi bi-person-fill menu-icon"></i>

          <span className="menu-label">
            ABOUT ME
          </span>

          <i className="bi bi-chevron-right menu-arrow"></i>
        </button>


        <button
          className="intro-menu-button"
          onClick={() => {
            setCurrentPage(1)
            setPage('portfolio')
          }}
        >
          <i className="bi bi-book-fill menu-icon"></i>

          <span className="menu-label">
            PROJECT
          </span>

          <i className="bi bi-chevron-right menu-arrow"></i>
        </button>


        <button
          className="intro-menu-button"
          onClick={() => {
            setCurrentPage(8)
            setPage('portfolio')
          }}
        >
          <i className="bi bi-envelope-fill menu-icon"></i>

          <span className="menu-label">
            CONTACT
          </span>

          <i className="bi bi-chevron-right menu-arrow"></i>
        </button>

      </nav>
      </div>

    </div>
  )
}

export default IntroMenu
