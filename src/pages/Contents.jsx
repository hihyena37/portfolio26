import './Contents.css'

const entries = [
  'ABOUT ME',
  'CONTENTS',
  ...Array.from({ length: 8 }, (_, index) =>
    `PROJECT ${String(index + 1).padStart(2, '0')}`
  ),
  'CONTACT',
  'THANK YOU',
]

const Contents = ({ side, onNavigate }) => (
  <section className={`book-page-content contents-page contents-${side}`}>
    <h2 className={side === 'left' ? undefined : 'mobile-page-title'}>CONTENTS</h2>

    {side === 'left' ?
      (
        <p>
          디자인과 코드로 완성한 여덟 가지 프로젝트를 한 장씩 펼쳐보세요.
        </p>
      ) : (
        <ol className="contents-list" start={0}>
          {entries.map((title, index) => (
            <li key={title}>
              <button
                type="button"
                onClick={() => onNavigate(index)}
                aria-current={index === 1 ? 'page' : undefined}
              >
                <span className="contents-number">
                  {index}장
                </span>

                <span>
                  {title}
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}

    {side === 'left' && (
      <div className="contents_imgbox">
        <img src={`${import.meta.env.BASE_URL}contents_img3.PNG`} alt="목차 일러스트" />
      </div>
    )}
  </section>
)

export default Contents
