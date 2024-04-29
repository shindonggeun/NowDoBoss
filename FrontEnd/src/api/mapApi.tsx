import { customAxios } from '@src/util/auth/customAxios'
import { LatLngDataType } from '@src/types/MapType.tsx'

export const fetchDistrict = async (LatLngData: LatLngDataType) => {
  return customAxios
    .get(
      `/map/district?lngNE=${LatLngData.lngNE}&latNE=${LatLngData.latNE}&lngSW=${LatLngData.lngSW}&latSW=${LatLngData.latSW}`,
    )
    .then(res => res.data)
    .catch(err => console.log(err))
}
