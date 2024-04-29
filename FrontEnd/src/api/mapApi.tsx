import { customAxios } from '@src/util/auth/customAxios'
import { LatLngDataType } from '@src/types/MapType'

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
