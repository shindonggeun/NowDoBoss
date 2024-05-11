import { customAxios } from '@src/util/auth/customAxios'

// 업종 선택
export const getMemberInfoData = async () => {
  return customAxios
    .get(`/member/get`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
