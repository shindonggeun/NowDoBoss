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
