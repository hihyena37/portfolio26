import { Fragment } from 'react'

const message = 'SEONG HYENA — WEB PUBLISHER & DESIGN PORTFOLIO SITE 2026'

const TopTicker = () => (
  <div className="intro-ticker">
    <div className="intro-ticker-track">
      {[0, 1].map((group) => (
        <div className="intro-ticker-group" key={group} aria-hidden={group === 1 ? true : undefined}>
          {[0, 1, 2, 3].map((item) => (
            <Fragment key={item}>
              <span>{message}</span>
              <span className="ticker-symbol">✦</span>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  </div>
)

export default TopTicker
