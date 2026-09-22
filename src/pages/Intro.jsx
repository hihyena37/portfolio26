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

      <div className="intro-ticker">
        <div className="intro-ticker-track">

          <div className="intro-ticker-group">

            <span>
              SEONG HYENA — WEB PUBLISHER & DESIGN PORTFOLIO SITE 2026
            </span>

            <span className="ticker-symbol">
              ✦
            </span>


            <span>
              SEONG HYENA — WEB PUBLISHER & DESIGN PORTFOLIO SITE 2026
            </span>

            <span className="ticker-symbol">
              ✦
            </span>


            <span>
              SEONG HYENA — WEB PUBLISHER & DESIGN PORTFOLIO SITE 2026
            </span>

            <span className="ticker-symbol">
              ✦
            </span>


            <span>
              SEONG HYENA — WEB PUBLISHER & DESIGN PORTFOLIO SITE 2026
            </span>

            <span className="ticker-symbol">
              ✦
            </span>

          </div>


          <div className="intro-ticker-group">

            <span>
              SEONG HYENA — WEB PUBLISHER & DESIGN PORTFOLIO SITE 2026
            </span>

            <span className="ticker-symbol">
              ✦
            </span>


            <span>
              SEONG HYENA — WEB PUBLISHER & DESIGN PORTFOLIO SITE 2026
            </span>

            <span className="ticker-symbol">
              ✦
            </span>


            <span>
              SEONG HYENA — WEB PUBLISHER & DESIGN PORTFOLIO SITE 2026
            </span>

            <span className="ticker-symbol">
              ✦
            </span>


            <span>
              SEONG HYENA — WEB PUBLISHER & DESIGN PORTFOLIO SITE 2026
            </span>

            <span className="ticker-symbol">
              ✦
            </span>

          </div>

        </div>
      </div>


      <FloatingLeaves />


      <IntroMenu
        setPage={setPage}
        setCurrentPage={setCurrentPage}
      />

    </main>
  )
}

export default Intro