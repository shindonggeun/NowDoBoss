import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const LeftWrap = styled.div`
  flex: 2;
  padding: 5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const RightWrap = styled.div`
  flex: 3;
  background-color: #888888;

  @media (max-width: 768px) {
    display: none;
  }
`

interface BtnProps {
  marginTop?: string
  disabled?: boolean
}

export const Btn = styled.div<BtnProps>`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`};
  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}

  background-color: #236cff;
  color: white;
  height: 30px;

  &:hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`
