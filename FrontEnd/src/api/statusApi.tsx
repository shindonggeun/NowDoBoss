import { customAxios } from '@src/util/auth/customAxios'

// 자치구 top10 리스트 + 자치구 나열
export const fetchTopList = async () => {
  return customAxios
    .get(`/district/top/ten`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 상권현황 자치구 상세분석
export const fetchStatusDetail = async (districtCode: number) => {
  return customAxios
    .get(`/district/detail/${districtCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// [NOTE] 상권현황 상세 데이터 분리
// 자치구 유동인구 상세 분석
export const fetchStatusFootTraffic = async (districtCode: number) => {
  return customAxios
    .get(`/district/detail/footTraffic/${districtCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 자치구 상권 변화지표 상세 분석
export const fetchStatusChangeIndicator = async (districtCode: number) => {
  return customAxios
    .get(`/district/detail/changeIndicator/${districtCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 자치구 상권 점포수 상세 분석
export const fetchStatusStore = async (districtCode: number) => {
  return customAxios
    .get(`/district/detail/store/total/${districtCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 자치구 상권 개업률 상세 분석
export const fetchStatusOpen = async (districtCode: number) => {
  return customAxios
    .get(`/district/detail/store/opened/${districtCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 자치구 상권 폐업률 상세 분석
export const fetchStatusClose = async (districtCode: number) => {
  return customAxios
    .get(`/district/detail/store/closed/${districtCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 자치구 상권 업종별 매출 상세 분석
export const fetchStatusService = async (districtCode: number) => {
  return customAxios
    .get(`/district/detail/sales/service/${districtCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 자치구 상권 행정동별 매출 상세 분석
export const fetchStatusSale = async (districtCode: number) => {
  return customAxios
    .get(`/district/detail/sales/administration/${districtCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
