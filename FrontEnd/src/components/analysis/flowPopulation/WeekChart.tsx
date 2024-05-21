import analysisStore from '@src/stores/analysisStore'
import BarChart2 from '@src/common/BarChart2'
import * as c from '@src/components/styles/analysis/result/ChartCardStyle'

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
    <c.Container>
      <c.ChartTitle>요일별 유동인구</c.ChartTitle>
      <c.ChartSubTitle>
        <c.HighlightText>{maxLabel}요일</c.HighlightText> 유동인구가 가장
        높아요.
      </c.ChartSubTitle>
      <BarChart2
        labels={labels}
        values={values}
        datasetsLabel="유동인구(명)"
        minValue={minValue}
        pluginUnit="명"
        pluginValues={pluginValues}
      />
    </c.Container>
  )
}

export default WeekChart
