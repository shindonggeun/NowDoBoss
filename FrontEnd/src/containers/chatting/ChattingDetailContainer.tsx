import * as c from '@src/containers/chatting/ChattingContainerStyle'
import ChattingHeader from '@src/components/chatting/ChattingHeader'
import ChattingBody from '@src/components/chatting/ChattingBody'
import ChattingInput from '@src/components/chatting/ChattingInput'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageType, PromiseMessageType } from '@src/types/ChattingType'
import { connectStompClient } from '@src/util/chat/stompClient'
import { Client, Frame } from 'webstomp-client'
import { useQuery } from '@tanstack/react-query'
import { fetchMessages, fetchRoomDetail } from '@src/api/chattingApi'

const ChattingDetailContainer = () => {
  // 현재 이동한 방 id 받기
  const { roomId } = useParams<{ roomId: string | undefined }>()
  const [userId, setUserId] = useState(0)
  const [messages, setMessages] = useState<PromiseMessageType[]>([])
  const [client, setClient] = useState<Client | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // const client = useRef<StompJs.Client | null>(null)

  // useEffect(() => {
  //   setMessages([])
  // }, [roomId])

  // 해당 방에 기존에 존재하는 메세지 불러오는 로직
  const { data: messagesData, isLoading: messagesIsLoading } = useQuery({
    queryKey: ['fetchMessages', roomId],
    queryFn: () => fetchMessages(Number(roomId)),
  })

  // 해당 방 정보 불러오는 로직
  const { data: roomData, isLoading: roomIsLoading } = useQuery({
    queryKey: ['fetchRoomDetail', roomId],
    queryFn: () => fetchRoomDetail(Number(roomId)),
  })

  // 존재하는 메세지를 messages에 담는 로직
  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.dataBody.reverse())
    }
  }, [messagesData, roomId])

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

    // 이미 연결된 클라이언트가 있는지 확인하고, 연결이 없을 때만 연결을 초기화
    if (!client?.connected && roomId) {
      const onConnected = (connectedClient: Client) => {
        setClient(connectedClient)
      }

      // 클라이언트 연결
      connectStompClient(serverURL, onConnected, onError)
    }

    if (client && roomId) {
      const subscription = client.subscribe(
        `/topic/public/rooms/${roomId}`,
        message => {
          const chat = JSON.parse(message.body)
          setMessages(prevMessages => [...prevMessages, chat])
        },
      )

      // 메시지를 받을 때마다 스크롤을 아래로 내립니다
      scrollToBottom()
      // 구독 해제 처리
      return () => subscription.unsubscribe()
    }

    // 컴포넌트 언마운트 시 클라이언트 연결 해제
    return () => {
      // setMessages([])
      if (client) {
        client.disconnect()
      }
    }
  }, [client, roomId, sendMessage]) // client 객체와 roomId 변경 시 구독 재설정

  return (
    <c.Div>
      {messagesData && !messagesIsLoading && roomData && !roomIsLoading && (
        <c.DetailContainer>
          <ChattingHeader roomData={roomData.dataBody} />
          <ChattingBody messages={messages} userId={userId} />
          <ChattingInput onSend={content => sendMessage('TALK', content)} />
        </c.DetailContainer>
      )}
    </c.Div>
  )
}

export default ChattingDetailContainer
