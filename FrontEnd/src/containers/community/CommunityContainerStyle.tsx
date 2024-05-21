import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row; // 기본 방향을 행으로 설정  display: flex;
  padding: 0 15%;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media only screen and (max-width: 992px) {
    flex-direction: column; // 화면 너비가 992px 이하일 때 방향을 열로 변경

    padding: 0;
  }
`
export const NabBar = styled.div`
  position: fixed;
  z-index: 10;
  //top: 0; // 상단에 고정
  width: 250px;

  @media only screen and (max-width: 992px) {
    position: static; // 화면 너비가 992px 이하일 때는 고정 위치 해제
    width: 100vw;
  }
`

export const MarginLeft = styled.div`
  display: flex;
  margin-left: 250px; // 기본 왼쪽 여백 설정
  width: calc(80vw - 250px);
  justify-content: center;

  @media only screen and (max-width: 992px) {
    margin-left: 0;
    width: 100vw;
    margin-top: 68px;
  }
`

export const Context = styled.div`
  width: 100%;
  height: calc(100vh - 68px - 30px);
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
`

// detail style

export const MainContentDiv = styled.div`
  width: 100%;

  @media only screen and (max-width: 992px) {
    margin: 0 10%;
    width: 80%;
  }
`

export const Div = styled.div``

export const Mid = styled.div`
  margin: 3% 5%;
  width: 100%;
  height: calc(100vh - 68px);
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media only screen and (max-width: 992px) {
    margin: 3% 10%;
    width: 80%;
  }
`
export const List = styled.div`
  margin: 3% 5%;
  width: 80%;
  height: calc(100vh - 68px - 30px);
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media only screen and (max-width: 992px) {
    margin: 3% 10%;
    width: 80%;
  }
`
