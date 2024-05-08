import React from 'react'

// data type - 업종
export type SelectedServiceType = {
  serviceCode: string
  serviceCodeName: string
  serviceType: string
}

// data type - 유동인구
export type TimeSlotFootTrafficType = {
  footTraffic00: number
  footTraffic06: number
  footTraffic11: number
  footTraffic14: number
  footTraffic17: number
  footTraffic21: number
}

export type DayOfWeekFootTrafficType = {
  monFootTraffic: number
  tueFootTraffic: number
  wedFootTraffic: number
  thuFootTraffic: number
  friFootTraffic: number
  satFootTraffic: number
  sunFootTraffic: number
}

export type AgeGroupFootTrafficType = {
  teenFootTraffic: number
  twentyFootTraffic: number
  thirtyFootTraffic: number
  fortyFootTraffic: number
  fiftyFootTraffic: number
  sixtyFootTraffic: number
}

export type AeGenderPercentFootTrafficType = {
  maleTeenFootTrafficPercent: number
  femaleTeenFootTrafficPercent: number
  maleTwentyFootTrafficPercent: number
  femaleTwentyFootTrafficPercent: number
  maleThirtyFootTrafficPercent: number
  femaleThirtyFootTrafficPercent: number
  maleFortyFootTrafficPercent: number
  femaleFortyFootTrafficPercent: number
  maleFiftyFootTrafficPercent: number
  femaleFiftyFootTrafficPercent: number
  maleSixtyFootTrafficPercent: number
  femaleSixtyFootTrafficPercent: number
}

export type FlowPopulationDataBodyType = {
  timeSlotFootTraffic: TimeSlotFootTrafficType
  dayOfWeekFootTraffic: DayOfWeekFootTrafficType
  ageGroupFootTraffic: AgeGroupFootTrafficType
  ageGenderPercentFootTraffic: AeGenderPercentFootTrafficType
}

// data type - 상주인구
export type PopulationInfoType = {
  totalPopulation: number
  teenPopulation: number
  twentyPopulation: number
  thirtyPopulation: number
  fortyPopulation: number
  fiftyPopulation: number
  sixtyPopulation: number
}

export type ResidentPopulationDataBodyType = {
  populationInfo: PopulationInfoType
  malePercentage: number
  femalePercentage: number
}

// data type - 매출분석
export type TimeSalesInfoType = {
  sales00: number
  sales06: number
  sales11: number
  sales14: number
  sales17: number
  sales21: number
}

export type DaySalesInfoType = {
  monSales: number
  tueSales: number
  wedSales: number
  thuSales: number
  friSales: number
  satSales: number
  sunSales: number
}

export type AgeSalesInfoType = {
  teenSales: number
  twentySales: number
  thirtySales: number
  fortySales: number
  fiftySales: number
  sixtySales: number
}

export type AgeGenderPercentSalesType = {
  maleTeenSalesPercent: number
  femaleTeenSalesPercent: number
  maleTwentySalesPercent: number
  femaleTwentySalesPercent: number
  maleThirtySalesPercent: number
  femaleThirtySalesPercent: number
  maleFortySalesPercent: number
  femaleFortySalesPercent: number
  maleFiftySalesPercent: number
  femaleFiftySalesPercent: number
  maleSixtySalesPercent: number
  femaleSixtySalesPercent: number
}

export type DaySalesCountInfoType = {
  monSalesCount: number
  tueSalesCount: number
  wedSalesCount: number
  thuSalesCount: number
  friSalesCount: number
  satSalesCount: number
  sunSalesCount: number
}

export type TimeSalesCountInfoType = {
  salesCount00: number
  salesCount06: number
  salesCount11: number
  salesCount14: number
  salesCount17: number
  salesCount21: number
}

export type GenderSalesCountInfoType = {
  maleSalesCount: number
  femaleSalesCount: number
}

export type AnnualQuarterSalesInfoType = {
  periodCode: string
  totalSales: number
}

export type SalesDataBodyType = {
  timeSalesInfo: TimeSalesInfoType
  daySalesInfo: DaySalesInfoType
  ageSalesInfo: AgeSalesInfoType
  ageGenderPercentSales: AgeGenderPercentSalesType
  daySalesCountInfo: DaySalesCountInfoType
  timeSalesCountInfo: TimeSalesCountInfoType
  genderSalesCountInfo: GenderSalesCountInfoType
  annualQuarterSalesInfos: AnnualQuarterSalesInfoType[]
}

// data type - 점포 수
export type SameStoreInfoType = {
  serviceCodeName: string
  totalStore: number
}

export type FranchiseeStoreInfoType = {
  normalStore: number
  franchiseeStore: number
  normalStorePercentage: number
  franchiseePercentage: number
}

export type OpenAndCloseStoreInfoType = {
  openedRate: number
  closedRate: number
}

export type StoreCountDataBodyType = {
  sameStoreInfos: SameStoreInfoType[]
  sameTotalStore: number
  franchiseeStoreInfo: FranchiseeStoreInfoType
  openAndCloseStoreInfo: OpenAndCloseStoreInfoType
}

// prop type
export type SelectContainerPropsType = {
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>
  handleResultButtonClick: () => void
}

export type CategoryTitleCardProps = {
  src: string
  title: string
}

export type SearchSectionPropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleResultButtonClick: () => void
}

export type ChoiceServicePropsType = {
  handleServiceTypeClick: (serviceType: string) => void
}

export type ChoiceServiceDetailPropsType = {
  serviceList: SelectedServiceType[]
}

// store type
export type AnalysisStoreType = {
  selectedServiceType: string
  selectedService: SelectedServiceType
  serviceDataBody: SelectedServiceType[]
  flowPopulationDataBody: FlowPopulationDataBodyType
  residentPopulationDataBody: ResidentPopulationDataBodyType
  salesDataBody: SalesDataBodyType
  storeCountDataBody: StoreCountDataBodyType
  setSelectedServiceType: (serviceType: string) => void
  setSelectedService: (service: SelectedServiceType) => void
  setServiceDataBody: (dataBody: SelectedServiceType[]) => void
  setFlowPopulationDataBody: (dataBody: FlowPopulationDataBodyType) => void
  setResidentPopulationDataBody: (
    dataBody: ResidentPopulationDataBodyType,
  ) => void
  setSalesDataBody: (dataBody: SalesDataBodyType) => void
  setStoreCountDataBody: (dataBody: StoreCountDataBodyType) => void
}
