export type MessageType = {
  chatRoomId: number
  type: 'ENTER' | 'EXIT' | 'TALK' | null
  content: string
  senderId: number
}

export type CreateChatRoomData = {
  category: string
  name: string
  introduction: string
}
