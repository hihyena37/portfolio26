import React from 'react'

const AboutMe = ({ side }) => {

  if (side === 'left') {
    return (
      <section className="book-page-content about-page about-left">

        <h2>
          ABOUT ME
        </h2>

        <p>
          자기소개가 들어가는 페이지입니다.
        </p>

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