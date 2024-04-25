import * as m from '@src/components/styles/community/CommunityDetailStyle'
import { useNavigate } from 'react-router-dom'
import TimeCounting from 'time-counting'

interface TimeCountingOption {
  objectTime: Date
  lang: 'ko'
  calculate?: {
    justNow?: number
  }
}

const MainContent = () => {
  const navigate = useNavigate()

  const detailData = {
    communityId: 1,
    category: '상권분석',
    title: '강동구에 창업하신 사장님들께 질문드립니다..',
    content:
      '사장님들 안녕하신가요, 저는 강동구에 창업하기 위해 준비중인 예비 창업자입니다. 요즘 고민이 있는데요, 자금이 넉넉치 못해 월세가 저렴하면서 폐업률이 낮은 상권이 어디가 있을까요..? 그리고 롱런하는 꿀팁 부탁드립니다...!',
    readCount: 3,

    writerId: '',
    writerNickname: '',
    writerProfileImage: '',
    images: '',
  }

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

  return (
    <m.Container>
      <m.BackButton>
        <m.BackIcon src="/src/assets/arrow_left.svg" />
        <m.BackText
          onClick={() => {
            navigate('/community')
          }}
        >
          목록으로 돌아가기
        </m.BackText>
      </m.BackButton>
      <m.Title>{detailData.title}</m.Title>
      <m.Category>창업고민</m.Category>
      <m.TimeAndCounting>
        {/* 게시글 시간 아래에 넣으면 됩니다~ */}
        {TimeCounting('2024-04-24 4:00:00', TimeOption)} ∙ 조회수{' '}
        {detailData.readCount}
      </m.TimeAndCounting>
      <m.ContentImg />
      <m.Content>{detailData.content}</m.Content>
    </m.Container>
  )
}

export default MainContent
