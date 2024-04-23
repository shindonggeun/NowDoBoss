import * as p from '@src/components/styles/community/CommunityStyle'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { useRef } from 'react'

const PopularChatList = () => {
  // slider 옆으로 넘기기 위한 ref 상태
  const sliderRef = useRef<Slider | null>(null)

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
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
      category: '이모저모',
      subContent: '인원 24 / 50',
    },
    {
      id: 3,
      badge: '채팅방',
      title: '강남모임',
      content: '강남 사장 모임입니다 ㅎㅎ 누구든 들오세유',
      category: '이모저모',
      subContent: '인원 24 / 50',
    },
    {
      id: 4,
      badge: '채팅방',
      title: '논현 게주아',
      content: '논현동 사장님, 예비사장님들의 모임입니다. 일단 드루와!',
      category: '이모저모',
      subContent: '인원 8 / 50',
    },
  ]

  return (
    <p.Container>
      {/* 상단 */}
      <p.Context>
        <p.LeftGrid>
          <p.Title>인기 채팅방</p.Title>
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
        </p.LeftGrid>
        <p.CreateButton>채팅방 생성하기</p.CreateButton>
      </p.Context>
      <p.Slick className="slider-container">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Slider {...settings} ref={sliderRef}>
          {ChatCardDatas.map(ChatCardData => (
            <p.SlickChild key={ChatCardData.id}>
              <p.ChatCard>
                <p.CategoryBadge>{ChatCardData.badge}</p.CategoryBadge>
                <p.CardTitle>{ChatCardData.title}</p.CardTitle>
                <p.CardContent>{ChatCardData.content}</p.CardContent>
                <p.CardCategory>
                  <p.Icon src="src/assets/fire_gray.svg" />
                  {ChatCardData.category}
                </p.CardCategory>
                <p.CardSubContent>{ChatCardData.subContent}</p.CardSubContent>
              </p.ChatCard>
            </p.SlickChild>
          ))}
        </Slider>
      </p.Slick>
    </p.Container>
  )
}

export default PopularChatList
