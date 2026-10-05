import { useEffect, useRef, useState } from 'react'
import './ProjectPage.css'

const ProjectDetails = ({ project }) => (
  <div className="project-details">
    <p className="project-summary">{project.summary}</p>
    <dl className="project-meta">
      <div><dt>담당 역할</dt><dd>{project.role}</dd></div>
      <div><dt>기여도</dt><dd>100% · {project.workType || 'Personal Project'}</dd></div>
      <div><dt>사용 도구</dt><dd>{project.tools}</dd></div>
      {project.ai && <div><dt>AI 도구</dt><dd>{project.ai}</dd></div>}
    </dl>
  </div>
)

const ProjectPage = ({ projectNumber, side }) => {
  const scrollRef = useRef(null)
  const previewImageRef = useRef(null)
  const [showScrollHint, setShowScrollHint] = useState(false)

  useEffect(() => {
    if (side !== 'right') return
    const area = scrollRef.current
    const image = previewImageRef.current
    if (!area || !image) return
    const updateHint = () => {
      setShowScrollHint(area.scrollTop <= 1 && image.complete && image.naturalHeight > 0
        && area.clientHeight > 0 && area.scrollHeight > area.clientHeight + 2)
    }
    const onScroll = () => {
      updateHint()
    }
    const observer = new ResizeObserver(updateHint)
    observer.observe(area)
    observer.observe(image)
    const details = area.querySelector('.mobile-project-details')
    if (details) observer.observe(details)
    image.addEventListener('load', updateHint)
    image.addEventListener('error', updateHint)
    area.addEventListener('scroll', onScroll, { passive: true })
    updateHint()
    return () => {
      observer.disconnect()
      image.removeEventListener('load', updateHint)
      image.removeEventListener('error', updateHint)
      area.removeEventListener('scroll', onScroll)
    }
  }, [side, projectNumber])

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
      summary: '기존 기업 웹사이트를 새롭게 디자인하고, 반응형 웹으로 구현한 리디자인 프로젝트입니다.',
      role: '웹 디자인 · 퍼블리싱',
      tools: 'HTML · CSS · JavaScript · jQuery',
      ai: 'Codex',
      logo: `${import.meta.env.BASE_URL}logo1.png`,
      image: `${import.meta.env.BASE_URL}project1_full.png`,
      link: 'https://hihyena37.github.io/site/index.html'
    },
    {
      number: '02',
      title: '이솝 클론코딩',
      desc: 'RESPONSIVE CLONE CODING',
      summary: '이솝의 기존 웹사이트를 바탕으로 화면을 구현한 반응형 클론 코딩 프로젝트입니다.',
      role: '클론 코딩 · 퍼블리싱',
      tools: 'HTML · CSS · JavaScript · jQuery',
      ai: 'Codex',
      logo: `${import.meta.env.BASE_URL}logo2.png`,
      image: `${import.meta.env.BASE_URL}project2_full.jpg`,
      link: 'https://hihyena37.github.io/aesop/#'
    },
    {
      number: '03',
      title: '대한민국 축제 대시보드',
      desc: 'VIBE CODING · FESTIVAL DASHBOARD',
      summary: '대한민국 축제를 주제로 제작한 바이브 코딩 대시보드 프로젝트입니다.',
      role: 'AI 활용 웹 제작',
      tools: 'React',
      ai: 'Codex · Claude AI',
      logo: `${import.meta.env.BASE_URL}logo3.png`,
      image: `${import.meta.env.BASE_URL}project3_full.jpg`,
      link: 'https://hihyena37.github.io/Vibe_korea-festival-dashboard/',
      viewLabel: '사이트 보기'
    },
    {
      number: '04',
      title: '오늘 뭐먹지?',
      desc: 'VIBE CODING · REACT MEAL RECOMMENDATION',
      summary: '사용자가 선택한 조건을 바탕으로 오늘의 메뉴를 추천하는 창작 웹사이트입니다. AI를 활용한 바이브 코딩 방식으로 React 기반 인터랙티브 서비스를 구현했습니다.',
      role: 'AI 활용 웹 제작',
      tools: 'React',
      ai: 'Antigravity AI · Claude AI',
      logo: `${import.meta.env.BASE_URL}logo4.PNG`,
      image: `${import.meta.env.BASE_URL}project4_full.jpg`,
      link: 'https://hihyena37.github.io/Vibe_today-meal/'
    },
    {
      number: '05',
      title: '숲나들e',
      desc: 'UX/UI APP REDESIGN',
      summary: '기존 숲나들e 앱을 대상으로 화면을 새롭게 디자인한 UX/UI 리디자인 프로젝트입니다.',
      role: '앱 UX/UI 리디자인',
      tools: 'Figma · Photoshop',
      ai: 'Codex',
      logo: `${import.meta.env.BASE_URL}logo5.png`,
      image: `${import.meta.env.BASE_URL}project5_full.jpg`,
      link: `${import.meta.env.BASE_URL}project5_pdf.pdf`
    },
    {
      number: '06',
      title: '방과후ON',
      desc: 'UX/UI APP DESIGN',
      summary: '방과후ON이라는 새로운 앱의 화면을 디자인한 창작 UX/UI 프로젝트입니다.',
      role: '앱 UX/UI 디자인',
      tools: 'Figma · Photoshop · Illustrator',
      ai: '',
      logo: `${import.meta.env.BASE_URL}logo6.png`,
      image: `${import.meta.env.BASE_URL}project6_full.jpg`,
      link: `${import.meta.env.BASE_URL}project6_pdf.pdf`
    },
    {
      number: '07',
      title: '그레인온 카무트효소',
      desc: 'PRODUCT DETAIL PAGE',
      summary: '그레인온 카무트효소의 기존 상품 상세페이지를 새롭게 디자인한 프로젝트입니다.',
      role: '상세페이지 리디자인',
      tools: 'Figma · Photoshop',
      ai: 'Codex',
      logo: `${import.meta.env.BASE_URL}logo7.png`,
      image: `${import.meta.env.BASE_URL}project7_full.jpg`,
      link: 'https://example.com'
    },
    {
      number: '08',
      title: '일룸 아코 소파',
      desc: 'PRODUCT DETAIL PAGE',
      summary: '일룸 아코 소파의 기존 상품 상세페이지를 새롭게 디자인한 프로젝트입니다.',
      role: '상세페이지 리디자인',
      tools: 'Figma · Photoshop',
      ai: 'Codex',
      logo: `${import.meta.env.BASE_URL}logo8.png`,
      image: `${import.meta.env.BASE_URL}project8_full.jpg`,
      link: 'https://example.com'
    },
    {
      number: '09',
      workType: 'Client Work',
      title: '네트워킹 DAY',
      desc: '㈜클라인 외주작업 · POSTER & BANNER DESIGN',
      summary: '㈜클라인의 외주 의뢰로 제작한 네트워킹 DAY 포스터와 배너 디자인 프로젝트입니다.',
      role: '포스터 · 배너 디자인',
      tools: 'Figma · Photoshop',
      ai: 'Codex',
      logo: `${import.meta.env.BASE_URL}logo9.png`,
      image: `${import.meta.env.BASE_URL}project9_full.png`,
      link: `${import.meta.env.BASE_URL}project9_pdf.pdf`
    }
  ]

  const project = projects[projectNumber - 1]
  const hasProjectLink = project.link && !project.link.startsWith('https://example.com')
  const isPdfPending = projectNumber === 5 && !hasProjectLink
  const viewUrl = hasProjectLink ? project.link : project.image
  const viewLabel = project.viewLabel || (isPdfPending ? '작업 PDF 보기' : !hasProjectLink
    ? '작업 이미지 크게 보기'
    : project.link.endsWith('.pdf') ? '작업 PDF 보기' : '사이트 보기')

  if (side === 'left') {
    return (
      <section className="project-page project-left">

        <div className="project-info" ref={scrollRef} tabIndex={0} aria-label="프로젝트 소개">
          <span className="project-number">
            WORK {project.number}
          </span>

          <h2 className="project-title">
            {project.title}
          </h2>

          <p className='project-desc'>
            {project.desc}
          </p>

          <ProjectDetails project={project} />

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
            WORK {project.number}
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


      <div className="project-preview-frame">
      <div className={`project-preview-scroll${projectNumber === 4 ? ' project-preview-fill' : ''}`} ref={scrollRef}>
        <details className="mobile-project-details">
          <summary>프로젝트 소개 · 담당 역할</summary>
          <ProjectDetails project={project} />
        </details>

      {/* 프로젝트 이미지 */}
      <div className="project-link">
        <div className="project-image">
          <img
            src={project.image}
            ref={previewImageRef}
            alt={`${project.title} 프로젝트 미리보기`}
          />
        </div>
      </div>
      </div>

      {showScrollHint && (
        <div className="project-scroll-hint" role="img" aria-label="아래로 스크롤하여 작업 더 보기">
          <i className="bi bi-mouse" aria-hidden="true"></i>
        </div>
      )}
      </div>

      <div className="project-actions">
        {isPdfPending ? (
          <button className="project-view-button" type="button" disabled>
            <span>{viewLabel}</span>
            <i className="bi bi-file-earmark-pdf" aria-hidden="true"></i>
          </button>
        ) : (
        <a className="project-view-button" href={viewUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`${project.title} ${viewLabel} (새 탭)`}>
          <span>{viewLabel}</span>
          <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
        </a>
        )}
        <span className="project-view-hint">{isPdfPending ? 'PDF 준비 중' : '새 탭에서 열립니다'}</span>
      </div>

    </section>
  )
}

export default ProjectPage
