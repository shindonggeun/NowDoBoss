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
  AroundData: number
  CurrentData: number
  Unit: string
}

const ThreeBox = (props: ThreeBoxPropsType) => {
  const { MainContent, AroundData, CurrentData, Unit } = props
  // 해당 상권 - 지역구 평균
  const DifferenceOfValue = CurrentData - AroundData
  return (
    <ComparisonContainer>
      <ComparisonTitle>{MainContent}</ComparisonTitle>
      <ComparisonBox $whatNumber={1}>
        00동 평균 {MainContent}
        <ComparisonData>
          <Content>{AroundData}</Content>
          {Unit}
        </ComparisonData>
      </ComparisonBox>
      <ComparisonBox $whatNumber={2}>
        00상권 {MainContent}
        <ComparisonData>
          <Content>{CurrentData}</Content>
          {Unit}
        </ComparisonData>
      </ComparisonBox>
      <ComparisonBox $whatNumber={3}>
        타 상권 대비 {MainContent}
        <ComparisonData>
          <Content>{DifferenceOfValue}</Content>
          {Unit}
        </ComparisonData>
      </ComparisonBox>
    </ComparisonContainer>
  )
}

export default ThreeBox
