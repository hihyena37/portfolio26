import React from 'react'

const Thanks = ({ side }) => {

  if (side === 'left') {
    return (
      <section className="book-page-content thanks-page thanks-left">

        <h2>
          THANK YOU
        </h2>

      </section>
    )
  }

  return (
    <section className="book-page-content thanks-page thanks-right">

      <p>
        포트폴리오를 봐주셔서 감사합니다.
      </p>

    </section>
  )
}

export default Thanks