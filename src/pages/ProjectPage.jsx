import React from 'react'
import './ProjectPage.css'

const ProjectPage = ({ projectNumber, side }) => {
  const projects = [
    {
      number: '01',
      title: 'PROJECT 01',
      link: 'https://example.com'
    },
    {
      number: '02',
      title: 'PROJECT 02',
      link: 'https://example.com'
    },
    {
      number: '03',
      title: 'PROJECT 03',
      link: 'https://example.com'
    },
    {
      number: '04',
      title: 'PROJECT 04',
      link: 'https://example.com'
    },
    {
      number: '05',
      title: 'PROJECT 05',
      link: 'https://example.com'
    },
    {
      number: '06',
      title: 'PROJECT 06',
      link: 'https://example.com'
    },
    {
      number: '07',
      title: 'PROJECT 07',
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

          <div className="project-logo">
            LOGO
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
          LOGO
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