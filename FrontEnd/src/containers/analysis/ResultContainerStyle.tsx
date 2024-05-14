import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 10vh;
  padding: 0 10%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

export const ImgDiv = styled.div`
  height: auto;
  align-content: center;

  @media (max-width: 425px) {
    padding: 0 3%;
  }
`

export const ResultWrap = styled.div`
  width: 100%;
  min-height: 3vh;
  border-radius: 10px;
  background-color: #2a65f0;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
`

export const IntroTitle = styled.div`
  font-size: 1.4rem;
  color: #ffffff;
  font-weight: 700;
  margin-right: auto;
`
export const SummaryDiv = styled.div``

export const Wrap = styled.div`
  width: 100%;
  margin-top: 10vh;
  display: flex;
  align-items: flex-start;

  @media (max-width: 576px) {
    padding: 0 3%;
  }
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
