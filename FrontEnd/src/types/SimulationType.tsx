// [NOTE] 시뮬레이션

export interface SizeItem {
  squareMeter: number
  pyeong: number
}

export interface StoreSize {
  small: SizeItem
  medium: SizeItem
  large: SizeItem
}

export interface StoreSizeDataBody {
  dataHeader: {
    successCode: number
    resultCode: null
    resultMessage: null
  }
  dataBody: StoreSize
}

export interface DaumDataType {
  address: string
  addressEnglish: string
  addressType: string
  apartment: string
  autoJibunAddress: string
  autoJibunAddressEnglish: string
  autoRoadAddress: string
  autoRoadAddressEnglish: string
  bcode: string
  bname: string
  bname1: string
  bname1English: string
  bname2: string
  bname2English: string
  bnameEnglish: string
  buildingCode: string
  buildingName: string
  hname: string
  jibunAddress: string
  jibunAddressEnglish: string
  noSelected: string
  postcode: string
  postcode1: string
  postcode2: string
  postcodeSeq: string
  query: string
  roadAddress: string
  roadAddressEnglish: string
  roadname: string
  roadnameCode: string
  roadnameEnglish: string
  sido: string
  sidoEnglish: string
  sigungu: string
  sigunguCode: string
  sigunguEnglish: string
  userLanguageType: string
  userSelectedType: string
  zonecode: string
}

// 프렌차이즈 검색 응답 type
export interface FranchiseListType {
  brandName: string
  franchiseeId: number
  serviceCode: string
  serviceCodeName: string
}

export interface FranchiseDataBody {
  dataHeader: {
    successCode: number
    resultCode: null
    resultMessage: null
  }
  dataBody: FranchiseListType[]
}

// 시뮬레이션 레포트 요청 데이터 타입
export interface SimulationDataType {
  isFranchisee: boolean | null
  brandName: string | null
  gugun: string
  serviceCode: string
  serviceCodeName: string
  storeSize: number
  floor: string
}

// [NOTE] 레포트 타입

export interface SimulationReportType {
  totalPrice: number
  keyMoneyInfo: {
    keyMoneyRatio: number
    keyMoney: number
    keyMoneyLevel: number
  }
  detail: {
    rentPrice: number
    deposit: number
    interior: number
    levy: number
  }
  franchisees: {
    totalPrice: number
    brandName: string
    subscription: number
    education: number
    deposit: number
    etc: number
    interior: number
  }[]
  genderAndAgeAnalysisInfo: {
    maleSalesPercent: number
    femaleSalesPercent: number
    first: {
      sales: number
      name: string
    }
    second: {
      sales: number
      name: string
    }
    third: {
      sales: number
      name: string
    }
  }
  monthAnalysisInfo: {
    peakSeasons: number[]
    offPeakSeasons: number[]
  }
}

// 시물레이션 결과 저장 요청 데이터 타입
export interface SimulationSaveType {
  totalPrice: number
  isFranchisee: boolean
  brandName: string
  gugun: string
  serviceCode: string
  serviceCodeName: string
  storeSize: number
  floor: string
}
