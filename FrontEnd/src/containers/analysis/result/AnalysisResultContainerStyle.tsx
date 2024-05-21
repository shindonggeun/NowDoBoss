import styled, { keyframes } from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
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
  position: absolute;
  display: flex;
  top: 6%;
  left: 50%;
  width: 100%;
  max-width: 63rem;
  height: 87vh;
  border-radius: 10px;
  background-color: #fff;

  transform: translate(-50%, 0);
  box-sizing: border-box;

  :: -webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    width: 90vw;
    flex-direction: column;

    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera에 대한 모바일 설정 */
    }

    -ms-overflow-style: none; /* IE와 Edge에 대한 모바일 설정 */
    scrollbar-width: none; /* Firefox에 대한 모바일 설정 */
  }
`

export const LeftDiv = styled.div`
  position: relative;
  z-index: 10;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
  gap: 5vh;
  padding: 24px;
  border-radius: 10px 0 0 10px;
  box-sizing: border-box;
  background-color: #1549b5;
  overflow-y: hidden;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 10px 10px 0 0;
    height: 15vh;
  }
`

export const SideTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

export const SideTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
`

export const SideSubTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
`

export const SideContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 2vh;
  justify-content: space-between;
`

export const RightDiv = styled.div`
  position: relative;
  height: 100%;
  width: 75%;
  border-radius: 0 10px 10px 0;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: rgb(244, 246, 250);

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0 0 10px 10px;
  }
`

export const ContentDiv = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3vh;
  padding: 24px;
  box-sizing: border-box;
`
