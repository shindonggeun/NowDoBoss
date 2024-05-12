import * as p from '@src/components/styles/community/CommunityStyle'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useRef, useState } from 'react'
import useCommunityStore from '@src/stores/communityStore'
import leftArrow from '@src/assets/arrow_left.svg'
import rightArrow from '@src/assets/arrow_right.svg'
import CreateModal from '@src/components/chatting/CreateModal'
import { useMutation, useQuery } from '@tanstack/react-query'
import { enterChatRoom, fetchPopularRoom } from '@src/api/chattingApi'
import { PromisePopularMessageType } from '@src/types/ChattingType'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const PopularChatList = ({ category }: { category: string }) => {
  const navigate = useNavigate()
  const categories = useCommunityStore(state => state.categories)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [modalOpen, setModalOpen] = useState(false)
  const [isInfinite, setIsInfinite] = useState(true)

  // 인기 채팅방 불러오는 useQuery
  const { data, isLoading } = useQuery({
    queryKey: ['fetchPopularRoom', category],
    queryFn: () => fetchPopularRoom(category),
  })

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
    if (data && data.dataBody.length < 2) {
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

  // 채팅방 입장 mutate 로직
  const { mutate: mutateEnterChatRoom } = useMutation({
    mutationFn: enterChatRoom,
    onSuccess: res => {
      // 성공이면
      if (res.dataHeader.successCode === 0) {
        navigate(`/chatting/${res.dataBody.chatRoomId}`)
      } else {
        Swal.fire({
          title: res.dataHeader.resultMessage,
          icon: 'warning',
          confirmButtonText: '확인',
        })
      }
    },
  })

  const goChatRoom = (chatRoomId: number) => {
    mutateEnterChatRoom(chatRoomId)
  }

  return (
    <p.Container>
      {/* 상단 */}
      <p.Context>
        <p.LeftGrid>
          <p.Title>인기 채팅방</p.Title>
          <p.CreateButton onClick={() => setModalOpen(true)}>
            채팅방 생성하기
          </p.CreateButton>
        </p.LeftGrid>
        <p.Sub>창업에 관심있는 멤버들과 함께 이야기를 나눠보세요!</p.Sub>
        <p.ArrowDiv>
          <p.ArrowButton src={leftArrow} alt="" onClick={prevSlide} />
          <p.ArrowButton src={rightArrow} alt="" onClick={nextSlide} />
        </p.ArrowDiv>
      </p.Context>
      <p.Modal>
        <CreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </p.Modal>
      {data && !isLoading && (
        <p.Slick className="slider-container">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Slider {...settings} ref={sliderRef}>
            {data.dataBody.map((Card: PromisePopularMessageType) => {
              // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
              const matchedCategory = categories.find(
                selectCategory => selectCategory.value === Card.category,
              )
              const iconSrc = matchedCategory
                ? matchedCategory.iconInactive
                : ''
              return (
                <p.SlickChild key={Card.chatRoomId}>
                  <p.ChatCard onClick={() => goChatRoom(Card.chatRoomId)}>
                    <p.CategoryBadge>채팅방</p.CategoryBadge>
                    <p.CardTitle>{Card.name}</p.CardTitle>
                    <p.CardContent>{Card.introduction}</p.CardContent>
                    <p.CardCategory>
                      <p.Icon src={iconSrc} />
                      {matchedCategory?.name}
                    </p.CardCategory>
                    <p.CardSubContent>
                      인원 {Card.memberCount} /{Card.limit}
                    </p.CardSubContent>
                  </p.ChatCard>
                </p.SlickChild>
              )
            })}
          </Slider>
        </p.Slick>
      )}
    </p.Container>
  )
}

export default PopularChatList
