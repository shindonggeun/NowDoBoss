import { customAxios } from '@src/util/auth/customAxios'

// 회원정보 가져오기
export const getMemberInfoData = async () => {
  return customAxios
    .get(`/member/get`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 프로필 이미지 업로드
export const UploadProfileImage = async (data: FormData) => {
  return customAxios
    .post(`/firebase/upload`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}

//
