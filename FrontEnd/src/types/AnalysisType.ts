// data type
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
export type SelectedServiceType = {
  serviceCode: string
  serviceCodeName: string
}

export type AnalysisStoreType = {
  selectedService: SelectedServiceType
  flowPopulationDataBody: FlowPopulationDataBodyType
  residentPopulationDataBody: ResidentPopulationDataBodyType
  setSelectedService: (service: SelectedServiceType) => void
  setFlowPopulationDataBody: (dataBody: FlowPopulationDataBodyType) => void
  setResidentPopulationDataBody: (
    dataBody: ResidentPopulationDataBodyType,
  ) => void
}

// prop type
export type CategoryTitleCardProps = {
  title: string
}
