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
  // 가장 낮은 값 찾기
  const minValue = Math.min(...values)

  // 전체 유동인구의 합 계산
  const totalValue: number = values.reduce((acc, curr) => acc + curr, 0)

  // 각 요일별 유동인구의 백분율
  const pluginValues: number[] = values.map(value =>
    parseFloat(((value / totalValue) * 100).toFixed(1)),
  )

  return (
    <f.WeekChart>
      <f.ChartTitle>요일별 유동인구</f.ChartTitle>
      <f.ChartSubTitle>
        <f.HighlightText>{maxLabel}요일</f.HighlightText>
        유동인구가 가장 높아요.
      </f.ChartSubTitle>
      <BarChart2
        labels={labels}
        values={values}
        datasetsLabel="유동인구(명)"
        minValue={minValue}
        pluginUnit="명"
        pluginValues={pluginValues}
      />
    </f.WeekChart>
  )
}

export default WeekChart
