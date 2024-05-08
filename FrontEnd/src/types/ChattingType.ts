// 보내는 메세지 타입
export type MessageType = {
  chatRoomId: number
  type: string | null
  content: string
  senderId: number
}

export type CreateChatRoomData = {
  category: string
  name: string
  introduction: string
  limit: number
}

// 받은 메세지 타입
export type PromiseMessageType = {
  chatMessageId: number
  chatRoomId: number
  content: string
  createdAt: Date
  senderId: number
  senderNickname: string
  senderProfileImage: string
  type: string
}
