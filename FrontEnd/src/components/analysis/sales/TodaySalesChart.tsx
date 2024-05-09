import analysisStore from '@src/stores/analysisStore'
import HorizontalBarChart from '@src/common/HorizontalBarChart'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const TodaySalesChart = () => {
  const salesDataBody = analysisStore(state => state.salesDataBody)
  const daySales: number[] = Object.values(salesDataBody.daySalesInfo)

  const weekdaySum = daySales.slice(0, 5).reduce((acc, curr) => acc + curr, 0) // 주중(월화수목금) 합계
  const weekendSum = daySales.slice(5, 7).reduce((acc, curr) => acc + curr, 0) // 주말(토일) 합계
  // const totalSum = weekdaySum + weekendSum // 총 합계
  const weekdayMultiplier = (weekdaySum / weekendSum).toFixed(1) // 주중/주말 비율

  // // 백분율로 변환
  // const weekdayPercentage = Math.round((weekdaySum / totalSum) * 100)
  // const weekendPercentage = 1 - weekdayPercentage

  // 차트 props
  const labels = ['주중', '주말']
  const values = [weekdaySum, weekendSum]

  return (
    <s.TodaySalesChart>
      <s.ChartTitle>주중/주말 매출액</s.ChartTitle>
      <s.ChartSubTitle>
        {parseFloat(weekdayMultiplier) > 1
          ? `주중의 매출액이 주말보다 약 ${weekdayMultiplier}배 더 많아요.`
          : `주말의 매출액이 주중보다 약 ${(1 / parseFloat(weekdayMultiplier)).toFixed(1)}배 더 많아요.`}
      </s.ChartSubTitle>
      <HorizontalBarChart
        labels={labels}
        values={values}
        datasetsLabel="매출액"
        aspectRatio={4}
        xDisplay={false}
      />
    </s.TodaySalesChart>
  )
}

export default TodaySalesChart
