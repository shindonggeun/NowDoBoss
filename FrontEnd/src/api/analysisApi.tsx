import { customAxios } from '@src/util/auth/customAxios'

// 유동인구
export const getFlowPopulationData = async (commercialCode: string) => {
  return customAxios
    .get(`/commercial/foot-traffic/${commercialCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 상주인구
export const getResidentPopulationData = async (commercialCode: string) => {
  return customAxios
    .get(`/commercial/population/${commercialCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
