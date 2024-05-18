export type FlowSummaryType = {
  daily: string
  age: string
  gender: string
  time: string
  timeInfo: string
  maxWeek: string
  minWeek: string
  ratio: string
}

export type SalesSummaryType = {
  total: string
  monthly: string
  average: string
  gender: string
  age: string
  week: string
  time: string
}

export type StoreSummaryType = {
  tip: string
}

export type ResidentSummaryType = {
  gender: string
  age: string
}

export type UseAnalysisSummaryStoreType = {
  flowSummary: FlowSummaryType // 유동인구
  salesSummary: SalesSummaryType // 매출분석
  storeSummary: StoreSummaryType // 점포분석
  residentSummary: ResidentSummaryType // 상주인구

  setFlowSummary: <K extends keyof FlowSummaryType>(
    key: K,
    value: FlowSummaryType[K],
  ) => void
  setSalesSummary: <K extends keyof SalesSummaryType>(
    key: K,
    value: SalesSummaryType[K],
  ) => void
  setStoreSummary: <K extends keyof StoreSummaryType>(
    key: K,
    value: StoreSummaryType[K],
  ) => void
  setResidentSummary: <K extends keyof ResidentSummaryType>(
    key: K,
    value: ResidentSummaryType[K],
  ) => void
}
