import { memo, useRef } from 'react'
import './AboutMe.css'
import useWheelScroll from '../hooks/useWheelScroll'

const AboutMe = ({ side, compact = false }) => {
  const scrollRef = useRef(null)

  useWheelScroll(scrollRef, !compact, side)

  if (side === 'combined') {
    return (
      <section className="book-page-content about-page about-combined">
        <div className="about-scroll about-combined-content" ref={scrollRef} tabIndex={0} role="region" aria-label="자기소개 및 이력">
          <AboutMe side="left" compact />
          <AboutMe side="right" compact />
        </div>
      </section>
    )
  }

  if (side === 'left') {
    return (
      <section className="book-page-content about-page about-left">

        <h2>ABOUT ME</h2>

        <div className="writer">
          <div className="text">
            <span>지은이</span>
            <h3>성혜나</h3>
          </div>

          <div className="imgbox">
            <img src={`${import.meta.env.BASE_URL}hn1.jpg`} alt="h1" />
          </div>
        </div>

        <div className="introduction about-scroll" ref={scrollRef} tabIndex={compact ? undefined : 0} role="region" aria-label="자기소개">
          <h3>
            <span className="intro-ko">
              <strong>이</strong>야기를 화면에 담다 <span>:</span>
            </span>
            <span className="intro-en">
              Stories on Screen
            </span>
          </h3>

          <p>
            디자인에는 전달하고 싶은 이야기가 있고, 퍼블리싱은 그 이야기를 실제 화면 위에 구현하는 과정이라고 생각합니다. 저는 사용자의 흐름을 고려해 정보를 정리하고, 디자인의 의도를 놓치지 않으면서 웹으로 구현하는 웹 퍼블리셔이자 디자이너입니다. 보기 좋은 화면에 그치지 않고, 반응형 레이아웃과 인터랙션을 통해 사용자가 자연스럽게 읽고 경험할 수 있는 이야기를 만들고자 합니다. 디자인과 코드 사이를 연결하며, 각 페이지의 의도와 이야기를 끝까지 보여드릴 수 있는 웹 퍼블리셔로 성장하겠습니다.
          </p>
        </div>

      </section>
    )
  }

  return (
    <section className="book-page-content about-page about-right">
      <div className="about-right-content about-scroll" ref={scrollRef} tabIndex={compact ? undefined : 0} role="region" aria-label="학력, 교육 및 기술">

        <div className="rightbox r1">
          <h3>EDUCATION</h3>
          <p>2016 ─ 구미여자고등학교 졸업</p>
          <p>2024 ─ 대구가톨릭대학교 디지털디자인과 졸업</p>
        </div>

        <div className="rightbox r2">
          <h3>TRAINING</h3>
          <p>
            2025. 07 ─ 2026. 02 <br />
            SBS아카데미컴퓨터아트학원 웹디자인과정 수업 이수
          </p>

          <p>
            2026. 05 ─ 2026. 10 <br />
            SBS아카데미컴퓨터아트학원 웹퍼블리셔 과정 국비 수업 이수
          </p>
        </div>

        <div className="rightbox r3">
          <h3>CERTIFICATE</h3>
          <p>
            2025. 12 ─ 웹디자인개발 기능사 취득
          </p>
        </div>

        <div className="rightbox r4">
          <h3>SKILLS</h3>
          <div className="skills_imgbox">
            <img src={`${import.meta.env.BASE_URL}ps.png`} alt="ps" />

            <img src={`${import.meta.env.BASE_URL}ai.png`} alt="ai" />

            <img src={`${import.meta.env.BASE_URL}figma.png`} alt="figma" />

            <img src={`${import.meta.env.BASE_URL}html.png`} alt="html" />

            <img src={`${import.meta.env.BASE_URL}css.png`} alt="css" />

            <img src={`${import.meta.env.BASE_URL}js.png`} alt="js" />

            <img src={`${import.meta.env.BASE_URL}jq.png`} alt="jq" />

            <img src={`${import.meta.env.BASE_URL}react.png`} alt="re" />

            <img src={`${import.meta.env.BASE_URL}codex.png`} alt="codex" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default memo(AboutMe)
