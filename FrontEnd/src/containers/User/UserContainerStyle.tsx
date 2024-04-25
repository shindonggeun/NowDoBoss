import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const LeftWrap = styled.div`
  flex: 1;
  padding: 5% 3% 5% 5%;
`

export const RightWrap = styled.div`
  flex: 1;
  background-color: #888888;

  @media (max-width: 768px) {
    display: none;
  }
`
export const InputWrap = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  gap: 1%;
  width: 100%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`

export const ForgetPwLink = styled.div`
  margin-top: 7%;
  font-size: 0.9rem;
  font-weight: 600;
`

interface BtnProps {
  marginTop?: string
}

export const Btn = styled.div<BtnProps>`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`};
`
