
import IntroMenu from '../components/IntroMenu'
import FloatingLeaves from '../components/FloatingLeaves'

import './intro.css'
import bookshop1 from '../assets/bookshop1.gif'

const Intro = ({ onEnterBook, playOpening }) => {
  return (
    <main
      className={`intro${playOpening ? ' intro-opening' : ''}`}
      style={{
        '--intro-background': `url(${bookshop1})`
      }}
    >

      <FloatingLeaves />

      <div className="intro-title-info">
        <h1>SEONG HYENA</h1>

        <p className="intro-edition">
          BOOKSHOP EDITION
        </p>

        <p className="intro-keywords">
          DESIGN · CODE · INTERACTION
        </p>
      </div>

      <IntroMenu
        onEnterBook={onEnterBook}
      />

    </main>
  )
}

export default Intro
