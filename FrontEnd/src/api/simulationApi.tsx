import { customAxios } from '@src/util/auth/customAxios'
import { SimulationDataType } from '@src/types/SimulationType'

// 시뮬레이션 업종별 가게 사이즈
export const fetchStoreSize = async (serviceCode: string) => {
  return customAxios
    .get(`/simulation/store?serviceCode=${serviceCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 시뮬레이션 프렌차이즈 검색
export const fetchFranchiseList = async (
  keyword: string | null,
  lastId: number,
) => {
  return customAxios
    .get(`/simulation/franchisee?keyword=${keyword}&lastId=${lastId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 시뮬레이션 레포트페이지 결과 받기
export const reportCreate = async (data: SimulationDataType) => {
  return customAxios
    .post(`/simulation`, data, {
      // headers: { 'Content-Type': 'multipart/form-data' },
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}
