export type LatLngDataType = {
  lngNE: number
  latNE: number
  lngSW: number
  latSW: number
}

export type DataBodyType = {
  names: { [key: string]: [number, number] }
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

export type Coord = [number, number, number]

export type LatLng = { lat: number; lng: number }

// 구 데이터 전달 후 동 목록 받아왔을 때의 promise type
export type PromiseDongDataType = {
  dataHeader: DataHeaderType
  dataBody: {
    administrationCodeName: string
    administrationCode: number
  }[]
}

// 구 데이터 전달 후 동 목록 받아왔을 때의 promise type
export type PromiseCommercialDataType = {
  dataHeader: DataHeaderType
  dataBody: {
    commercialCode: number
    commercialCodeName: string
    commercialClassificationCode: string
    commercialClassificationCodeName: string
  }[]
}
