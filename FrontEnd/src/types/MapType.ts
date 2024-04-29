export type LatLngDataType = {
  lngNE: number
  latNE: number
  lngSW: number
  latSW: number
}

export type DataBodyType = {
  codes: string[]
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

type Coord = [number, number]
