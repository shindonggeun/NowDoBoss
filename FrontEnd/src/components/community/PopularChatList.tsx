import * as p from '@src/components/styles/community/CommunityStyle'
import Slider from 'react-slick'
import { useEffect, useRef, useState } from 'react'
import useCommunityStore from '@src/stores/communityStore'

const PopularChatList = () => {
  const categories = useCommunityStore(state => state.categories)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // 화면 크기에 따라 slidesToShow 값을 설정하는 함수
  const getSlidesToShow = () => {
    if (windowWidth < 768) {
      // 예를 들어 화면 너비가 768px 미만일 경우
      return 1
    }
    return 2 // 기본값은 2로 설정
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  // slider 옆으로 넘기기 위한 ref 상태
  const sliderRef = useRef<Slider | null>(null)

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  }
  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext()
    }
  }

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev()
    }
  }

  const ChatCardDatas = [
    {
      id: 1,
      badge: '채팅방',
      title: '강창모 (강동구 창업자들의 모임)',
      content:
        '강동구 사장님, 예비사장님들의 모임입니다. 부담 가지지 말고 들어오세요 :)',
      category: '이모저모',
      subContent: '인원 24 / 50',
    },
    {
      id: 2,
      badge: '채팅방',
      title: '잡담수다방',
      content:
        '강동구 사장님, 예비사장님들의 모임입니다. 부담 가지지 말고 들어오세요 :)',
      category: '인테리어',
      subContent: '인원 24 / 50',
    },
    {
      id: 3,
      badge: '채팅방',
      title: '강남모임',
      content: '강남 사장 모임입니다 ㅎㅎ 누구든 들오세유',
      category: '창업고민',
      subContent: '인원 24 / 50',
    },
    {
      id: 4,
      badge: '채팅방',
      title: '논현 게주아',
      content: '논현동 사장님, 예비사장님들의 모임입니다. 일단 드루와!',
      category: '동업제안',
      subContent: '인원 8 / 50',
    },
  ]

  return (
    <p.Container>
      {/* 상단 */}
      <p.Context>
        <p.LeftGrid>
          <p.Title>인기 채팅방</p.Title>
          <p.CreateButton>채팅방 생성하기</p.CreateButton>
        </p.LeftGrid>
        <p.Sub>창업에 관심있는 멤버들과 함께 이야기를 나눠보세요!</p.Sub>
        <p.ArrowDiv>
          <p.ArrowButton
            src="/src/assets/arrow_left.svg"
            alt=""
            onClick={prevSlide}
          />
          <p.ArrowButton
            src="/src/assets/arrow_right.svg"
            alt=""
            onClick={nextSlide}
          />
        </p.ArrowDiv>
      </p.Context>
      <p.Slick className="slider-container">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Slider {...settings} ref={sliderRef}>
          {ChatCardDatas.map(ChatCardData => {
            // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
            const matchedCategory = categories.find(
              category => category.name === ChatCardData.category,
            )
            const iconSrc = matchedCategory ? matchedCategory.iconInactive : ''

            return (
              <p.SlickChild key={ChatCardData.id}>
                <p.ChatCard>
                  <p.CategoryBadge>{ChatCardData.badge}</p.CategoryBadge>
                  <p.CardTitle>{ChatCardData.title}</p.CardTitle>
                  <p.CardContent>{ChatCardData.content}</p.CardContent>
                  <p.CardCategory>
                    <p.Icon src={iconSrc} />
                    {ChatCardData.category}
                  </p.CardCategory>
                  <p.CardSubContent>{ChatCardData.subContent}</p.CardSubContent>
                </p.ChatCard>
              </p.SlickChild>
            )
          })}
        </Slider>
      </p.Slick>
    </p.Container>
  )
}

export default PopularChatList
