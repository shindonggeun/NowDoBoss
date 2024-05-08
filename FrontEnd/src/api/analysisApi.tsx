import { customAxios } from '@src/util/auth/customAxios'

// 업종 선택
export const getServiceData = async (commercialCode: string) => {
  return customAxios
    .get(`/commercial/service/${commercialCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

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

// 매출분석
export const getSalesData = async (
  commercialCode: string,
  serviceCode: string,
) => {
  return customAxios
    .get(`/commercial/sales/${commercialCode}/${serviceCode}?periodCode=20192`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 점포 수
export const getStoreCountData = async (
  commercialCode: string,
  serviceCode: string,
) => {
  return customAxios
    .get(`/commercial/store/${commercialCode}/${serviceCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
