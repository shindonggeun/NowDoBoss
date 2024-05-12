import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 8vh;
`
export const Header = styled.div`
  //background-color: #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  height: 40px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`
export const ChatInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 100%;
`
export const ChatImg = styled.div`
  background-color: #d9d9d9;
  border-radius: 100%;
  width: 36px;
  height: 36px;
`
export const ChatDiv = styled.div`
  padding-left: 10px;
`
export const ChatTitle = styled.div`
  margin-bottom: -5px;
  font-size: 1.3rem;
  font-weight: 600;
`
export const ChatMembers = styled.div`
  font-size: 0.8rem;
  margin-top: -5px;
`
export const More = styled.div`
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
`

export const MoreModal = styled.div`
  position: absolute;
  right: 15px;
  top: 40px;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: flex-end;
`

export const ModalTriangle = styled.div`
  width: 15px;
  height: 15px;
  background-color: #f2f2f2;
  border-radius: 2px;
  transform: rotate(135deg);
  z-index: 0;
  margin: 0 6px 0 0;
`

export const ModalDiv = styled.div`
  border-radius: 5px;
  border: 2px solid #f2f2f2;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -10px 0 0 0;
  z-index: 2;
`

export const ModalContent = styled.div`
  padding: 5px 15px;
  cursor: pointer;
  //border-bottom: solid 1px #bababa;
  z-index: 2;
  &:hover {
    font-weight: 600;
  }
  &:active {
    font-weight: 700;
  }
`
