import * as m from '@src/containers/main/MainContainerStyle'
import { useEffect, useRef, useState } from 'react'

const MainRecommendContainer = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const cardScrollRef = useRef<HTMLDivElement>(null)
  const lastCardRef = useRef<HTMLDivElement>(null)
  const [isTopPassed, setIsTopPassed] = useState(false)

  useEffect(() => {
    const lastCardElement = lastCardRef.current // 렌더링 시점의 lastCardRef.current를 변수에 할당

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.8) {
            // lastCard가 완전히 보일 때만 isTopPassed를 false로 설정
            setIsTopPassed(false)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )

    if (lastCardElement) {
      observer.observe(lastCardElement)
    }

    return () => {
      if (lastCardElement) {
        observer.unobserve(lastCardElement)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect()
        // 해당 targetRef의 top과 내가 보고있는 top을 비교하는 부분
        if (rect.top < 150) {
          setIsTopPassed(true)
        } else {
          setIsTopPassed(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleGlobalWheel = (event: WheelEvent) => {
      if (isTopPassed && cardScrollRef.current) {
        // 방지하는 것을 주석처리하여 페이지 전체 스크롤을 방지하지 않습니다.
        event.preventDefault()
        cardScrollRef.current.scrollBy({
          top: event.deltaY, // deltaY 값으로 세로 스크롤
          // behavior: 'smooth', // 부드러운 스크롤
        })
      }
    }

    window.addEventListener('wheel', handleGlobalWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel)
    }
  }, [isTopPassed])

  return (
    <m.Container ref={targetRef}>
      <m.Content>
        <m.Text>
          <m.BlueText>Market Recommend Report</m.BlueText>
          <m.Title>상권추천 보고서</m.Title>
          <m.TextContent>
            지도에서 원하는 지역을 선택, <br />
            창업 조건에 유리한 상권을 <br />
            지금 바로 추천받아 보세요 <br />
          </m.TextContent>
        </m.Text>
        <m.CardList>
          <m.CardScroll ref={cardScrollRef}>
            <m.Card>카드</m.Card>
            <m.Card>카드</m.Card>
            <m.Card>카드</m.Card>
            <m.Card>카드</m.Card>
            <m.Card ref={lastCardRef}>카드</m.Card>
          </m.CardScroll>
        </m.CardList>
      </m.Content>
    </m.Container>
  )
}

export default MainRecommendContainer
