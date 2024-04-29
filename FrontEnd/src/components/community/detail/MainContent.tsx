import * as m from '@src/components/styles/community/CommunityDetailStyle'
import TimeCounting from 'time-counting'
import GoBackButton from '@src/common/GoBackButton'
import send_message from '@src/assets/send_message.svg'
import { CommunityData } from '@src/types/CommunityType'
import useCommunityStore from '@src/stores/communityStore'
import Slider from 'react-slick'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useMutation } from '@tanstack/react-query'
import { articleDelete } from '@src/api/communityApi'
import { useNavigate } from 'react-router-dom'

interface TimeCountingOption {
  objectTime: Date
  lang: 'ko'
  calculate?: {
    justNow?: number
  }
}

export type MainContentPropsType = {
  detailData: CommunityData
}

const MainContent = (props: MainContentPropsType) => {
  const { detailData } = props
  const navigate = useNavigate()

  const { categories, setModifyCommunityId } = useCommunityStore(state => ({
    categories: state.categories,
    setModifyCommunityId: state.setModifyCommunityId,
  }))
  const matchedCategory = categories.find(
    category => category.value === detailData.category,
  )
  const iconSrc = matchedCategory ? matchedCategory.iconInactive : ''
  const categoryKorean = matchedCategory ? matchedCategory.name : ''
  const [moreModal, setMoreModal] = useState<boolean>(false)
  // 생성 시간 보여주는 라이브러리 사용
  const TimeOption: TimeCountingOption = {
    // 기준이 되는 현재 시간
    objectTime: new Date(),
    lang: 'ko',
    calculate: {
      justNow: 3601,
    },
  }
  // test console
  // console.log(TimeCounting('2024-04-24 4:00:00', TimeOption))

  // 이미지 캐러셀 스타일
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

  // 게시글 삭제
  const { mutate: mutateDeleteArticle } = useMutation({
    mutationFn: articleDelete,
    onSuccess: () => {
      // 댓글 삭제 성공 시 댓글 목록 재호출
      navigate('/community')
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: toast => {
          // eslint-disable-next-line no-param-reassign
          toast.onmouseenter = Swal.stopTimer
          // eslint-disable-next-line no-param-reassign
          toast.onmouseleave = Swal.resumeTimer
        },
      })
      Toast.fire({
        icon: 'success',
        title: '게시글이 삭제되었습니다.',
      })
    },
  })

  const onArticleDelete = () => {
    Swal.fire({
      title: '게시글을 삭제하시겠습니까?',
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: '네',
      denyButtonText: '아니요',
      confirmButtonColor: '#429f50',
      cancelButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        mutateDeleteArticle(Number(detailData.communityId))
      }
    })
  }

  return (
    <m.Container>
      <m.Header>
        <GoBackButton />
        <m.More
          onClick={() => {
            setMoreModal(!moreModal)
          }}
        >
          ∘∘∘
        </m.More>
        {moreModal ? (
          <m.MoreModal>
            <m.ModalTriangle />
            <m.ModalDiv>
              <m.ModalContent
                onClick={() => {
                  setModifyCommunityId(detailData.communityId)
                  navigate('/community/register')
                }}
              >
                수정
              </m.ModalContent>
              ∘
              <m.ModalContent
                onClick={() => {
                  onArticleDelete()
                }}
              >
                삭제
              </m.ModalContent>
            </m.ModalDiv>
          </m.MoreModal>
        ) : (
          ''
        )}
      </m.Header>

      <m.Title>{detailData.title}</m.Title>
      <m.Category>
        <m.Icon src={iconSrc} />
        {categoryKorean}
      </m.Category>
      <m.TimeAndCounting>
        {/* 게시글 시간 아래에 넣으면 됩니다~ */}
        {TimeCounting(detailData.createdAt, TimeOption)} ∙ 조회수{' '}
        {detailData.readCount}
      </m.TimeAndCounting>
      <m.Slick>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Slider {...settings}>
          {detailData.images
            ? detailData.images.map(image => {
                return (
                  <m.SlickChild key={image.imageId}>
                    <m.CommunityImage src={image.url} />
                  </m.SlickChild>
                )
              })
            : ''}
        </Slider>
      </m.Slick>

      <m.Content>{detailData.content}</m.Content>

      <m.TabName>작성자</m.TabName>
      <m.WriterProfile>
        <m.ProfileDiv>
          {detailData.writerProfileImage ? (
            <m.UserProfileImg src={detailData.writerProfileImage} />
          ) : (
            <m.UserImgDefault />
          )}
          <m.UserName>{detailData.writerNickname}</m.UserName>
        </m.ProfileDiv>
        <m.ChatButton>
          <m.ChatImg src={send_message} />
          채팅하기
        </m.ChatButton>
      </m.WriterProfile>
    </m.Container>
  )
}

export default MainContent
