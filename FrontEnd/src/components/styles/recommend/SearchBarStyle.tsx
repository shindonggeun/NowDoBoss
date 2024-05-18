import styled from 'styled-components'

export const Container = styled.div<{ $isOpen: boolean }>`
  border: ${props => (props.$isOpen ? '1px solid #d9d9d9' : '')};
  background-color: white;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);
  margin: 10px;
  border-radius: 5px;
`
export const Header = styled.div``
export const ContentSlide = styled.div`
  background-color: white;
  margin-top: 15px;
`

export const Content = styled.div<{ $isSelect: boolean }>`
  pointer-events: ${props => (props.$isSelect ? '' : 'none')};
  opacity: ${props => (props.$isSelect ? '' : '0.4')};
  margin: 15px 10px;
`
