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
export const FirstSection = styled.div`
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

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const EmailSection = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const EmailFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1%;
`

export const EmailSecondRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1%;
  width: 100%;
  margin-top: 1%;
`

interface BtnProps {
  flex?: number
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
  flex: ${props => (props.flex ? props.flex : '1')};
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`}
`
