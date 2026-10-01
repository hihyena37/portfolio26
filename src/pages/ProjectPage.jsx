import { useEffect, useRef } from 'react'
import './ProjectPage.css'

const ProjectPage = ({ projectNumber, side }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    const area = scrollRef.current
    if (!area) return

    // 3D 책 페이지 안에서 휠 입력을 이미지 스크롤에 전달
    const handleWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      if (area.scrollHeight <= area.clientHeight) return

      const unit = event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? area.clientHeight : 1
      event.preventDefault()
      area.scrollTop += event.deltaY * unit
    }

    area.addEventListener('wheel', handleWheel, { passive: false })
    return () => area.removeEventListener('wheel', handleWheel)
  }, [side, projectNumber])

  const projects = [
    {
      number: '01',
      title: '㈜영풍',
      desc: 'RESPONSIVE WEB DESIGN & PUBLISHING',
      logo: `${import.meta.env.BASE_URL}logo1.png`,
      image: `${import.meta.env.BASE_URL}project1_full.png`,
      link: 'https://hihyena37.github.io/site/index.html'
    },
    {
      number: '02',
      title: '이솝 클론코딩',
      desc: 'RESPONSIVE CLONE CODING',
      logo: `${import.meta.env.BASE_URL}logo2.png`,
      image: `${import.meta.env.BASE_URL}project2_full.jpg`,
      link: 'https://hihyena37.github.io/aesop/#'
    },
    {
      number: '03',
      title: '오늘 뭐먹지?',
      desc: 'VIBE CODING-REACT RANDOM MEAL PICKER',
      logo: `${import.meta.env.BASE_URL}logo3.PNG`,
      image: `${import.meta.env.BASE_URL}project3_full.jpg`,
      link: 'https://hihyena37.github.io/Vibe_today-meal/'
    },
    {
      number: '04',
      title: '숲나들e',
      desc: 'UX/UI APP REDESIGN',
      logo: `${import.meta.env.BASE_URL}logo4.png`,
      link: 'https://example.com'
    },
    {
      number: '05',
      title: '방과후ON',
      desc: 'UX/UI APP DESIGN',
      logo: `${import.meta.env.BASE_URL}logo5.png`,
      image: `${import.meta.env.BASE_URL}project5_full.jpg`,
      link: `${import.meta.env.BASE_URL}project5_pdf.pdf`
    },
    {
      number: '06',
      title: '카무트 효소',
      desc: 'PRODUCT DETAIL PAGE',
      logo: `${import.meta.env.BASE_URL}logo6.png`,
      image: `${import.meta.env.BASE_URL}project6_full.jpg`,
      link: 'https://example.com'
    },
    {
      number: '07',
      title: '아코소파',
      desc: 'PRODUCT DETAIL PAGE',
      logo: `${import.meta.env.BASE_URL}logo7.png`,
      image: `${import.meta.env.BASE_URL}project7_full.jpg`,
      link: 'https://example.com'
    },
    {
      number: '08',
      title: '네트워킹 DAY',
      desc: '㈜클라인 외주작업 · POSTER & BANNER DESIGN',
      logo: `${import.meta.env.BASE_URL}logo8.png`,
      image: `${import.meta.env.BASE_URL}project8_full.png`,
      link: `${import.meta.env.BASE_URL}project8_pdf.pdf`
    }
  ]

  const project = projects[projectNumber - 1]

  if (side === 'left') {
    return (
      <section className="project-page project-left">

        <div className="project-info">
          <span className="project-number">
            PROJECT {project.number}
          </span>

          <h2 className="project-title">
            {project.title}
          </h2>

          <p className='project-desc'>
            {project.desc}
          </p>

          <div className="project-logo">
            <img
              src={project.logo}
              alt={`${project.title} 로고`}
            />
          </div>
        </div>

      </section>
    )
  }

  return (
    <section className="project-page project-right">

      {/* 모바일에서만 보일 프로젝트 정보 */}
      <div className="mobile-project-info">

        <div>
          <span className="project-number">
            PROJECT {project.number}
          </span>

          <h2 className="project-title">
            {project.title}
          </h2>
        </div>

        <div className="project-logo">
          <img
            src={project.logo}
            alt={`${project.title} 로고`}
          />
        </div>

      </div>


      {/* 프로젝트 이미지 */}
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="project-link"
        ref={scrollRef}
      >
        <div className="project-image">
          <img
            src={project.image}
            alt={`${project.title} 프로젝트 미리보기`}
          />
        </div>
      </a>

    </section>
  )
}

export default ProjectPage
