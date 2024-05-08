import React from 'react'

// data type
export type SelectedServiceType = {
  serviceCode: string
  serviceCodeName: string
  serviceType: string
}

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

// store type
export type AnalysisStoreType = {
  selectedServiceType: string
  selectedService: SelectedServiceType
  serviceDataBody: SelectedServiceType[]
  flowPopulationDataBody: FlowPopulationDataBodyType
  residentPopulationDataBody: ResidentPopulationDataBodyType
  setSelectedServiceType: (serviceType: string) => void
  setSelectedService: (service: SelectedServiceType) => void
  setServiceDataBody: (dataBody: SelectedServiceType[]) => void
  setFlowPopulationDataBody: (dataBody: FlowPopulationDataBodyType) => void
  setResidentPopulationDataBody: (
    dataBody: ResidentPopulationDataBodyType,
  ) => void
}

// prop type
export type SelectContainerPropsType = {
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>
}

export type CategoryTitleCardProps = {
  src: string
  title: string
}

export type SearchSectionPropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>
}

export type ChoiceServicePropsType = {
  handleServiceTypeClick: (serviceType: string) => void
}

export type ChoiceServiceDetailPropsType = {
  serviceList: SelectedServiceType[]
}
