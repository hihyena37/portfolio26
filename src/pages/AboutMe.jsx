import React from 'react'
import './AboutMe.css'

const AboutMe = ({ side }) => {

  if (side === 'left') {
    return (
      <section className="book-page-content about-page about-left">

        <h2>ABOUT ME</h2>

          <div className="writer">
            <div className="text">
              <p>지은이</p>
              <h3>성혜나</h3>
            </div>

            <div className="imgbox">
              <img src={`${import.meta.env.BASE_URL}hn1.jpg`} alt="h1" />
            </div>
          </div>

          <div className="introduction">
            <h3>
              <span>이</span>야기를 화면에 담다 : Stories on Screen
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

      <p>
        프로필 이미지 또는 이력 정보가 들어가는 페이지입니다.
      </p>

    </section>
  )
}

export default AboutMe