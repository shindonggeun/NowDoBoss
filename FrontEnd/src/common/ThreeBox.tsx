import styled from 'styled-components'
import { useEffect, useState } from 'react'

export const Container = styled.div`
  width: 100%;
  margin-bottom: 5px;

  @media only screen and (max-width: 550px) {
    width: 100%;
  }
`
export const ComparisonBox = styled.div<{ $whatNumber: number }>`
  background-color: ${({ $whatNumber }) => {
    const choiceNumber: { [key: number]: string } = {
      1: '#94ABFF',
      2: '#F1F1F1',
      3: '#5478F6',
    }
    return choiceNumber[$whatNumber]
  }};

  color: ${({ $whatNumber }) => {
    const choiceNumber: { [key: number]: string } = {
      1: '#ffffff',
      2: '#000000',
      3: '#ffffff',
    }
    return choiceNumber[$whatNumber]
  }};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin: 5px 0;
  font-size: 0.8rem;
  font-weight: 600;
  width: 27%;

  @media only screen and (max-width: 400px) {
    font-size: 0.75rem;
  }
`

export const ComparisonBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const ComparisonData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`
export const Title = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
`
export const SubTitle = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  b {
    font-weight: 600;
    color: #0066ff;
  }
`
export const Content = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  padding-right: 3px;
  margin-bottom: -2px;
`

type ThreeBoxPropsType = {
  MainContent: string
  CurrentData: number
  AroundData: number
  SeoulData: number
  Unit: string
}

// 단위 수정
export const formatKRW = (number: number) => {
  // const isNegative = number < 0 // 음수인지 확인
  const absNumber = Math.abs(number) // 절대값 취하기
  const roundNumber = (num: number, decimalPlaces: number) => {
    const factor = 10 ** decimalPlaces
    return Math.round(num * factor) / factor
  }
  let formattedNumber = ''
  if (absNumber < 1e4) {
    formattedNumber = `${roundNumber(absNumber, 2)}`
  } else if (absNumber < 1e8) {
    formattedNumber = `${(absNumber / 1e4).toFixed(0)}만`
  } else {
    const billion = Math.floor(absNumber / 1e8)
    const million = ((absNumber % 1e8) / 1e4).toFixed(0)
    if (million === '0') {
      formattedNumber = `${billion}억`
    } else {
      formattedNumber = `${billion}억 ${million}만`
    }
  }
  // 음수인 경우 결과에 '-' 추가
  // return isNegative ? `-${formattedNumber}` : formattedNumber
  return formattedNumber
}

const ThreeBox = (props: ThreeBoxPropsType) => {
  const { MainContent, CurrentData, AroundData, SeoulData, Unit } = props
  // 해당 상권 - 지역구 평균
  const DifferenceOfValue = CurrentData - AroundData
  const [positive, setPositive] = useState<boolean>(true)

  useEffect(() => {
    const difference = CurrentData - AroundData
    setPositive(difference >= 0)
  }, [CurrentData, AroundData])

  const [is, setIs] = useState<boolean>(true)
  useEffect(() => {
    if (MainContent.endsWith('구') || MainContent.endsWith('수')) {
      setIs(true)
    } else {
      setIs(false)
    }
  }, [MainContent])

  return (
    <Container>
      <Title>{MainContent}</Title>
      <SubTitle>
        타 상권 대비 {MainContent}
        {is ? '가 ' : '이 '}
        <b>
          {formatKRW(DifferenceOfValue)}
          {Unit} 더 {positive ? '많' : '적'}습니다
        </b>
      </SubTitle>
      <ComparisonBoxDiv>
        <ComparisonBox $whatNumber={1}>
          서울시 평균 {MainContent}
          <ComparisonData>
            <Content>{formatKRW(SeoulData)}</Content>
            {Unit}
          </ComparisonData>
        </ComparisonBox>
        <ComparisonBox $whatNumber={2}>
          해당 동 평균 {MainContent}
          <ComparisonData>
            <Content>{formatKRW(AroundData)}</Content>
            {Unit}
          </ComparisonData>
        </ComparisonBox>
        <ComparisonBox $whatNumber={3}>
          00상권 {MainContent}
          <ComparisonData>
            <Content>{formatKRW(CurrentData)}</Content>
            {Unit}
          </ComparisonData>
        </ComparisonBox>
      </ComparisonBoxDiv>
    </Container>
  )
}

export default ThreeBox
