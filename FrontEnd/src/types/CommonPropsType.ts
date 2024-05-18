// Chart
export type AreaChartPropsType = {
  labels: string[]
  values: number[]
}

export type BarChartPropsType = {
  labels: string[]
  values: number[]
  minValue: number
  datasetsLabel: string
  pluginUnit: string
  pluginValues?: number[]
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
  subTextCenter: string
}

export type HalfDoughnutChartPropsType = {
  labels: string[]
  values: number[]
}

export type RadarChartPropsType = {
  labels: string[]
  value1: number[]
  value2: number[]
}

export type HorizontalBarChartPropsType = {
  labels: string[]
  values: number[]
  datasetsLabel: string
  aspectRatio: number
  xDisplay: boolean
  pluginUnit: string
  pluginValues?: number[]
}
