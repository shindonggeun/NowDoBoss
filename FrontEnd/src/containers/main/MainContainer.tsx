import * as m from '@src/containers/main/MainContainerStyle'
import MainIntroContainer from '@src/containers/main/MainIntroContainer'
import MainStatusContainer from '@src/containers/main/MainStatusContainer'
import MainAnalysisContainer from '@src/containers/main/MainAnalysisContainer'
import MainRecommendContainer from '@src/containers/main/MainRecommendContainer'
import MainMoreContainer from '@src/containers/main/MainMoreContainer'
import { useEffect, useRef } from 'react'

const MainContainer = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  // 해당 컨테이너가 top을 찍었을 때 스크롤이 카드에 적용되도록 하는 로직
  useEffect(() => {
    const currentRef = targetRef.current

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
        threshold: 0.1,
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
  }, [targetRef])

  return (
    <m.MainContainer>
      <MainIntroContainer />
      <MainStatusContainer />
      <MainAnalysisContainer />
      <m.Recommend ref={targetRef}>
        <MainRecommendContainer />
      </m.Recommend>
      <MainMoreContainer />
    </m.MainContainer>
  )
}

export default MainContainer
