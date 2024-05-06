import { customAxios } from '@src/util/auth/customAxios'
import {
  LatLngDataType,
  PromiseCommercialDataType,
  PromiseDongDataType,
  PromiseDongType,
} from '@src/types/MapType'
import queryString from 'query-string'

export const fetchDistrict = async (LatLngData: LatLngDataType) => {
  return customAxios
    .get(`/map/district?${queryString.stringify(LatLngData)}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const fetchAdministration = async (LatLngData: LatLngDataType) => {
  return customAxios
    .get(`/map/administration?${queryString.stringify(LatLngData)}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const fetchCommercial = async (LatLngData: LatLngDataType) => {
  return customAxios
    .get(`/map/commercial?${queryString.stringify(LatLngData)}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 구 코드 보내고 동 목록 받아오는 get api
export const fetchDongList = async (
  districtCode: number,
): Promise<PromiseDongDataType> => {
  return customAxios
    .get(`/commercial/administration/district/${districtCode}/areas`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 동 코드 보내고 상권 목록 받아오는 get api
export const fetchAdministrationList = async (
  administrationCode: number,
): Promise<PromiseCommercialDataType> => {
  return customAxios
    .get(`/commercial/administration/${administrationCode}/areas`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 상권 코드 보내면 역으로 동 정보 받아오는 get api
export const fetchDongInfo = async (
  commercialCode: number,
): Promise<PromiseDongType> => {
  return customAxios
    .get(`/commercial/${commercialCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
