import * as c from '@src/components/styles/chatting/ChattingBodyStyle'
import { PromiseMessageType } from '@src/types/ChattingType'
import { useEffect, useRef } from 'react'

export type ChattingBodyPropsType = {
  messages: PromiseMessageType[]
  userId: number
}

const ChattingBody = (props: ChattingBodyPropsType) => {
  const { messages, userId } = props

  // 스크롤 아래로 내리기 위한 로직
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  // 이전 메세지 번호
  let lastSenderId = 0
  return (
    <c.Container ref={containerRef}>
      {messages.map(message => {
        // 내 메세지이면 오른쪽
        const myMessage = userId === message.senderId
        // const myMessage = false

        // 바로 전 메세지와 같은 사람이 보낼 경우를 확인하기 위한 값
        const same = lastSenderId === message.senderId
        lastSenderId = message.senderId
        console.log(message.senderProfileImage)
        return (
          <c.MessageDiv key={message.chatMessageId} $isMe={myMessage}>
            <c.ImgDiv>
              <c.ProfileImg
                src={
                  message.senderProfileImage
                    ? message.senderProfileImage
                    : 'none'
                }
                $isMe={myMessage}
                $same={same}
              />
            </c.ImgDiv>
            <c.ContentDiv>
              <c.SenderName $isMe={myMessage} $same={same}>
                {message.senderNickname}
              </c.SenderName>
              <c.Content $same={same}>{message.content}</c.Content>
            </c.ContentDiv>
          </c.MessageDiv>
        )
      })}
    </c.Container>
  )
}

export default ChattingBody
