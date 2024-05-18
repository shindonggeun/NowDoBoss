// 창업 시뮬레이션 요청 데이터 타입
export interface SimulationData {
  isFranchisee: boolean | null
  brandName: string | null
  gugun: string
  serviceCode: string
  serviceCodeName: string
  storeSize: number
  floor: string
}

export interface SimulationDataType {
  url: string
  input: SimulationData
}
