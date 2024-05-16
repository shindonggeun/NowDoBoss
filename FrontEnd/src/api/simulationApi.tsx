import { customAxios } from '@src/util/auth/customAxios'
import {
  SimulationDataType,
  SimulationDataTypes,
  SimulationSaveType,
} from '@src/types/SimulationType'

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
  serviceCode: string,
) => {
  return customAxios
    .get(
      `/simulation/franchisee?keyword=${keyword}&lastId=${lastId}&serviceCode=${serviceCode}`,
    )
    .then(res => res.data)
    .catch()
}

// 시뮬레이션 레포트페이지 결과 받기
export const reportCreates = async (data: SimulationDataTypes) => {
  return customAxios
    .post(`/simulation`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const reportCreate = async (data: SimulationDataType) => {
  return customAxios
    .post(`/simulation`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 시뮬레이션 결과 저장
export const reportSave = async (data: SimulationSaveType) => {
  return customAxios
    .post(`/simulation/save`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 시뮬레이션 저장 목록 조회
export const fetchSavedList = async () => {
  return customAxios
    .get(`/simulation`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
