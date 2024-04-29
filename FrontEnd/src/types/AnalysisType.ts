// paths type
// params type

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

// store type
export type AnalysisStoreType = {
  selectedCommercialCode: string
  selectedServiceCode: string
  flowPopulationDataBody: FlowPopulationDataBodyType
  setSelectedCommercialCode: (commercialCode: string) => void
  setSelectedServiceCode: (serviceCode: string) => void
  setFlowPopulationDataBody: (dataBody: FlowPopulationDataBodyType) => void
}

// prop type
export type CategoryTitleCardProps = {
  title: string
}

export type AreaChartPropsType = {
  labels: string[]
  values: number[]
}
