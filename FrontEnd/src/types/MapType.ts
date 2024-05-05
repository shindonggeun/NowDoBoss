export type LatLngDataType = {
  lngNE: number
  latNE: number
  lngSW: number
  latSW: number
}

// 받아온 데이터 타입
export type DataBodyType = {
  names: { [key: string]: { center: [number, number]; code: number } }
  coords: { [key: string]: Coord[] }
}

export type DataHeaderType = {
  successCode: number
  resultCode: null | string
  resultMessage: null | string
}

export type PromiseDataType = {
  dataBody: DataBodyType
  dataHeader: DataHeaderType
}

// 재가공한 데이터 타입
export type RemakeType = {
  name: string
  center: LatLng
  code: number
  path: LatLng[]
}[]

// 경도, 위도, 순서
export type Coord = [number, number, number]

// lat: 위도, lng: 경도
export type LatLng = { lat: number; lng: number }

// 동 목록 데이터 body
export type DongBody = {
  administrationCodeName: string
  administrationCode: number
  centerLat: number
  centerLng: number
}[]

// 상권 목록 데이터 body
export type CommercialBody = {
  commercialCode: number
  commercialCodeName: string
  commercialClassificationCode: string
  commercialClassificationCodeName: string
  centerLat: number
  centerLng: number
}[]

// 구 데이터 전달 후 동 목록 받아왔을 때의 promise type
export type PromiseDongDataType = {
  dataHeader: DataHeaderType
  dataBody: DongBody
}

// 구 데이터 전달 후 동 목록 받아왔을 때의 promise type
export type PromiseCommercialDataType = {
  dataHeader: DataHeaderType
  dataBody: CommercialBody
}

export type PromiseDongBody = {
  administrationCodeName: string
  administrationCode: number
}

//  상권 코드 보내면 역으로 동 정보 받아왔을 때의 promise type
export type PromiseDongType = {
  dataHeader: DataHeaderType
  dataBody: PromiseDongBody
}
