// [NOTE] 자치구 TOP List 목록 조회
export interface TopListItem {
  districtCode: string
  districtCodeName: string
  total: number
  totalRate: number
  level: number
}

export interface TopList {
  footTrafficTopTenList: TopListItem[]
  openedRateTopTenList: TopListItem[]
  salesTopTenList: TopListItem[]
  closedRateTopTenList: TopListItem[]
}

export interface DataBody {
  dataHeader: {
    successCode: number
    resultCode: null
    resultMessage: null
  }
  dataBody: TopList
}

// [NOTE] 상권현황 자치구별 상세 조회
// 상권 변화 지표 상세 분석
export interface ChangeIndicatorDistrictDetail {
  changeIndicator: string
  changeIndicatorName: string
  openedMonths: number
  closedMonths: number
}

// 분기 별 유동 인구
export interface FootTrafficDistrictListByPeriod {
  summary: string
  data: {
    [key: string]: number
  }
}

// 시간대 별 유동인구
export interface FootTrafficDistrictListByTime {
  summary: string
  data: {
    [key: string]: number
  }
}

// 남녀 유동인구
export interface FootTrafficDistrictListByGender {
  summary: string
  data: {
    male: number
    female: number
  }
}

// 연령대 별 유동인구
export interface FootTrafficDistrictListByAge {
  summary: string
  data: {
    [key: string]: number
  }
}

// 요일 별 유동인구
export interface FootTrafficDistrictListByDay {
  summary: string
  data: {
    [key: string]: number
  }
}

// 유동인구 상세분석
export interface FootTrafficDistrictDetail {
  footTrafficDistrictListByPeriod: FootTrafficDistrictListByPeriod
  footTrafficDistrictListByTime: FootTrafficDistrictListByTime
  footTrafficDistrictListByGender: FootTrafficDistrictListByGender
  footTrafficDistrictListByAge: FootTrafficDistrictListByAge
  footTrafficDistrictListByDay: FootTrafficDistrictListByDay
}

// 서비스 업종 별 점포수 Top 8
export interface StoreDistrictTotalTopEightList {
  serviceCode: string
  serviceCodeName: string
  totalStore: number
}

// 행정동 별 개업률 Top 5
export interface OpenedStoreAdministrationTopFiveList {
  administrationCode: string
  administrationCodeName: string
  curOpenedRate: number
}

// 행정동 별 폐업률 Top 5
export interface ClosedStoreAdministrationTopFiveList {
  administrationCode: string
  administrationCodeName: string
  curClosedRate: number
}

export interface StoreDistrictDetail {
  storeDistrictTotalTopEightList: StoreDistrictTotalTopEightList[]
  openedStoreAdministrationTopFiveList: OpenedStoreAdministrationTopFiveList[]
  closedStoreAdministrationTopFiveList: ClosedStoreAdministrationTopFiveList[]
}

export interface SalesDistrictSalesTopFiveList {
  serviceCode: string
  serviceCodeName: string
  monthSalesChangeRate: number
}

export interface SalesAdministrationTopFiveList {
  administrationCode: string
  administrationCodeName: string
  monthSalesChangeRate: number
}

export interface SalesDistrictDetail {
  salesDistrictSalesTopFiveList: SalesDistrictSalesTopFiveList[]
  salesAdministrationTopFiveList: SalesAdministrationTopFiveList[]
}

// 자치구 상세분석 data 아무튼 여기에 다 들어있음
export interface DetailDataBody {
  changeIndicatorDistrictDetail: ChangeIndicatorDistrictDetail
  footTrafficDistrictDetail: FootTrafficDistrictDetail
  storeDistrictDetail: StoreDistrictDetail
  salesDistrictDetail: SalesDistrictDetail
}

export interface StatusResponse {
  dataHeader: {
    successCode: number
    resultCode: null
    resultMessage: null
  }
  dataBody: DetailDataBody
}
