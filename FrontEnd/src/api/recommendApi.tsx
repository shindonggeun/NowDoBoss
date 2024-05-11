import { customAxios } from '@src/util/auth/customAxios'

// 상권 추천 get api
export const recommendCommercial = async (codes: {
  districtCode: number
  administrationCode: number
}) => {
  return customAxios
    .get(`/recommendation/${codes.districtCode}/${codes.administrationCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
