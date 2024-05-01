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
export type AnalysisStoreType = {
  selectedCommercialCode: string
  selectedServiceCode: string
  flowPopulationDataBody: FlowPopulationDataBodyType
  residentPopulationDataBody: ResidentPopulationDataBodyType
  setSelectedCommercialCode: (commercialCode: string) => void
  setSelectedServiceCode: (serviceCode: string) => void
  setFlowPopulationDataBody: (dataBody: FlowPopulationDataBodyType) => void
  setResidentPopulationDataBody: (
    dataBody: ResidentPopulationDataBodyType,
  ) => void
}

// prop type
export type CategoryTitleCardProps = {
  title: string
}

export type AreaChartPropsType = {
  labels: string[]
  values: number[]
}

export type BarChartPropsType = {
  labels: string[]
  values: number[]
}

export type ComboChartPropsType = {
  labels: string[]
  value1: number[]
  value2: number[]
}

export type DoughnutChartPropsType = {
  labels: string[]
  value: number[]
  textCenter: string
}
