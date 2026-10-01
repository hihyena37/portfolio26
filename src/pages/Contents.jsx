import './Contents.css'

const entries = [
  'ABOUT ME',
  'CONTENTS',
  'Web Redesign',
  'Aesop Clone Coding',
  'Meal Picker · Vibe Coding',
  '숲나들e · App Redesign',
  '방과후ON · App Design',
  'Kamut Enzyme · Detail Page',
  'Aco Sofa · Detail Page',
  'Networking Day · Poster & Banner',
  'CONTACT',
  'THANK YOU',
]

const Contents = ({ side, onNavigate }) => (
  <section className={`book-page-content contents-page contents-${side}`}>
    <h2 className={side === 'left' ? undefined : 'mobile-page-title'}>CONTENTS</h2>

    {side === 'left' ?
      (
        <p>
          디자인과 코드로 완성한 여덟 가지 작업을 한 장씩 펼쳐보세요.
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
                  {index >= 2 && index <= 9
                    ? `WORK ${String(index - 1).padStart(2, '0')} · ${title}`
                    : title}
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}

    {side === 'left' && (
      <div className="contents_imgbox">
        <img src={`${import.meta.env.BASE_URL}book.gif`} alt="목차 일러스트" />
      </div>
    )}
  </section>
)

export default Contents
