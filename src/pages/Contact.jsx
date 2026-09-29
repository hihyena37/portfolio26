import React from 'react'
import './Contact.css'

const Contact = ({ side }) => {

  if (side === 'left') {
    return (
      <section className="book-page-content contact-page contact-left">

        <h2>CONTACT</h2>

        <div className="contact-intro">

          <p className="contact-small-title">
            LET'S WRITE
          </p>

          <h3>
            THE NEXT STORY
            <br />
            TOGETHER.
          </h3>

          <p className="contact-description">
            새로운 이야기의 다음 장을
            <br />
            함께 만들어가고 싶습니다.
          </p>

          <p className="contact-description contact-description-sub">
            웹사이트 제작, 디자인, 퍼블리싱과 관련된
            <br />
            이야기가 있다면 편하게 연락해주세요.
          </p>

        </div>


        <div className="contact-illustration">

          <img
            className="contact-paper"
            src={`${import.meta.env.BASE_URL}contact_paper.png`}
            alt="paper"
          />

          <img
            className="contact-pen"
            src={`${import.meta.env.BASE_URL}contact_pen.png`}
            alt="pen"
          />

        </div>

      </section>
    )
  }


  return (
    <section className="book-page-content contact-page contact-right">

      <h2 className="mobile-page-title">
        CONTACT
      </h2>


      <div className="contact-right-header">

        <span>CONTACT INFORMATION</span>

        <h3>
          GET IN TOUCH
        </h3>

        <p>
          언제든 편하게 연락해주세요.
        </p>

      </div>


      <div className="contact-list">

        <a
          className="contact-item"
          href="mailto:hihyena37@gmail.com"
        >
          <span className="contact-number">
            01
          </span>

          <div>
            <span className="contact-label">
              EMAIL
            </span>

            <p>
              hihyena37@gmail.com
            </p>
          </div>

          <span className="contact-arrow">
            ↗
          </span>
        </a>


        <a
          className="contact-item"
          href="tel:+821062960440"
        >
          <span className="contact-number">
            02
          </span>

          <div>
            <span className="contact-label">
              PHONE
            </span>

            <p>
              +82 10-6296-0440
            </p>
          </div>

          <span className="contact-arrow">
            ↗
          </span>
        </a>


        <a
          className="contact-item"
          href="https://github.com/hihyena37"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-number">
            03
          </span>

          <div>
            <span className="contact-label">
              GITHUB
            </span>

            <p>
              github.com/hihyena37
            </p>
          </div>

          <span className="contact-arrow">
            ↗
          </span>
        </a>

      </div>


      <div className="contact-footer">

        <span>
          SEONG HYENA
        </span>

        <span>
          WEB PUBLISHER · DESIGNER
        </span>

      </div>

    </section>
  )
}

export default Contact