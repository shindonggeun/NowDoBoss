import analysisStore from '@src/stores/analysisStore'
import BarChart2 from '@src/common/BarChart2'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const WeekNumberChart = () => {
  const salesDataBody = analysisStore(state => state.salesDataBody)

  const labels: string[] = ['월', '화', '수', '목', '금', '토', '일']
  const values: number[] = Object.values(salesDataBody.daySalesCountInfo)

  // 가장 높은 값 찾기
  const maxValue: number = Math.max(...values)
  // 해당 인덱스를 사용하여 라벨 찾기
  const maxLabel: string = labels[values.indexOf(maxValue)]

  return (
    <s.WeekNumberChart>
      <s.ChartTitle>요일별 매출건수</s.ChartTitle>
      <s.ChartSubTitle>{maxLabel}요일 매출건수가 가장 높아요.</s.ChartSubTitle>
      <BarChart2 labels={labels} values={values} />
    </s.WeekNumberChart>
  )
}

export default WeekNumberChart
