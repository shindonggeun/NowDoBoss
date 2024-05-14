import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 50vh;
  padding: 0 10%;
  width: 100%;
  //height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media (max-width: 425px) {
    padding: 0 3%;
  }
`

export const Wrap = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
`

export const Sidebar = styled.div`
  flex: 1;

  @media (max-width: 992px) {
    display: none;
  }
`

export const Main = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`
