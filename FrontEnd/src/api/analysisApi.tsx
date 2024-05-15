import { customAxios } from '@src/util/auth/customAxios'
import { AnalysisBookmarksDataType } from '@src/types/AnalysisType'
// 업종 선택
export const getServiceData = async (commercialCode: string) => {
  return customAxios
    .get(`/commercial/service/${commercialCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 유동인구
export const getFlowPopulationData = async (
  commercialCode: string,
  periodCode: string,
) => {
  return customAxios
    .get(`/commercial/foot-traffic/${commercialCode}?periodCode=${periodCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 매출분석
export const getSalesData = async (
  commercialCode: string,
  serviceCode: string,
) => {
  return customAxios
    .get(`/commercial/sales/${commercialCode}/${serviceCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 매출분석 (매출 총 금액)
export const getTotalSalesData = async (
  districtCode: string,
  administrationCode: string,
  commercialCode: string,
  serviceCode: string,
) => {
  return customAxios
    .get(
      `/commercial/sales/${districtCode}/${administrationCode}/${commercialCode}/${serviceCode}`,
    )
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

// 상주인구
export const getResidentPopulationData = async (commercialCode: string) => {
  return customAxios
    .get(`/commercial/population/${commercialCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 지출내역
export const getExpenditureData = async (commercialCode: string) => {
  return customAxios
    .get(`/commercial/income/${commercialCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 지출내역 (총 지출 금액)
export const getTotalExpenditureData = async (
  districtCode: string,
  administrationCode: string,
  commercialCode: string,
) => {
  return customAxios
    .get(
      `/commercial/income/${districtCode}/${administrationCode}/${commercialCode}`,
    )
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 북마크
export const postAnalysisBookmarks = async (
  data: AnalysisBookmarksDataType,
) => {
  return customAxios
    .post(`/commercial/analysis`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}
