import styled from 'styled-components'

export const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  font-family: 'Pretendard', sans-serif;
  padding-top: 10px;
  max-height: 60vh;
`

export const CompareTitleContainer = styled.div`
  text-align: center;
  font-family: 'Pretendard', sans-serif;
`

export const CompareTitle = styled.div`
  font-size: 28px;
  font-weight: 560;
  font-family: 'Pretendard', sans-serif;
`

export const BodyFlex = styled.div`
  flex: 1;
`

export const ContainerBox = styled.div<{ height: number; min: number }>`
  height: ${props => `${props.height}px`};

  @media (max-width: 768px) {
    height: ${props => `${props.min}px`};
  }
`

export const Icon = styled.img<{ width: number }>`
  flex: 1;
  width: ${props => `${props.width}px`};
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const ListContainer = styled.div`
  position: relative;
  min-width: 100px;
  text-align: center;
`

export const BodyContainerTitle = styled.div<{ top: number; min: number }>`
  font-size: 20px;
  font-weight: 600;
  min-height: 40px;
  min-width: 200px;
  position: absolute;
  text-align: left;
  left: 10px;
  top: ${props => `${props.top}px`};

  @media (max-width: 768px) {
    font-size: 17px;

    top: ${props => `${props.min}px`};
  }
`

export const BodyContainerSubText = styled.div`
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export const TotalPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1b3fff;
  padding-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

export const BodyContainerText = styled.div`
  padding-bottom: 15px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export const FranchiseTitle = styled.div`
  padding-top: 10px;
  font-size: 17px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`
