import { customAxios } from '@src/util/auth/customAxios'
import {
  SendTokenDataType,
  SendTopicDataType,
  SubscribeTopicDataType,
} from '@src/types/FcmType'

// fcm 토큰 저장 post api
export const saveFcmToken = async (deviceToken: string) => {
  return customAxios
    .post(`/firebase/message/${deviceToken}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// fcm 토큰 삭제 delete api
export const deleteFcmToken = async (deviceToken: string) => {
  return customAxios
    .delete(`/firebase/message/${deviceToken}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 채팅방 생성 및 입장 시 topic 구독 post api
export const subscribeTopic = async (
  subscribeTopicData: SubscribeTopicDataType,
) => {
  return customAxios
    .post(`/firebase/message/subscribe`, subscribeTopicData)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 채팅방에서 대화 시 내용 topic에 쏘는 post api
export const sendTopic = async (sendTopicData: SendTopicDataType) => {
  return customAxios
    .post(`/firebase/message/topic`, sendTopicData)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// token에 쏘아 1대1 알림 post api
export const sendToken = async (sendTokenData: SendTokenDataType) => {
  return customAxios
    .post(`/firebase/message/token`, sendTokenData)
    .then(res => res.data)
    .catch(err => console.log(err))
}
