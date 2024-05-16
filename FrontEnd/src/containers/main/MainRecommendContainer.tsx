import * as m from '@src/containers/main/MainContainerStyle'
import { useEffect, useRef, useState } from 'react'

const MainRecommendContainer = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const cardScrollRef = useRef<HTMLDivElement>(null)
  const [isTopPassed, setIsTopPassed] = useState(false)
  const [isBottomReached, setIsBottomReached] = useState(false)

  // 해당 컨테이너가 top을 찍었을 때 스크롤이 카드에 적용되도록 하는 로직
  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect()
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

  // 카드 목록 스크롤이 맨 밑에 도달했을 때
  useEffect(() => {
    const CurrentScrollRef = cardScrollRef.current

    const handleCardScroll = () => {
      if (CurrentScrollRef) {
        const { scrollTop, scrollHeight, clientHeight } = cardScrollRef.current
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
  }, [])

  // isTopPassed 값이 true이면 카드 scroll 내부가 스크롤 되게 하는 로직
  useEffect(() => {
    const handleGlobalWheel = (event: WheelEvent) => {
      if (isTopPassed && !isBottomReached && cardScrollRef.current) {
        event.preventDefault()
        cardScrollRef.current.scrollBy({
          top: event.deltaY,
        })
      }
    }

    window.addEventListener('wheel', handleGlobalWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel)
    }
  }, [isTopPassed, isBottomReached])

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
            <m.Card>
              <m.CardImg src="images/recommendGoo.png" />
              자치구 선택
            </m.Card>
            <m.Card>
              <m.CardImg src="images/recommendDong.png" />
              행정동 선택
            </m.Card>
            <m.Card>
              <m.CardImg src="images/recommendCommercial.png" />
              상권 선택
            </m.Card>
            {/* <m.Card>카드</m.Card> */}
            {/* <m.Card>카드</m.Card> */}
          </m.CardScroll>
        </m.CardList>
      </m.Content>
    </m.Container>
  )
}

export default MainRecommendContainer
