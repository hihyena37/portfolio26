import './Thanks.css'

const Thanks = ({ side }) => {

  if (side === 'left') {
    return (
      <section className="book-page-content thanks-page thanks-left">

        <div className="thanks-quote">

          <span className="quote-mark">“</span>

          <blockquote>
            위대한 디자인은 반드시
            <br />
            이야기를 담고 있어야 한다.
          </blockquote>

          <p className="quote-author">
            — Sol Sender
          </p>

        </div>

      </section>
    )
  }


  return (
    <section className="book-page-content thanks-page thanks-right">

      <div className="thanks-message">

        <h2>
          THANK
          <br />
          YOU
        </h2>

        <p>
          포트폴리오를 봐주셔서 감사합니다.
        </p>

        <span className="thanks-signature">
          SEONG HYENA · 2026
        </span>

      </div>


      {/* 모바일에서는 왼쪽 페이지가 보이지 않으므로 명언을 작게 표시 */}
      <div className="thanks-mobile-quote">
        <p>
          “위대한 디자인은 반드시 이야기를 담고 있어야 한다.”
        </p>

        <span>
          — Sol Sender
        </span>
      </div>

    </section>
  )
}

export default Thanks