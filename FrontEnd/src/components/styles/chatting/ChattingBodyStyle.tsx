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
export const Div = styled.div``
export const DateSeparator = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px 0;
  font-weight: 500;
  align-items: center;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background-color: #d9d9d9;
    height: 1px;
    font-size: 0;
    line-height: 0;
    margin: 0 16px;
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
export const RowDiv = styled.div<{ $isMe: boolean }>`
  display: flex;
  flex-direction: ${props => (props.$isMe ? 'row-reverse' : 'row')};
  justify-content: center;
  align-items: end;
`
export const DateDiv = styled.div`
  margin: 0 5px;
`
export const Content = styled.div<{ $isMe: boolean; $same: boolean }>`
  background-color: #beccff;
  max-width: 60vw;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: ${props => (!props.$isMe && props.$same ? '50px' : '')};
`
