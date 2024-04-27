import styled, { keyframes } from 'styled-components'

const StartSlide = keyframes`
from {
    transform: translateX(-100%);
    //opacity: 0  ;
}   
to {
    transform: translateX(0);
    opacity: 1;
  }  
`
const EndSlide = keyframes`
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
    transform: translateX(-100%);
    opacity: 0;
}   
`

export const Container = styled.div`
  position: relative;
`
export const Map = styled.div``
export const Search = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
`
export const Report = styled.div<{ $isSubmit: boolean }>`
  position: absolute;
  z-index: 2;
  top: 0;
  overflow-y: auto;
  max-height: calc(100vh - 70px);
  scrollbar-width: none;
  -ms-overflow-style: none;

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);
  animation: ${props => (props.$isSubmit ? StartSlide : EndSlide)} 0.5s ease-out
    forwards;
`
