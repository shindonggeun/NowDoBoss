import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 5vh;
  padding: 0 10%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    padding: 0 3%;
  }
`

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
  box-sizing: border-box;
  height: auto;
  padding-left: 15%;

  @media (max-width: 992px) {
    padding-left: 0;
  }
`
