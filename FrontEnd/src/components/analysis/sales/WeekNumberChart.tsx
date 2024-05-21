import analysisStore from '@src/stores/analysisStore'
import BarChart2 from '@src/common/BarChart2'
import * as s from '@src/components/styles/analysis/result/SalesAnalysisStyle'

const WeekNumberChart = () => {
  const salesDataBody = analysisStore(state => state.salesDataBody)

  const labels: string[] = ['월', '화', '수', '목', '금', '토', '일']
  const values: number[] = Object.values(salesDataBody.daySalesCountInfo)

  // 가장 높은 값 찾기
  const maxValue: number = Math.max(...values)
  // 해당 인덱스를 사용하여 라벨 찾기
  const maxLabel: string = labels[values.indexOf(maxValue)]
  // 가장 낮은 값 찾기
  const minValue = Math.min(...values)

  return (
    <s.WeekNumberChart>
      <s.ChartTitle>요일별 매출건수</s.ChartTitle>
      <s.ChartSubTitle>
        <s.HighlightText>{maxLabel}요일</s.HighlightText> 매출건수가 가장
        높아요.
      </s.ChartSubTitle>
      <BarChart2
        labels={labels}
        values={values}
        minValue={minValue}
        datasetsLabel="매출건수(건)"
        pluginUnit="건"
      />
    </s.WeekNumberChart>
  )
}

export default WeekNumberChart
