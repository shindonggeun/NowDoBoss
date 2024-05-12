import styled from 'styled-components'

export const SideBar = styled.div`
  position: fixed;
  z-index: 10;
  width: 250px;

  @media only screen and (max-width: 992px) {
    position: static; // 화면 너비가 992px 이하일 때는 고정 위치 해제
    width: 100vw;
  }
`

export const Context = styled.div`
  width: 100%;
`

// detail style

export const MainContentDiv = styled.div`
  margin: 3% 0 3% 5%;
  width: 80%;
`

export const Div = styled.div``
