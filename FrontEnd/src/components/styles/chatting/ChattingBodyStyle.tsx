import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  overflow-y: scroll;
  height: 65vh;

  @media only screen and (max-width: 992px) {
    //margin-top: 1vh;
    height: 57vh;
  }
`
export const MessageDiv = styled.div<{ $isMe: boolean }>`
  display: flex;
  flex-direction: row;
  margin: 10px 18px;
  justify-content: ${props => (props.$isMe ? 'right' : 'left')};
`
export const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
`

export const ProfileImg = styled.img<{ $isMe: boolean; $same: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: ${props => (props.$isMe || props.$same ? 'none' : '')};
`
export const SenderName = styled.div<{ $isMe: boolean; $same: boolean }>`
  font-weight: 600;
  display: ${props => (props.$isMe || props.$same ? 'none' : '')};
`
export const ContentDiv = styled.div``
export const Content = styled.div<{ $same: boolean }>`
  background-color: #beccff;
  max-width: 60vw;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: ${props => (props.$same ? '50px' : '')};
`
