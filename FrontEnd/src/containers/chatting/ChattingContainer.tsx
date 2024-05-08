import * as c from '@src/containers/chatting/ChattingContainerStyle'
import ChattingHeader from '@src/components/chatting/ChattingHeader'
import ChattingBody from '@src/components/chatting/ChattingBody'
import ChattingInput from '@src/components/chatting/ChattingInput'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connectStompClient, getStompClient } from '@src/util/chat/stompClient'
import { MessageType } from '@src/types/ChattingType'
import { Client, Frame } from 'webstomp-client'

const ChattingContainer = () => {
  // 현재 이동한 방 id 받기
  const { roomId } = useParams<{ roomId: string | undefined }>()

  // 로그인 된 사용자 id 값 받기
  const [userId, setUserId] = useState(0)
  useEffect(() => {
    const userInfo = window.localStorage.getItem('memberInfo')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUserId(user.id)
    }
  }, [])

  const [messages, setMessages] = useState<MessageType[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // 스크롤 아래로 이동하게 하는 함수
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  // 메세지 보내기
  const sendMessage = useCallback(
    (type: string, content: string) => {
      const client = getStompClient()
      if (client?.connected) {
        const message = {
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
      } else {
        console.log('Cannot send message. Client is not connected.')
      }
    },
    [roomId, userId],
  )

  useEffect(() => {
    const client = getStompClient()
    if (client && roomId && userId) {
      const subscription = client.subscribe(
        `/topic/public/rooms/${roomId}`,
        message => {
          const chat = JSON.parse(message.body)
          console.log('Received message:', chat)
          setMessages(prevMessages => [...prevMessages, chat])
        },
      )

      sendMessage('ENTER', '') // 방에 입장할 때 메시지 전송

      return () => {
        // 구독 해제
        subscription.unsubscribe()
      }
    }
    return () => {}
  }, [roomId, sendMessage, userId]) // roomId 또는 userId가 변경될 때 구독을 업데이트

  useEffect(() => {
    const serverURL = import.meta.env.VITE_REACT_WS_URL as string
    const onConnected = (client: Client) => {
      const subscription = client.subscribe(
        `/topic/public/rooms/${roomId}`,
        message => {
          // 받은 채팅을 상태 관리
          const chat = JSON.parse(message.body)
          console.log('Received message:', chat)
          setMessages(prevMessages => [...prevMessages, chat])
        },
      )
      scrollToBottom()

      return () => subscription.unsubscribe()
    }

    // 에러 발생 시
    const onError = (error: Frame | string) => {
      if (typeof error === 'string') {
        console.error('Connection string error: ', error)
      } else {
        console.error('Connection frame error: ', error.headers.message)
      }
    }
    connectStompClient(serverURL, onConnected, onError)

    // 연결 종료 로직
    return () => {
      getStompClient()?.disconnect()
    }
  }, [roomId]) // 서버 URL이 변경되는 경우에만 연결을 재설정

  // useEffect(() => {
  //   const serverURL = import.meta.env.VITE_REACT_WS_URL as string
  //   const onConnected = (client: Client) => {
  //     const subscription = client.subscribe(
  //       `/topic/public/rooms/${roomId}`,
  //       message => {
  //         // 받은 채팅을 상태 관리
  //         const chat = JSON.parse(message.body)
  //         console.log('Received message:', chat)
  //         setMessages(prevMessages => [...prevMessages, chat])
  //       },
  //     )
  //     setNewMessage(defaultMessage)
  //     scrollToBottom()
  //
  //     return () => subscription.unsubscribe()
  //   }
  //
  //   // 에러 발생 시
  //   const onError = (error: Frame | string) => {
  //     if (typeof error === 'string') {
  //       console.error('Connection string error: ', error)
  //     } else {
  //       console.error('Connection frame error: ', error.headers.message)
  //     }
  //   }
  //
  //   sendMessage('ENTER', '')
  //
  //   connectStompClient(serverURL, onConnected, onError)
  //
  //   return () => {
  //     getStompClient()?.disconnect()
  //   }
  // }, [roomId, userId])

  return (
    <c.Div>
      <ChattingHeader />
      <ChattingBody messages={messages} />
      <ChattingInput onSend={content => sendMessage('TALK', content)} />
    </c.Div>
  )
}

export default ChattingContainer
