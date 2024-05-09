import * as c from '@src/components/styles/chatting/ChattingBodyStyle'
import { PromiseMessageType } from '@src/types/ChattingType'
import { useEffect, useRef } from 'react'
import { format, isSameDay, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

export type ChattingBodyPropsType = {
  messages: PromiseMessageType[]
  userId: number
}

// 시간을 HH:mm 포맷으로 변환하는 함수
const formatTime = (dateString: string) => {
  return format(parseISO(dateString), 'HH:mm')
}

// 날짜가 변경되었는지 확인하는 함수
const isNewDay = (prevDate: string | null, currDate: string) => {
  if (!prevDate) return true
  return !isSameDay(parseISO(prevDate), parseISO(currDate))
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

  // 이전 메시지의 날짜를 저장하기 위한 변수
  let lastDate: string | null = null
  return (
    <c.Container ref={containerRef}>
      {messages.map(message => {
        // 내 메세지이면 오른쪽
        const myMessage = userId === message.senderId
        // const myMessage = false

        // 바로 전 메세지와 같은 사람이 보낼 경우를 확인하기 위한 값
        const same = lastSenderId === message.senderId
        lastSenderId = message.senderId

        const messageTime = formatTime(message.createdAt)

        const messageDay = isNewDay(lastDate, message.createdAt)
        lastDate = message.createdAt // 날짜 업데이트

        return (
          <c.Div key={message.chatMessageId}>
            {messageDay && (
              <c.DateSeparator>
                {format(parseISO(message.createdAt), 'PPP', { locale: ko })}
              </c.DateSeparator>
            )}
            <c.MessageDiv $isMe={myMessage}>
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
                <c.RowDiv $isMe={myMessage}>
                  <c.Content $isMe={myMessage} $same={same}>
                    {message.content}
                  </c.Content>
                  <c.DateDiv>{messageTime}</c.DateDiv>
                </c.RowDiv>
              </c.ContentDiv>
            </c.MessageDiv>
          </c.Div>
        )
      })}
    </c.Container>
  )
}

export default ChattingBody
