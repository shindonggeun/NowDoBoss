import styled from 'styled-components'

export const Container = styled.div`
  border: 2px solid #d9d9d9;
  background-color: white;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 680px) {
    border-top-left-radius: 15px;
    border-bottom-right-radius: 0;
    box-shadow: none;
  }
`

export const Content = styled.div``
