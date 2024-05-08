import { create } from 'zustand'
import {
  AnalysisStoreType,
  FlowPopulationDataBodyType,
  ResidentPopulationDataBodyType,
  SelectedServiceType,
} from '@src/types/AnalysisType'

// 초기 상태를 위한 객체
const initialSelectService: SelectedServiceType = {
  serviceCode: '',
  serviceCodeName: '',
  serviceType: '',
}

const initialServiceDataBody: SelectedServiceType[] = []

const initialFlowPopulationDataBody: FlowPopulationDataBodyType = {
  timeSlotFootTraffic: {
    footTraffic00: 0,
    footTraffic06: 0,
    footTraffic11: 0,
    footTraffic14: 0,
    footTraffic17: 0,
    footTraffic21: 0,
  },
  dayOfWeekFootTraffic: {
    monFootTraffic: 0,
    tueFootTraffic: 0,
    wedFootTraffic: 0,
    thuFootTraffic: 0,
    friFootTraffic: 0,
    satFootTraffic: 0,
    sunFootTraffic: 0,
  },
  ageGroupFootTraffic: {
    teenFootTraffic: 0,
    twentyFootTraffic: 0,
    thirtyFootTraffic: 0,
    fortyFootTraffic: 0,
    fiftyFootTraffic: 0,
    sixtyFootTraffic: 0,
  },
  ageGenderPercentFootTraffic: {
    maleTeenFootTrafficPercent: 0,
    femaleTeenFootTrafficPercent: 0,
    maleTwentyFootTrafficPercent: 0,
    femaleTwentyFootTrafficPercent: 0,
    maleThirtyFootTrafficPercent: 0,
    femaleThirtyFootTrafficPercent: 0,
    maleFortyFootTrafficPercent: 0,
    femaleFortyFootTrafficPercent: 0,
    maleFiftyFootTrafficPercent: 0,
    femaleFiftyFootTrafficPercent: 0,
    maleSixtyFootTrafficPercent: 0,
    femaleSixtyFootTrafficPercent: 0,
  },
}

const initialResidentPopulationDataBody: ResidentPopulationDataBodyType = {
  populationInfo: {
    totalPopulation: 0,
    teenPopulation: 0,
    twentyPopulation: 0,
    thirtyPopulation: 0,
    fortyPopulation: 0,
    fiftyPopulation: 0,
    sixtyPopulation: 0,
  },
  malePercentage: 0,
  femalePercentage: 0,
}

// store
const analysisStore = create<AnalysisStoreType>(set => ({
  selectedServiceType: '', // 선택한 업종 대분류
  selectedService: initialSelectService, // 선택한 업종 소분류
  serviceDataBody: initialServiceDataBody, // 업종 API 반환 데이터
  flowPopulationDataBody: initialFlowPopulationDataBody, // 유동인구 API 반환 데이터
  residentPopulationDataBody: initialResidentPopulationDataBody, // 상주인구 API 반환 데이터

  setSelectedServiceType: serviceType =>
    set({ selectedServiceType: serviceType }),
  setSelectedService: service => set(() => ({ selectedService: service })),
  setServiceDataBody: dataBody => set({ serviceDataBody: dataBody }),
  setFlowPopulationDataBody: dataBody =>
    set({ flowPopulationDataBody: dataBody }),
  setResidentPopulationDataBody: dataBody =>
    set({ residentPopulationDataBody: dataBody }),
}))

export default analysisStore
