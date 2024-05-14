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
export const fetchMyRooms = async (searchContent: string) => {
  return customAxios
    .get(`/chat-rooms/my-rooms?keyword=${searchContent}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 인기 채팅방 목록 조회 get api
export const fetchPopularRoom = async (category: string) => {
  return customAxios
    .get(`/chat-rooms/popular-room?category=${category}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 채팅 목록 get api
export const fetchChattingList = async (lastId: number) => {
  return customAxios
    .get(`/chat-rooms?lastId=${lastId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 채팅방 상세 조회 get api
export const fetchRoomDetail = async (chatRoomId: number) => {
  return customAxios
    .get(`/chat-rooms/${chatRoomId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 채팅방 나가기 delete api
export const roomExit = async (chatRoomId: number) => {
  return customAxios
    .delete(`/chat-rooms/${chatRoomId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
