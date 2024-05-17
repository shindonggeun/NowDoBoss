import * as m from '@src/containers/main/MainContainerStyle'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MainRecommendContainer = () => {
  const navigate = useNavigate()
  const targetRef = useRef<HTMLDivElement>(null)
  const cardScrollRef = useRef<HTMLDivElement>(null)
  const [isTopPassed, setIsTopPassed] = useState(false)
  const [isBottomReached, setIsBottomReached] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  // 해당 컨테이너가 top을 찍었을 때 스크롤이 카드에 적용되도록 하는 로직
  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect()
        // rect.top이 -150에서 150일 때, 현재 화면에서 해당 위치에 있을 때만 활성화하면 되네 ㅠㅠ
        if (rect.top < 150 && rect.top > -150) {
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

  // 카드 목록 스크롤이 맨 밑에 도달했을 때
  useEffect(() => {
    const CurrentScrollRef = cardScrollRef.current

    const handleCardScroll = () => {
      if (CurrentScrollRef) {
        const { scrollTop, scrollHeight, clientHeight } = cardScrollRef.current
        // 스크롤이 최상단 도달했을 때
        setIsAtTop(scrollTop === 0)
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
          // 스크롤이 최하단에 도달했을 때
          setIsBottomReached(true)
        } else {
          setIsBottomReached(false)
        }
      }
    }

    CurrentScrollRef?.addEventListener('scroll', handleCardScroll)
    return () => {
      CurrentScrollRef?.removeEventListener('scroll', handleCardScroll)
    }
  }, [isAtTop, isBottomReached, isTopPassed])

  // isTopPassed 값이 true이면 카드 scroll 내부가 스크롤 되게 하는 로직
  useEffect(() => {
    const handleGlobalWheel = (event: WheelEvent) => {
      if (isTopPassed && cardScrollRef.current) {
        event.preventDefault()
        cardScrollRef.current.scrollBy({
          top: event.deltaY * 1.5,
          behavior: 'smooth',
        })
      }
      if (isAtTop || isBottomReached) {
        setIsTopPassed(false)
        window.removeEventListener('wheel', handleGlobalWheel)
      }
    }

    window.addEventListener('wheel', handleGlobalWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel)
    }
  }, [isTopPassed, isBottomReached, isAtTop])

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
          <m.GoButton onClick={() => navigate('/recommend')}>
            추천받으러 가기 &nbsp;&nbsp;
            <m.BannerArrow>→</m.BannerArrow>{' '}
          </m.GoButton>
        </m.Text>
        <m.CardList>
          <m.CardScroll ref={cardScrollRef}>
            <m.Card>
              <m.CardImg src="images/recommend_map.png" />
              <m.CardContent>지역 선택 →</m.CardContent>
            </m.Card>
            <m.Card>
              <m.CardImg src="images/recommend_summary.png" />
              <m.CardContent>추천 상권 요약</m.CardContent>
            </m.Card>
            <m.Card>
              <m.CardImg src="images/recommend_box.png" />
              <m.CardContent>타 상권 비교</m.CardContent>
            </m.Card>
            <m.Card>
              <m.CardImg src="images/recommend_blueocean.png" />
              <m.CardContent>블루오션 Top5</m.CardContent>
            </m.Card>
          </m.CardScroll>
        </m.CardList>
      </m.Content>
    </m.Container>
  )
}

export default MainRecommendContainer
