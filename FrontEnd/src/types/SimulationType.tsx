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
