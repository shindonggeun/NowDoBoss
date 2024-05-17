import styled from 'styled-components'
import RightArrow from '@src/assets/arrow_right.svg'
import GrayRound from '@src/assets/gray_round.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

const Container = styled.div`
  background-color: white;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);
  margin: 0 10px;
  border-radius: 5px;
  width: 380px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid #dce5f2;
`

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  &:hover {
    background-color: #efefef;
    border-radius: 5px;
    cursor: pointer;
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Icon = styled.img`
  scale: 0.8;
  margin: -5px 0;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Title = styled.div`
  font-weight: 700;
  b {
    color: #236cff;
  }
`
const SubTitle = styled.div`
  font-weight: 400;
  font-size: 0.8rem;
`
const Arrow = styled.img``
const Div = styled.div``

const Divider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  //margin: 10px 0;
`

export type SelectData = {
  id: number
  icon: string
  blueTitle: string
  title: string
  subTitle: string
  url: string
}

const Banner = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [cardDataList, setCardDataList] = useState<SelectData[]>([
    {
      id: 0,
      icon: '',
      blueTitle: '',
      title: '',
      subTitle: '',
      url: '',
    },
  ])

  const cardData = useMemo(
    () => [
      {
        id: 1,
        icon: GrayRound,
        blueTitle: '분석하고 싶은 상권',
        title: '이 있나요?',
        subTitle: '원하는 상권의 데이터를 볼 수 있어요',
        url: '/analysis',
      },
      {
        id: 2,
        icon: GrayRound,
        blueTitle: '상권을 추천',
        title: '받고 싶으신가요?',
        subTitle: '원하는 지역의 상권을 추천해드려요',
        url: '/recommend',
      },
      {
        id: 3,
        icon: GrayRound,
        blueTitle: '넓은 범위로 비교',
        title: '해보고 싶으신가요?',
        subTitle: '원하는 자치구의 데이터를 볼 수 있어요',
        url: '/status',
      },

      {
        id: 4,
        icon: GrayRound,
        blueTitle: '창업 비용을 계산',
        title: '해보고 싶으신가요?',
        subTitle: '시뮬레이션을 통해 비용을 예상해봐요',
        url: '/analysis/simulation',
      },
    ],
    [],
  )

  useEffect(() => {
    const filteredCardData = cardData.filter(card => {
      if (
        location.pathname === '/analysis' ||
        location.pathname === '/analysis/simulation'
      ) {
        // For both '/analysis' and '/analysis/simulation', include only specific cards
        return card.url === '/recommend' || card.url === '/analysis/simulation'
      }
      if (
        location.pathname === '/status' &&
        card.url === '/analysis/simulation'
      ) {
        return false
      }
      return card.url !== location.pathname
    })
    setCardDataList(filteredCardData)
  }, [cardData, location.pathname])

  return (
    <Container>
      {cardDataList.map((card: SelectData, index) => (
        <Div key={card.url}>
          <Card onClick={() => navigate(card.url)}>
            <Left>
              <Icon src={card.icon} />
              <Content>
                <Title>
                  <b>{card.blueTitle}</b>
                  {card.title}
                </Title>
                <SubTitle>{card.subTitle}</SubTitle>
              </Content>
            </Left>
            <Arrow src={RightArrow} />
          </Card>
          {index < cardDataList.length - 1 && <Divider />}
        </Div>
      ))}
    </Container>
  )
}

export default Banner
