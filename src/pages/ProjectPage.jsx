import { memo, useEffect, useRef, useState } from 'react'
import './ProjectPage.css'
import useWheelScroll from '../hooks/useWheelScroll'
import useMediaQuery from '../hooks/useMediaQuery'

// 돋보기: 최대 지름(px, 책 축소 비율 기준)과 확대 배율
// 이미지 표시 영역이 좁으면 그 안에 들어오도록 지름을 줄입니다.
const MAGNIFIER_SIZE = 300
const MAGNIFIER_ZOOM = 2
// hover와 정밀 포인터가 있는 태블릿 이상에서만 켭니다.
const magnifierQuery = '(min-width: 768px) and (hover: hover) and (pointer: fine)'


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
    summary: '사용자가 선택한 조건을 바탕으로 오늘의 메뉴를 추천하는 바이브코딩 웹 사이트입니다.',
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
    image: `${import.meta.env.BASE_URL}optimized/project5_full.png`,
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
    image: `${import.meta.env.BASE_URL}optimized/project6_full.png`,
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
    image: `${import.meta.env.BASE_URL}optimized/project7_full.png`,
    link: 'https://www.figma.com/design/qKwzvzmZKPVEtgvyx6VI2d/%EC%83%81%EC%84%B8%ED%8E%98%EC%9D%B4%EC%A7%80?node-id=0-1&t=RfNSPCo5W8lDyZZh-1',
    viewLabel: '피그마로 보기'
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
    link: 'https://www.figma.com/design/qKwzvzmZKPVEtgvyx6VI2d/%EC%83%81%EC%84%B8%ED%8E%98%EC%9D%B4%EC%A7%80?node-id=1-538&t=RfNSPCo5W8lDyZZh-1',
    viewLabel: '피그마로 보기'
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

const ProjectPage = ({ projectNumber, side, magnify = false }) => {
  const scrollRef = useRef(null)
  const previewImageRef = useRef(null)
  const frameRef = useRef(null)
  const magnifierLayerRef = useRef(null)
  const magnifierRef = useRef(null)
  const magnifierImageRef = useRef(null)
  const pointerRef = useRef(null)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const [isMagnifying, setIsMagnifying] = useState(false)
  const magnifierSupported = useMediaQuery(magnifierQuery)
  // 현재 펼쳐진 오른쪽 페이지에서만 동작하며, 미니북 미리보기는 magnify가 없어 제외됩니다.
  const magnifierOn = side === 'right' && magnify && magnifierSupported
  const showMagnifier = magnifierOn && isMagnifying

  useEffect(() => {
    if (!magnifierOn) return
    const frame = frameRef.current
    const area = scrollRef.current
    const image = previewImageRef.current
    const layer = magnifierLayerRef.current
    const magnifier = magnifierRef.current
    const lensImage = magnifierImageRef.current
    if (!frame || !area || !image || !layer || !magnifier || !lensImage) return

    let frameRequest = 0
    const hide = () => {
      window.cancelAnimationFrame(frameRequest)
      frameRequest = 0
      pointerRef.current = null
      setIsMagnifying(false)
    }

    const update = () => {
      const point = pointerRef.current
      if (!point) return
      if (!image.naturalWidth || !frame.offsetWidth) {
        hide()
        return
      }

      // PC의 CSS zoom 등으로 화면 크기와 레이아웃 크기가 다를 수 있어 실제 표시 배율로 환산합니다.
      const frameRect = frame.getBoundingClientRect()
      const scale = frameRect.width / frame.offsetWidth || 1
      const toX = (value) => (value - frameRect.left) / scale
      const toY = (value) => (value - frameRect.top) / scale
      const imageRect = image.getBoundingClientRect()
      const areaRect = area.getBoundingClientRect()

      const imageLeft = toX(imageRect.left)
      const imageTop = toY(imageRect.top)
      const imageWidth = imageRect.width / scale
      const imageHeight = imageRect.height / scale

      // 스크롤 영역 안에서 실제로 보이는 이미지 부분(스크롤바 제외)
      const areaLeft = toX(areaRect.left) + area.clientLeft
      const areaTop = toY(areaRect.top) + area.clientTop
      const visibleLeft = Math.max(imageLeft, areaLeft)
      const visibleTop = Math.max(imageTop, areaTop)
      const visibleRight = Math.min(imageLeft + imageWidth, areaLeft + area.clientWidth)
      const visibleBottom = Math.min(imageTop + imageHeight, areaTop + area.clientHeight)

      const x = toX(point.x)
      const y = toY(point.y)
      if (x < visibleLeft || x > visibleRight || y < visibleTop || y > visibleBottom) {
        setIsMagnifying(false)
        return
      }

      // object-fit: cover, object-position: center top 기준으로 그려진 이미지 영역
      const drawScale = Math.max(imageWidth / image.naturalWidth, imageHeight / image.naturalHeight)
      const drawnWidth = image.naturalWidth * drawScale
      const drawnHeight = image.naturalHeight * drawScale
      const contentX = x - imageLeft - (imageWidth - drawnWidth) / 2
      const contentY = y - imageTop

      // 레이어를 보이는 이미지 영역에 맞춰 잘라 가장자리에서도 빈 배경이 보이지 않게 합니다.
      Object.assign(layer.style, {
        left: `${visibleLeft}px`,
        top: `${visibleTop}px`,
        width: `${visibleRight - visibleLeft}px`,
        height: `${visibleBottom - visibleTop}px`,
      })

      const size = Math.min(MAGNIFIER_SIZE, visibleRight - visibleLeft, visibleBottom - visibleTop)
      const radius = size / 2
      magnifier.style.setProperty('--magnifier-size', `${size}px`)
      magnifier.style.transform = `translate(${x - visibleLeft - radius}px, ${y - visibleTop - radius}px)`
      // 배지가 오른쪽·아래 가장자리에서 잘리면 반대쪽 테두리로 옮깁니다.
      const badgeReach = radius * 0.78 + 16
      magnifier.style.setProperty('--badge-x', x + badgeReach > visibleRight ? -1 : 1)
      magnifier.style.setProperty('--badge-y', y + badgeReach > visibleBottom ? -1 : 1)
      // 아주 긴 이미지(숲나들e·방과후ON 등)도 매번 다시 그리지 않도록
      // 렌즈 안 이미지는 크기가 바뀔 때만 갱신하고 위치는 transform으로만 옮깁니다.
      const zoomedWidth = `${drawnWidth * MAGNIFIER_ZOOM}px`
      const zoomedHeight = `${drawnHeight * MAGNIFIER_ZOOM}px`
      if (lensImage.style.width !== zoomedWidth) lensImage.style.width = zoomedWidth
      if (lensImage.style.height !== zoomedHeight) lensImage.style.height = zoomedHeight
      lensImage.style.transform =
        `translate3d(${radius - contentX * MAGNIFIER_ZOOM}px, ${radius - contentY * MAGNIFIER_ZOOM}px, 0)`
      setIsMagnifying(true)
    }

    // 마우스 이벤트가 프레임보다 자주 와도 화면 갱신당 한 번만 계산합니다.
    const scheduleUpdate = () => {
      if (frameRequest) return
      frameRequest = window.requestAnimationFrame(() => {
        frameRequest = 0
        update()
      })
    }

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') {
        hide()
        return
      }
      pointerRef.current = { x: event.clientX, y: event.clientY }
      scheduleUpdate()
    }

    area.addEventListener('pointermove', onPointerMove)
    area.addEventListener('pointerleave', hide)
    // 휠 스크롤 뒤에도 커서 아래 위치를 다시 계산합니다.
    area.addEventListener('scroll', scheduleUpdate, { passive: true })
    // 창 크기나 책 배율이 바뀌면 이전 좌표의 돋보기를 숨깁니다.
    const resizeObserver = new ResizeObserver(hide)
    resizeObserver.observe(frame)
    resizeObserver.observe(image)
    window.addEventListener('resize', hide)
    window.addEventListener('blur', hide)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', hide)
      window.removeEventListener('blur', hide)
      window.removeEventListener('scroll', scheduleUpdate)
      area.removeEventListener('pointermove', onPointerMove)
      area.removeEventListener('pointerleave', hide)
      area.removeEventListener('scroll', scheduleUpdate)
      hide()
    }
  }, [magnifierOn, projectNumber])

  useEffect(() => {
    if (side !== 'right') return
    const area = scrollRef.current
    const image = previewImageRef.current
    if (!area || !image) return
    const updateHint = () => {
      setShowScrollHint(area.scrollTop <= 1 && image.complete && image.naturalHeight > 0
        && area.clientHeight > 0 && area.scrollHeight > area.clientHeight + 2)
    }
    const observer = new ResizeObserver(updateHint)
    observer.observe(area)
    observer.observe(image)
    const details = area.querySelector('.mobile-project-details')
    if (details) observer.observe(details)
    image.addEventListener('load', updateHint)
    image.addEventListener('error', updateHint)
    area.addEventListener('scroll', updateHint, { passive: true })
    updateHint()
    return () => {
      observer.disconnect()
      image.removeEventListener('load', updateHint)
      image.removeEventListener('error', updateHint)
      area.removeEventListener('scroll', updateHint)
    }
  }, [side, projectNumber])

  useWheelScroll(scrollRef, true, `${side}-${projectNumber}`)

  const project = projects[projectNumber - 1]
  const hasProjectLink = project.link && !project.link.startsWith('https://example.com')
  const viewUrl = hasProjectLink ? project.link : project.image
  const viewLabel = project.viewLabel || (!hasProjectLink
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


      <div className="project-preview-frame" ref={frameRef}>
      <div
        className={`project-preview-scroll${projectNumber === 4 ? ' project-preview-fill' : ''}${showMagnifier ? ' is-magnifying' : ''}`}
        ref={scrollRef}
      >
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
            decoding="async"
            alt={`${project.title} 프로젝트 미리보기`}
          />
        </div>
      </div>
      </div>

      {magnifierOn && (
        <div
          className={`project-magnifier-layer${showMagnifier ? ' is-active' : ''}`}
          ref={magnifierLayerRef}
          aria-hidden="true"
        >
          <div className="project-magnifier" ref={magnifierRef}>
            <div className="project-magnifier-lens">
              <img src={project.image} ref={magnifierImageRef} alt="" draggable={false} />
            </div>
            <span className="project-magnifier-badge">
              <i className="bi bi-zoom-in"></i>
            </span>
          </div>
        </div>
      )}

      {showScrollHint && !showMagnifier && (
        <div className="project-scroll-hint" role="img" aria-label="아래로 스크롤하여 작업 더 보기">
          <i className="bi bi-mouse" aria-hidden="true"></i>
        </div>
      )}
      </div>

      <div className="project-actions">
        <a className="project-view-button" href={viewUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`${project.title} ${viewLabel} (새 탭)`}>
          <span>{viewLabel}</span>
          <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
        </a>
        <span className="project-view-hint">새 탭에서 열립니다</span>
      </div>

    </section>
  )
}

export default memo(ProjectPage)
