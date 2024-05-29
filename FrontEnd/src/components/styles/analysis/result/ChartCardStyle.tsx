import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 2vh;

  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;

  @media (max-width: 576px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    margin-top: 1vh;
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

export const Divider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
`

export const AddBox = styled.div`
  border-radius: 5px;
  background-color: #f7f7f7;
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
  font-size: 0.9rem;
  padding: 10px 15px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 576px) {
    margin-bottom: 10px;
  }
`

// 유동인구 Today chart 박스
export const Wrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 10px 20px;

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 8px 15px; /* 화면이 768px 이하일 때 여백 조정 */
  }

  @media (max-width: 576px) {
    margin-top: 15px;
    padding: 5px 10px; /* 화면이 576px 이하일 때 여백 조정 */
  }

  @media (max-width: 480px) {
    margin-top: 0;
    margin-bottom: 10px;
  }
`

export const BoxContainer = styled.div`
  display: flex;
`

export const ChartBox = styled.div`
  height: 50px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  //color: #ffffff;

  @media (max-width: 768px) {
    height: 40px; /* 화면이 768px 이하일 때 높이 조정 */
    font-size: 0.9rem;
    font-weight: 500;
  }

  @media (max-width: 576px) {
    height: 30px; /* 화면이 576px 이하일 때 높이 조정 */
    font-size: 0.8rem;
    font-weight: 400;
  }
`

export const HorizontalLine = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: #000;
  margin: 20px 0;
`

export const Tick = styled.div`
  position: absolute;
  top: -5px;
  height: 10px;
  width: 2px;
  background-color: #000;
`

export const TickLabel = styled.div`
  position: absolute;
  top: 15px;
  transform: translateX(-50%);
  font-size: 0.8rem;
`

export const TodayTopContainer = styled.div`
  display: flex;
  align-items: center;
`

export const IconImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`

export const Title = styled.div`
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
  border-radius: 5px; // 테두리 둥글기
  border: 1px solid #ffd0d0; // 테두리 색상
`

export const HighlightText = styled.span`
  color: #2a65f0;
  font-weight: 500;
`
