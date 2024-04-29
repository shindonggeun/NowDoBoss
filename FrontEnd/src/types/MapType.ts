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

export type Coord = [number, number]

export type LatLng = { lat: number; lng: number }
