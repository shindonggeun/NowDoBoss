export interface TopListItem {
  districtCode: string
  districtCodeName: string
  totalFootTraffic: number
  totalFootTrafficChangeRate: number
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
