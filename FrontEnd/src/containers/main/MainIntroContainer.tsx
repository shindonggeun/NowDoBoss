import * as i from '@src/containers/main/MainIntroContainerStyle'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const MainIntroContainer = () => {
  const navigate = useNavigate()
  const subRef = useRef(null)

  useEffect(() => {
    const currentRef = subRef.current

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      },
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [subRef])

  return (
    <i.Container>
      <i.Main>
        <i.MainContent>
          서울시 상권을 한눈에!
          <br />
          상권분석의 A부터 Z까지,
          <br /> <b>NowDoBoss</b>와 함께하세요.
        </i.MainContent>
        <i.ButtonDiv>
          <i.MainButton
            onClick={() => {
              navigate('/analysis')
            }}
          >
            상권 분석하기
          </i.MainButton>
          <i.MainButton
            onClick={() => {
              navigate('/analysis/simulation')
            }}
          >
            창업 시뮬레이션
          </i.MainButton>
        </i.ButtonDiv>
      </i.Main>
      <i.Sub>
        <i.SubContent ref={subRef}>
          서울의 상권 정보를 쉽게 파악하고 최적의 입지를 발견하세요.
          <br />
          지금까지 없었던 직관적이고 혁신적인 상권 분석 서비스,
          <br />
          저희와 함께라면 당신의 창업 준비 과정이 변화될 것입니다.
          <br />
          상권 추천부터 창업 시뮬레이션까지, 예비 창업자의 든든한 동반자가 되어
          드립니다.
        </i.SubContent>
      </i.Sub>
    </i.Container>
  )
}
export default MainIntroContainer
