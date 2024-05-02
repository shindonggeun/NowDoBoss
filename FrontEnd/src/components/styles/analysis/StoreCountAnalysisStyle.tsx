import styled from 'styled-components'

export const FirstLowContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

export const TotalChart = styled.div`
  width: 55%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const FirstRightWrap = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const FranchiseChart = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
`

export const StatusWrap = styled.div`
  display: flex;
  gap: 10px;
`

export const OpenChart = styled.div`
  width: 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
`

export const CloseChart = styled.div`
  width: 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
`

export const ChartTitle = styled.div`
  font-size: 0.8rem;
`

export const ChartSubTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`

export const ChartSubTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`

export const HorizontalChart = styled.div`
  width: 90%;
  align-self: center;
`
export const Bar = styled.div`
  background-color: #4caf50;
  height: 20px;
  border-radius: 5px;
`

export const BarContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  gap: 2%;
`

export const Label = styled.div`
  width: 20%;
  font-size: 1rem;
  text-align: right;
`

export const BarWrapper = styled.div`
  width: 80%;
`
