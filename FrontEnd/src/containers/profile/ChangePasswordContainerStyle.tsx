import styled from 'styled-components'

export const SocialMsg = styled.div`
  display: flex;
  height: 20vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  color: #333;

  @media (max-width: 425px) {
    height: 20vh;
    font-size: 0.9rem;
  }
`

export const Form = styled.form`
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  font-size: 14px;
  font-weight: 500;
  color: #f9f9f9;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`
