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
    {side === 'left' && (
      <h2>CONTENTS</h2>
    )}

    {side === 'left' ?
      (
        <p>
          소개부터 여덟 가지 프로젝트까지, 저의 작업을 만나보세요.
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
