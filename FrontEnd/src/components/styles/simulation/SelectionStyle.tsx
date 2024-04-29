import styled from 'styled-components'

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

export const Container = styled.div`
  // 반응형으로?? 아니면 고정??
  //  width: 45vw;
  width: 45rem;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  @media (max-width: 768px) {
    width: 80vw;
  }
`

export const SelctionHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #2e83f2;
  padding: 2vh 1vw;
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
  margin-left: 1vw;
`

export const Contants = styled.div`
  height: 100vh;
  margin: 3vh 2vw;
`
