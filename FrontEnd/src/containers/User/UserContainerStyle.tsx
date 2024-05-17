import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const LeftWrap = styled.div`
  flex: 2;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Form = styled.form`
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 425px) {
    gap: 10px;
  }
`

export const ErrorMsg = styled.div`
  padding: 10px;
  font-size: 0.9rem;
  background-color: #ffebee;
  color: #d32f2f;
  border-left: 5px solid #d32f2f;
  animation: fadeIn 0.5s;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px; // 이 값은 원하는 간격에 따라 조절 가능
`

export const InputMsg = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-left: 3px;
`

export const Btn = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  background-color: #d4e5f9;
  font-size: 14px;
  font-weight: 600;
  color: #2a7de1;

  &:hover {
    background-color: #6797da;
  }
`

export const RightWrap = styled.div`
  display: flex;
  flex: 3;
  padding: 0 5%;

  @media (max-width: 768px) {
    display: none;
  }
`

export const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;

  img {
    width: 100%;
    height: auto;
  }
`
