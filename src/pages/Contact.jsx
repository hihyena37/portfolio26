import React from 'react'

const Contact = ({ side }) => {

  if (side === 'left') {
    return (
      <section className="book-page-content contact-page contact-left">

        <h2>
          CONTACT
        </h2>

        <p>
          함께 이야기하고 싶다면 연락해주세요.
        </p>

      </section>
    )
  }

  return (
    <section className="book-page-content contact-page contact-right">

      <p>
        EMAIL
      </p>

      <p>
        GITHUB
      </p>

      <p>
        PORTFOLIO
      </p>

    </section>
  )
}

export default Contact