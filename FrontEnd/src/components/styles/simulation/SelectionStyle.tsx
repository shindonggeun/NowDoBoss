import styled, { keyframes } from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  .scroll-locked {
    overflow: hidden;
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
    //transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    //transform: translateX(0);
  }
`

export const FadeInContainer = styled.div`
  animation: ${fadeIn} 0.4s ease-in-out;
`

export const Container = styled.div`
  // 반응형으로?? 아니면 고정??
  //  width: 45vw;
  width: 100%;
  max-width: 40rem;
  height: 100vh;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  overflow-y: auto;
  overflow-x: hidden;
  //padding-top: 80px; // 헤더 높이 조절용

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    width: 100vw;
  }
`

export const SelctionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #236cff;
  padding: 1rem 2rem;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
`

export const HeaderRignt = styled.div`
  display: flex;
  align-items: center;
  //width: 20rem;
`

export const PrevIcon = styled.img`
  width: 1rem;
  cursor: pointer;
`

export const CloseIcon = styled.img`
  width: 1rem;
  padding-left: 1rem;
  cursor: pointer;
`

export const HeaderTitle = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 1rem;
  overflow-wrap: break-word;
  flex-grow: 1;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`

export const Contants = styled.div`
  margin: 3rem 2vw;
`

export const SplitLine = styled.div`
  width: 90%;
  height: 1px;
  margin: 0 auto;
  background-color: #e0e0e0;
`
