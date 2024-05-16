import styled, { keyframes } from 'styled-components'

const StartLeftSlide = keyframes`
from {
    transform: translateX(-100%);
    //opacity: 0  ;
}   
to {
    transform: translateX(0);
    opacity: 1;
  }  
`
const EndLeftSlide = keyframes`
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
    transform: translateX(-100%);
    opacity: 0;
}   
`
const StartBottomSlide = keyframes`
from {
    transform: translateY(100%);
    opacity: 0  ;
}   
to {
    transform: translateY(0);
    opacity: 1;
  }  
`
const EndBottomSlide = keyframes`
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
    transform: translateY(100%);
    opacity: 0;
}   
`

export const Container = styled.div`
  position: relative;
  width: 100vw;
`
export const MapDiv = styled.div`
  width: 100%;
`
export const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
`
export const Banner = styled.div`
  position: absolute;
  z-index: 1;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`
export const Search = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  width: 400px;
  height: auto;

  @media only screen and (max-width: 400px) {
    font-size: 0.9rem;
    top: auto;
    bottom: 0;
    width: 100%;
    height: auto;
  }
`
export const ReduceButton = styled.div`
  position: absolute;
  z-index: 1;
  left: 400px;
  top: 0;
  height: auto;

  @media only screen and (max-width: 400px) {
    display: none;
  }
`

export const Report = styled.div<{ $isSubmit: boolean }>`
  position: absolute;
  height: auto;
  z-index: 2;
  top: 0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);
  animation: ${props => (props.$isSubmit ? StartLeftSlide : EndLeftSlide)} 0.5s
    ease-out forwards;

  @media only screen and (max-width: 680px) {
    font-size: 0.9rem;
    top: auto;
    bottom: 0;
    width: 100%;
    height: auto;
    animation: ${props => (props.$isSubmit ? StartBottomSlide : EndBottomSlide)}
      0.5s ease-out forwards;
  }
`

export const ReportContainer = styled.div`
  width: 550px;
  height: auto;
  border: 2px solid #d9d9d9;
  background-color: white;
  border-radius: 0 5px 5px 0;
  box-shadow: 10px 15px 15px -5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-height: calc(100vh - 75px);

  @media only screen and (max-width: 680px) {
    font-size: 0.9rem;
    top: auto;
    bottom: 0;
    width: 100%;
    max-height: 60vh;
    border-bottom-right-radius: 0;
    border-top-left-radius: 20px;
    box-shadow: none;
  }
`
