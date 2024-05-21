import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 5px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 15px;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

export const TitleImage = styled.img`
  width: 25px;
  height: 25px;
`

export const Title = styled.div`
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  margin-left: 3px;

  @media (max-width: 768px) {
    font-size: 1.2rem; // 모바일 화면에서 폰트 크기 조정
  }
`

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1%;
`

export const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
`

export const Category = styled.div`
  display: flex;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const Text = styled.div`
  display: flex;
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`
