import React from 'react'
import './ProjectPage.css'

const ProjectPage = ({ projectNumber, side }) => {
  const projects = [
    {
      number: '01',
      title: '㈜영풍',
      desc: 'RESPONSIVE WEB DESIGN & PUBLISHING',
      logo: `${import.meta.env.BASE_URL}logo1.png`,
      link: 'https://example.com'
    },
    {
      number: '02',
      title: '이솝 클론코딩',
      desc: 'RESPONSIVE CLONE CODING',
      logo: `${import.meta.env.BASE_URL}logo2.png`,
      link: 'https://example.com'
    },
    {
      number: '03',
      title: '방꾸미기 게임',
      desc: 'REACT INTERACTIVE WEB',
      logo: `${import.meta.env.BASE_URL}logo3.PNG`,
      link: 'https://example.com'
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
      link: 'https://example.com'
    },
    {
      number: '06',
      title: '카무트 효소',
      desc: 'PRODUCT DETAIL PAGE',
      logo: `${import.meta.env.BASE_URL}logo6.png`,
      link: 'https://example.com'
    },
    {
      number: '07',
      title: '아코소파',
      desc: 'PRODUCT DETAIL PAGE',
      logo: `${import.meta.env.BASE_URL}logo7.png`,
      link: 'https://example.com'
    },
    {
      number: '08',
      title: '네트워킹 DAY',
      desc: 'POSTER & BANNER DESIGN',
      logo: `${import.meta.env.BASE_URL}logo8.png`,
      link: 'https://example.com'
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
      >
        <div className="project-image">
          PROJECT IMAGE
        </div>
      </a>

    </section>
  )
}

export default ProjectPage
