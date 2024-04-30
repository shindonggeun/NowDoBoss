import analysisStore from '@src/stores/analysisStore'
import BarChart2 from '@src/common/BarChart2'
import * as f from '@src/components/styles/analysis/FlowPopulationAnalysisStyle'

const WeekChart = () => {
  const { flowPopulationDataBody } = analysisStore()

  const labels: string[] = ['월', '화', '수', '목', '금', '토', '일']
  const values: number[] = Object.values(
    flowPopulationDataBody.dayOfWeekFootTraffic,
  )

  // 가장 높은 값 찾기
  const maxValue: number = Math.max(...values)
  // 해당 인덱스를 사용하여 라벨 찾기
  const maxLabel: string = labels[values.indexOf(maxValue)]

  return (
    <>
      <f.ChartTitle>요일별 유동인구</f.ChartTitle>
      <f.ChartSubTitle>{maxLabel}요일 유동인구가 가장 높아요.</f.ChartSubTitle>
      <BarChart2 labels={labels} values={values} />
    </>
  )
}

export default WeekChart
