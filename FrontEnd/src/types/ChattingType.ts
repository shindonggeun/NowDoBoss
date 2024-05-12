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
  chatRoomId: number
  chatMessageId: number
  content: string
  createdAt: string
  senderId: number
  senderNickname: string
  senderProfileImage: string
  type: string
}

// 인기 채팅방 카드 타입
export type PromisePopularMessageType = {
  category: string
  chatRoomId: number
  introduction: string
  limit: number
  memberCount: number
  name: string
}

export type PopularType = {
  communityId: number
  category: string
  title: string
  content: string
  image: string
  writerId: number
  writerNickname: string
  profileImage: string
  readCount: number
  commentCount: number
}
