import styled, { css } from 'styled-components'

export const Container = styled.div``

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #22222;
`

export const Emphasis = styled.span`
  color: #2e83f2;
`

interface ButtonProps {
  size: string
  selected: boolean
}

export const SelectButton = styled.button<ButtonProps>`
  border-radius: 8px;
  background-color: ${(props) => (props.selected ? '#2e83f2' : 'white')};
  border: 1px solid ${(props) => (props.selected ? '#2e83f2' : '#ccc')};
  color: ${(props) => (props.selected ? 'white' : '#222')};
  text-align: center;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.3s;

  &:hover,
  &:active {
    background-color: #2e83f2;
    border: 1px solid #2e83f2;
    color: white;
  }

  ${props =>
    props.size === 'sm' &&
    css`
      width: 8rem;
      height: 3rem;
      padding: 6px 12px;
      font-size: 14px;
    `}

  ${props =>
    props.size === 'm' &&
    css`
      width: 9rem;
      height: 4rem;
      padding: 8px 16px;
      font-size: 16px;
    `}

    ${props =>
    props.size === 'lg' &&
    css`
      padding: 10px 20px;
      font-size: 18px;
    `}
`
