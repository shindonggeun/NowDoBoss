import { create } from 'zustand'
import {
  FlowSummaryType,
  ResidentSummaryType,
  SalesSummaryType,
  StoreSummaryType,
  UseAnalysisSummaryStoreType,
} from '@src/types/AnalysisSummaryType'

const initialFlowSummary: FlowSummaryType = {
  daily: '',
  age: '',
  gender: '',
  time: '',
  timeInfo: '',
  maxWeek: '',
  minWeek: '',
  ratio: '',
}

const initialSalesSummary: SalesSummaryType = {
  total: '',
  count: '',
  average: '',
  gender: '',
  age: '',
  week: '',
  time: '',
}

const initialStoreSummary: StoreSummaryType = {
  tip: '',
}

const initialResidentSummary: ResidentSummaryType = {
  gender: '남성',
  age: '40대',
}

const useAnalysisSummaryStore = create<UseAnalysisSummaryStoreType>(set => ({
  flowSummary: initialFlowSummary, // 유동인구
  salesSummary: initialSalesSummary, // 매출분석
  storeSummary: initialStoreSummary, // 점포분석
  residentSummary: initialResidentSummary, // 상주인구

  setFlowSummary: (
    key: keyof FlowSummaryType,
    value: FlowSummaryType[keyof FlowSummaryType],
  ) =>
    set(state => ({
      flowSummary: { ...state.flowSummary, [key]: value },
    })),
  setSalesSummary: (
    key: keyof SalesSummaryType,
    value: SalesSummaryType[keyof SalesSummaryType],
  ) =>
    set(state => ({
      salesSummary: { ...state.salesSummary, [key]: value },
    })),
  setStoreSummary: (
    key: keyof StoreSummaryType,
    value: StoreSummaryType[keyof StoreSummaryType],
  ) =>
    set(state => ({
      storeSummary: { ...state.storeSummary, [key]: value },
    })),
  setResidentSummary: (
    key: keyof ResidentSummaryType,
    value: ResidentSummaryType[keyof ResidentSummaryType],
  ) =>
    set(state => ({
      residentSummary: { ...state.residentSummary, [key]: value },
    })),
}))

export default useAnalysisSummaryStore
