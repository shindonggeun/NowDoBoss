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
  border: 1px solid rgba(0, 0, 0, 0.09);
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
  border: 1px solid rgba(0, 0, 0, 0.09);
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
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
`

export const CloseChart = styled.div`
  width: 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.09);
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

export const ErrBox = styled.div`
  display: flex;
  height: 30vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: 20px 0; // 상하 여백
  font-size: 1rem; // 글자 크기
  color: #ff0000; // 글자 색상
  background-color: #fff0f0; // 배경 색상
  border-radius: 10px; // 테두리 둥글기
  border: 1px solid #ffd0d0; // 테두리 색상
`
