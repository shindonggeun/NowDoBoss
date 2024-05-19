import { customAxios } from '@src/util/auth/customAxios'
import { PromiseSaveListType } from '@src/types/GlobalType'

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

// 추천 상권 저장 post api
export const recommendSave = async (codes: {
  districtCode: number
  administrationCode: number
  commercialCode: number
}) => {
  return customAxios
    .post(
      `/recommendation/${codes.districtCode}/${codes.administrationCode}/${codes.commercialCode}/save`,
    )
    .then(res => res.data)
    .catch(err => console.log(err))
}
// 추천 상권 삭제 delete api
export const recommendDelete = async (codes: {
  districtCode: number
  administrationCode: number
  commercialCode: number
}) => {
  return customAxios
    .delete(
      `/recommendation/${codes.districtCode}/${codes.administrationCode}/${codes.commercialCode}/cancel`,
    )
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 추천 상권 저장 목록 조회 get api
export const recommendSaveList = async (): Promise<PromiseSaveListType> => {
  return customAxios
    .get(`/recommendation/save/list`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 추천 상권 저장 목록 조회 get api
export const recommendSaveDetail = async () => {
  return customAxios
    .get(`/recommendation/save/detail`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
