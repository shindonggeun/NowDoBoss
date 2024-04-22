import * as p from '@src/components/styles/community/PopularChatListStyle'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { useRef } from 'react'

const PopularChatList = () => {
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
          <p.SlickChild>
            <p.ChatCard>
              <p.CategoryBadge>채팅방</p.CategoryBadge>
              <p.CardTitle>강창모 (강동구 창업자들의 모임)</p.CardTitle>
              <p.CardContent>
                강동구 사장님, 예비사장님들의 모임입니다. 부담 가지지 말고
                들어오세요 :)
              </p.CardContent>
              <p.CardCategory>
                <p.Icon src="src/assets/fire_gray.svg" />
                이모저모
              </p.CardCategory>
              <p.CardSubContent>인원 24 / 50</p.CardSubContent>
            </p.ChatCard>
          </p.SlickChild>
          <p.SlickChild>
            <p.ChatCard>
              <p.CategoryBadge>채팅방</p.CategoryBadge>
              <p.CardTitle>강창모 (강동구 창업자들의 모임)</p.CardTitle>
              <p.CardContent>
                강동구 사장님, 예비사장님들의 모임입니다. 부담 가지지 말고
                들어오세요 :)
              </p.CardContent>
              <p.CardCategory>
                <p.Icon src="src/assets/fire_gray.svg" />
                이모저모
              </p.CardCategory>
              <p.CardSubContent>인원 24 / 50</p.CardSubContent>
            </p.ChatCard>
          </p.SlickChild>
          <p.SlickChild>
            <p.ChatCard>
              <p.CategoryBadge>채팅방</p.CategoryBadge>
              <p.CardTitle>강창모 (강동구 창업자들의 모임)</p.CardTitle>
              <p.CardContent>
                강동구 사장님, 예비사장님들의 모임입니다. 부담 가지지 말고
                들어오세요 :)
              </p.CardContent>
              <p.CardCategory>
                <p.Icon src="src/assets/fire_gray.svg" />
                이모저모
              </p.CardCategory>
              <p.CardSubContent>인원 24 / 50</p.CardSubContent>
            </p.ChatCard>
          </p.SlickChild>
          <p.SlickChild>
            <p.ChatCard>
              <p.CategoryBadge>채팅방</p.CategoryBadge>
              <p.CardTitle>강창모 (강동구 창업자들의 모임)</p.CardTitle>
              <p.CardContent>
                강동구 사장님, 예비사장님들의 모임입니다. 부담 가지지 말고
                들어오세요 :)
              </p.CardContent>
              <p.CardCategory>
                <p.Icon src="src/assets/fire_gray.svg" />
                이모저모
              </p.CardCategory>
              <p.CardSubContent>인원 24 / 50</p.CardSubContent>
            </p.ChatCard>
          </p.SlickChild>
        </Slider>
      </p.Slick>
    </p.Container>
  )
}

export default PopularChatList
