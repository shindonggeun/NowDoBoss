import * as c from '@src/containers/chatting/ChattingContainerStyle'
import ChattingHeader from '@src/components/chatting/ChattingHeader'
import ChattingBody from '@src/components/chatting/ChattingBody'
import ChattingInput from '@src/components/chatting/ChattingInput'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageType, PromiseMessageType } from '@src/types/ChattingType'
import { connectStompClient, getStompClient } from '@src/util/chat/stompClient'
import { Client, Frame } from 'webstomp-client'

const ChattingContainer = () => {
  // 현재 이동한 방 id 받기
  const { roomId } = useParams<{ roomId: string | undefined }>()
  const [userId, setUserId] = useState(0)
  const [messages, setMessages] = useState<PromiseMessageType[]>([])
  const [client, setClient] = useState<Client | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // const client = useRef<StompJs.Client | null>(null)

  // 로그인 된 사용자 id 값 받기
  useEffect(() => {
    const userInfo = window.localStorage.getItem('memberInfo')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUserId(user.id)
    }
  }, [])

  // 스크롤 아래로 이동하게 하는 함수
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  // 메세지 보내기
  const sendMessage = useCallback(
    (type: string, content: string) => {
      // const client = getStompClient()
      if (client?.connected) {
        const message: MessageType = {
          chatRoomId: Number(roomId),
          type,
          content,
          senderId: userId,
        }
        client.send(
          `/app/message/${Number(roomId)}`,
          JSON.stringify(message),
          {},
        )
        scrollToBottom()
      } else {
        console.log('Cannot send message. Client is not connected.')
      }
    },
    [client, roomId, userId],
  )

  // 에러 발생 시
  const onError = (error: Frame | string) => {
    if (typeof error === 'string') {
      console.error('Connection string error: ', error)
    } else {
      console.error('Connection frame error: ', error.headers.message)
    }
  }

  useEffect(() => {
    const serverURL = import.meta.env.VITE_REACT_WS_URL as string

    if (client && roomId) {
      const subscription = client.subscribe(
        `/topic/public/rooms/${roomId}`,
        message => {
          const chat = JSON.parse(message.body)
          setMessages(prevMessages => [...prevMessages, chat])
        },
      )
      scrollToBottom()
      return () => subscription.unsubscribe()
    }

    const onConnected = (connectedClient: Client) => {
      setClient(connectedClient)
    }

    sendMessage('ENTER', '') // 방에 입장할 때 메시지 전송
    connectStompClient(serverURL, onConnected, onError)
    scrollToBottom()
    return () => {
      getStompClient()?.disconnect()
    }
  }, [client, roomId, sendMessage]) // client 객체와 roomId 변경 시 구독 재설정

  return (
    <c.Div>
      <ChattingHeader />
      <ChattingBody messages={messages} userId={userId} />
      <ChattingInput onSend={content => sendMessage('TALK', content)} />
    </c.Div>
  )
}

export default ChattingContainer
