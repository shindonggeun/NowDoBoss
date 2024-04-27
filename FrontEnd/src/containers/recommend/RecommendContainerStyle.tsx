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
  animation: ${props => (props.$isSubmit ? StartSlide : EndSlide)} 0.5s ease-out
    forwards;
`
