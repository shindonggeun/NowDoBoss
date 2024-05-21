import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 5px;
  padding: 20px 0;
  background-color: #ffffff;
`

export const Title = styled.div`
  position: relative;
  padding: 0 20px 10px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`

export const CardWrap = styled.div`
  position: relative;
  padding: 15px 20px;
  display: flex;
  box-sizing: border-box;
`

export const SalesWrap = styled.div`
  position: relative;
  padding: 15px 0 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

export const SalesSummary = styled.div`
  padding: 0 20px;
`

export const TotalDiv = styled.div`
  box-sizing: border-box;
`

export const TotalTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`

export const TotalText = styled.div`
  color: #21b6bb;
  font-size: 24px;
  font-weight: 600;
`
export const SalesList = styled.div`
  position: relative;
  padding: 5px 0 0 20px;
  box-sizing: border-box;
`

export const SalesDiv = styled.div`
  position: relative;
  box-sizing: border-box;

  p {
    position: relative;
    font-size: 14px;
    line-height: 24px;
  }

  strong {
    position: absolute;
    top: 0;
    right: 0;
    color: #21b6bb;
    font-size: 17px;
    font-weight: 600;
  }
`

export const CardDiv = styled.div`
  display: flex;
  flex: 1;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const ErrBox = styled.div`
  display: flex;
  height: 25vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: 20px auto; // 상하 여백
  font-size: 0.9rem; // 글자 크기
  color: #ff0000; // 글자 색상
  background-color: #fff0f0; // 배경 색상
  border-radius: 10px; // 테두리 둥글기
  border: 1px solid #ffd0d0; // 테두리 색상
`
