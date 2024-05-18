import styled from 'styled-components'

export const SideBar = styled.div`
  position: fixed;
  z-index: 10;
  width: 250px;
  height: calc(100vh - 68px);

  @media only screen and (max-width: 992px) {
    position: static; // 화면 너비가 992px 이하일 때는 고정 위치 해제
    width: 100vw;
    height: auto;
  }
`

export const Context = styled.div`
  width: 100%;
`

// detail style

export const MainContentDiv = styled.div`
  margin: 3% 0 3% 5%;
  width: 80%;

  @media only screen and (max-width: 992px) {
    margin: 3%;
    width: 94%;
  }
  @media only screen and (max-width: 820px) {
    margin: 3% 6%;
    width: 88%;
  }
  @media only screen and (max-width: 550px) {
    margin: 3% 10%;
    width: 80%;
  }
`

export const Div = styled.div``

// 채팅 디테일 시 좌우 라인
export const DetailContainer = styled.div`
  border-inline: 1px solid #d9d9d9;
  height: calc(100vh - 68px);
  width: 100%;

  @media only screen and (max-width: 992px) {
    height: calc(100vh - 68px - 75px);
  }
`
