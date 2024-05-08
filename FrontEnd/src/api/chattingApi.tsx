import { customAxios } from '@src/util/auth/customAxios'
import { CreateChatRoomData } from '@src/types/ChattingType'

// 채팅방 생성 post api
export const createChatRoom = async (data: CreateChatRoomData) => {
  return customAxios
    .post(`/chat-rooms`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 채팅방 이전 내용 get api
export const fetchMessages = async (chatRoomId: number) => {
  return customAxios
    .get(`/chat-rooms/${chatRoomId}/messages`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 채팅방 입장 post api
export const enterChatRoom = async (chatRoomId: number) => {
  return customAxios
    .post(`/chat-rooms/${chatRoomId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// navbar에 띄울 채팅방 목록 조회 get api
export const fetchMyRooms = async () => {
  return customAxios
    .get(`/chat-rooms/my-rooms`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
