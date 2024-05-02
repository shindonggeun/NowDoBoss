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
  width: 250px;

  @media only screen and (max-width: 992px) {
    position: static; // 화면 너비가 992px 이하일 때는 고정 위치 해제
    width: 100vw;
  }
`

export const MainContent = styled.div`
  display: flex;
  margin-left: 250px; // 기본 왼쪽 여백 설정
  width: calc(100vw - 250px);
  justify-content: center;

  @media only screen and (max-width: 992px) {
    margin-left: 0;
    width: 100vw;
  }
`
