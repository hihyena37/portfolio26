import { useEffect, useRef, useState } from 'react'
import './Contact.css'

const Contact = ({ side }) => {

  const [copied, setCopied] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const scrollRef = useRef(null)

  // WORK 페이지처럼 스크롤이 생기면 맨 위에 있을 때만 스크롤 아이콘을 보여줍니다.
  useEffect(() => {
    const area = scrollRef.current
    if (!area) return
    const updateHint = () => {
      setShowScrollHint(area.scrollTop <= 1
        && area.clientHeight > 0 && area.scrollHeight > area.clientHeight + 2)
    }
    const observer = new ResizeObserver(updateHint)
    observer.observe(area)
    Array.from(area.children).forEach((child) => observer.observe(child))
    area.addEventListener('scroll', updateHint, { passive: true })
    updateHint()
    return () => {
      observer.disconnect()
      area.removeEventListener('scroll', updateHint)
    }
  }, [side])

  useEffect(() => {
    const area = scrollRef.current
    if (!area) return

    // 3D 책 페이지에서도 휠 입력을 연락처 영역 스크롤에 전달
    const handleWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      if (area.scrollHeight <= area.clientHeight) return

      const unit = event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? area.clientHeight : 1
      event.preventDefault()
      area.scrollTop += event.deltaY * unit
    }

    area.addEventListener('wheel', handleWheel, { passive: false })
    return () => area.removeEventListener('wheel', handleWheel)
  }, [side])

  const copyEmail = async () => {
    await navigator.clipboard.writeText('hihyena37@gmail.com')

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1800)
  }


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
    <section className="book-page-content contact-page contact-right" ref={scrollRef}>

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

        {/* EMAIL */}
        <button
          type="button"
          className="contact-item contact-email"
          onClick={copyEmail}
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
            {copied ? '✓' : '↗'}
          </span>

          {copied && (
            <span className="copy-message">
              이메일 주소가 복사되었습니다.
            </span>
          )}
        </button>


        {/* PHONE */}
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


        {/* GITHUB */}
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

      {/* 아이콘 스타일은 WORK 페이지(ProjectPage.css)와 공유합니다. */}
      {showScrollHint && (
        <div className="project-scroll-hint" role="img" aria-label="아래로 스크롤하여 연락처 더 보기">
          <i className="bi bi-mouse" aria-hidden="true"></i>
        </div>
      )}

    </section>
  )
}

export default Contact