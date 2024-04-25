import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row; // 기본 방향을 행으로 설정

  @media only screen and (max-width: 992px) {
    flex-direction: column; // 화면 너비가 992px 이하일 때 방향을 열로 변경
  }
`
export const NabBar = styled.div`
  position: fixed;
  z-index: 90;
  //top: 0; // 상단에 고정
  width: 20%;

  @media only screen and (max-width: 992px) {
    position: static; // 화면 너비가 992px 이하일 때는 고정 위치 해제
    width: 100vw;
  }
`

export const MarginLeft = styled.div`
  display: flex;
  margin-left: 20%; // 기본 왼쪽 여백 설정
  width: 80%;
  justify-content: center;

  @media only screen and (max-width: 992px) {
    margin-left: 0;
    width: 100vw;
  }
`

export const Context = styled.div`
  margin: 3% 10%;
  width: 80%;
`

// detail style

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 92.5vh;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const MainContentDiv = styled.div`
  width: 66.7vw;

  @media only screen and (max-width: 768px) {
    width: 100vw;
  }
`

export const SubContentDiv = styled.div`
  width: 33.3vw;
  @media only screen and (max-width: 768px) {
    width: 100vw;
  }
`
