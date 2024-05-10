import styled from 'styled-components'

export const ComparisonContainer = styled.div`
  width: 32%;

  @media only screen and (max-width: 550px) {
    width: 32%;
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
  width: 85%;

  @media only screen and (max-width: 400px) {
    font-size: 0.75rem;
  }
`

export const ComparisonData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ComparisonTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`
export const Content = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  padding-right: 2px;
`

type ThreeBoxPropsType = {
  MainContent: string
  CurrentData: number
  AroundData: number
  SeoulData: number
  Unit: string
}

const ThreeBox = (props: ThreeBoxPropsType) => {
  const { MainContent, CurrentData, AroundData, SeoulData, Unit } = props
  // 해당 상권 - 지역구 평균
  const DifferenceOfValue = CurrentData - AroundData

  // 단위 수정
  const formatKRW = (number: number) => {
    const isNegative = number < 0 // 음수인지 확인
    const absNumber = Math.abs(number) // 절대값 취하기

    let formattedNumber = ''
    if (absNumber < 1e4) {
      formattedNumber = `${absNumber}`
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
    return isNegative ? `-${formattedNumber}` : formattedNumber
  }

  return (
    <ComparisonContainer>
      <ComparisonTitle>{MainContent}</ComparisonTitle>

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
      <ComparisonBox $whatNumber={1}>
        00상권 {MainContent}
        <ComparisonData>
          <Content>{formatKRW(CurrentData)}</Content>
          {Unit}
        </ComparisonData>
      </ComparisonBox>
      <ComparisonBox $whatNumber={2}>
        타 상권 대비 {MainContent}
        <ComparisonData>
          <Content>{formatKRW(DifferenceOfValue)}</Content>
          {Unit}
        </ComparisonData>
      </ComparisonBox>
    </ComparisonContainer>
  )
}

export default ThreeBox
