import styled from 'styled-components'

export const Container = styled.div<{ $isOpen: boolean }>`
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 10px;
`
export const Header = styled.div``

export const ContentSlide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: #ffffff;
`
