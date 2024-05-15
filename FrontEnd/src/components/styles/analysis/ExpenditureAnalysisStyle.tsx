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

export const TotalCard = styled.div`
  width: 50%;
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

export const CategoryCard = styled.div`
  width: 50%;
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

export const AddBox = styled.div`
  border-radius: 5px;
  background-color: #f7f7f7;
  border: 2px solid #e0e0e0;
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

export const ChartTitle = styled.div`
  font-size: 0.8rem;
`

export const ChartSubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;
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
  font-weight: 600;
`
