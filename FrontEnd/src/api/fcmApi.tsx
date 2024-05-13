import { customAxios } from '@src/util/auth/customAxios'

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
