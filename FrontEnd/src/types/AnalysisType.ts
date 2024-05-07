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

export type FlowPopulationDataBodyType = {
  timeSlotFootTraffic: TimeSlotFootTrafficType
  dayOfWeekFootTraffic: DayOfWeekFootTrafficType
  ageGroupFootTraffic: AgeGroupFootTrafficType
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
  selectedService: SelectedServiceType
  serviceDataBody: SelectedServiceType[]
  flowPopulationDataBody: FlowPopulationDataBodyType
  residentPopulationDataBody: ResidentPopulationDataBodyType
  setSelectedService: (service: SelectedServiceType) => void
  setServiceDataBody: (dataBody: SelectedServiceType[]) => void
  setFlowPopulationDataBody: (dataBody: FlowPopulationDataBodyType) => void
  setResidentPopulationDataBody: (
    dataBody: ResidentPopulationDataBodyType,
  ) => void
}

// prop type
export type CategoryTitleCardProps = {
  title: string
}

export type SearchSectionPropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type ChoiceServicePropsType = {
  handleServiceTypeClick: (serviceType: string) => void
  selectedType: string
}

export type ChoiceServiceDetailPropsType = {
  serviceList: SelectedServiceType[]
}
