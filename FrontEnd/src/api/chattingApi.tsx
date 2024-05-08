import { customAxios } from '@src/util/auth/customAxios'
import { CreateChatRoomData } from '@src/types/ChattingType'

// 채팅방 생성 post api
export const createChatRoom = async (data: CreateChatRoomData) => {
  return customAxios
    .post(`/chat-rooms`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}
