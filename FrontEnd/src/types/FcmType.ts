// 토픽 구독
export type subscribeTopicDataType = {
  token: string
  topicName: string
}

// 토픽에 알림
export type sendTopicDataType = {
  title: string
  body: string
  topicName: string
}

// 토큰에 알림, 개인 회원에게 보내는 메세지
export type sendTokenDataType = {
  title: string
  body: string
  memberId: string
}
