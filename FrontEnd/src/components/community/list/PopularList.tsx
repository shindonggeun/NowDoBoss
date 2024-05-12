import * as p from '@src/components/styles/community/CommunityStyle'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useRef, useState } from 'react'
import useCommunityStore from '@src/stores/communityStore'
import leftArrow from '@src/assets/arrow_left.svg'
import rightArrow from '@src/assets/arrow_right.svg'
import { PopularType } from '@src/types/ChattingType'
import { useNavigate } from 'react-router-dom'

const PopularList = ({ data }: { data: PopularType[] }) => {
  const navigate = useNavigate()
  const categories = useCommunityStore(state => state.categories)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isInfinite, setIsInfinite] = useState(true)

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

  useEffect(() => {
    if (data && data.length < 2) {
      setIsInfinite(false)
    } else {
      setIsInfinite(true)
    }
  }, [data])

  // slider 옆으로 넘기기 위한 ref 상태
  const sliderRef = useRef<Slider | null>(null)

  const settings = {
    dots: false,
    infinite: isInfinite,
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

  const goArticle = (communityId: number) => {
    navigate(`/community/${communityId}`)
  }

  return (
    <p.Container>
      {/* 상단 */}
      <p.Context>
        <p.Title>
          <b>HOT</b> 이번주 인기글 TOP 10 🔥
        </p.Title>
        <p.Sub>현재 가장 인기있는 글을 확인해보세요! </p.Sub>
        <p.ArrowDiv>
          <p.ArrowButton src={leftArrow} alt="" onClick={prevSlide} />
          <p.ArrowButton src={rightArrow} alt="" onClick={nextSlide} />
        </p.ArrowDiv>
      </p.Context>

      <p.Slick className="slider-container">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Slider {...settings} ref={sliderRef}>
          {data?.map((Card: PopularType) => {
            // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
            const matchedCategory = categories.find(
              selectCategory => selectCategory.value === Card.category,
            )
            const iconSrc = matchedCategory ? matchedCategory.iconInactive : ''
            return (
              <p.SlickChild key={Card.communityId}>
                <p.ChatCard onClick={() => goArticle(Card.communityId)}>
                  <p.CardTitle>{Card.title}</p.CardTitle>
                  <p.CardContent>{Card.content}</p.CardContent>
                  <p.CardCategory>
                    <p.Icon src={iconSrc} />
                    {matchedCategory?.name}
                  </p.CardCategory>
                  <p.CardSubContent>
                    조회수 {Card.readCount} ∙ 댓글 {Card.commentCount}
                  </p.CardSubContent>
                </p.ChatCard>
              </p.SlickChild>
            )
          })}
        </Slider>
      </p.Slick>
    </p.Container>
  )
}

export default PopularList
