import styled from 'styled-components'

export const TotalChart = styled.div`
  width: 100%;
  margin-top: 2vh;

  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;

  @media (max-width: 480px) {
    margin-top: 1vh;
    padding: 12px 12px 5px;
  }
`

export const FirstRightWrap = styled.div`
  width: 100%;
  margin-top: 2vh;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    margin-top: 1vh;
    gap: 0;
  }
`

export const FranchiseChart = styled.div`
  width: 65%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 12px 12px 5px;
  }
`

export const StatusWrap = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 2vh;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
  }

  @media (max-width: 480px) {
    margin-top: 1vh;
  }
`

export const OpenChart = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 12px 12px 5px;
  }
`

export const CloseChart = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 12px 12px 5px;
  }
`

export const ChartTitle = styled.div`
  font-size: 0.8rem;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`

export const ChartSubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

export const ChartSubTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`

export const InfoText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
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

export const HighlightText = styled.span`
  color: #2a65f0;
  font-weight: 500;
`
