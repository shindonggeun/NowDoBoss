import { create } from 'zustand'
import {
  AnalysisStoreType,
  FlowPopulationDataBodyType,
  ResidentPopulationDataBodyType,
  SelectedServiceType,
} from '@src/types/AnalysisType'

// 초기 상태를 위한 객체
const initialSelectService: SelectedServiceType = {
  serviceCode: 'CS100001',
  serviceCodeName: '한식음식점',
}

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
  selectedService: initialSelectService,
  flowPopulationDataBody: initialFlowPopulationDataBody,
  residentPopulationDataBody: initialResidentPopulationDataBody,

  setSelectedService: service => set(() => ({ selectedService: service })),
  setFlowPopulationDataBody: dataBody =>
    set({ flowPopulationDataBody: dataBody }),
  setResidentPopulationDataBody: dataBody =>
    set({ residentPopulationDataBody: dataBody }),
}))

export default analysisStore
