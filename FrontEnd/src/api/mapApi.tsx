import { customAxios } from '@src/util/auth/customAxios'
import {
  LatLngDataType,
  PromiseCommercialDataType,
  PromiseDongDataType,
} from '@src/types/MapType'

export const fetchDistrict = async (LatLngData: LatLngDataType) => {
  return customAxios
    .get(
      `/map/district?lngNE=${LatLngData.lngNE}&latNE=${LatLngData.latNE}&lngSW=${LatLngData.lngSW}&latSW=${LatLngData.latSW}`,
    )
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const fetchAdministration = async (LatLngData: LatLngDataType) => {
  return customAxios
    .get(
      `/map/administration?lngNE=${LatLngData.lngNE}&latNE=${LatLngData.latNE}&lngSW=${LatLngData.lngSW}&latSW=${LatLngData.latSW}`,
    )
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const fetchCommercial = async (LatLngData: LatLngDataType) => {
  return customAxios
    .get(
      `/map/commercial?lngNE=${LatLngData.lngNE}&latNE=${LatLngData.latNE}&lngSW=${LatLngData.lngSW}&latSW=${LatLngData.latSW}`,
    )
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
