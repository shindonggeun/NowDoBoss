import analysisStore from '@src/stores/analysisStore'
import HorizontalBarChart from '@src/common/HorizontalBarChart'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const TodaySalesChart = () => {
  const salesDataBody = analysisStore(state => state.salesDataBody)
  const daySales: number[] = Object.values(salesDataBody.daySalesInfo)

  const weekdaySum = daySales.slice(0, 5).reduce((acc, curr) => acc + curr, 0) // 주중(월화수목금) 합계
  const weekendSum = daySales.slice(5, 7).reduce((acc, curr) => acc + curr, 0) // 주말(토일) 합계
  const totalSum = weekdaySum + weekendSum // 총 합계

  // 백분율로 변환
  const weekdayPercentage = Math.round((weekdaySum / totalSum) * 100)
  const weekendPercentage = 100 - weekdayPercentage

  // 주중/주말 비율 계산 전에 0인지 확인
  let chartSubTitle
  if (weekdaySum === 0 && weekendSum === 0) {
    chartSubTitle = '매출액 정보가 없어요.'
  } else if (weekdaySum === 0) {
    chartSubTitle = (
      <>
        주말의 매출액이 <s.HighlightText>100%</s.HighlightText> 이에요.
      </>
    )
  } else if (weekendSum === 0) {
    chartSubTitle = (
      <>
        주중의 매출액이 <s.HighlightText>100%</s.HighlightText> 이에요.
      </>
    )
  } else {
    const weekdayMultiplier = (weekdaySum / weekendSum).toFixed(1)
    chartSubTitle =
      parseFloat(weekdayMultiplier) > 1 ? (
        <>
          주중의 매출액은 주말보다 약{' '}
          <s.HighlightText>{weekdayMultiplier}배</s.HighlightText> 더 많아요.
        </>
      ) : (
        <>
          주말의 매출액은 주중보다 약{' '}
          <s.HighlightText>
            {(1 / parseFloat(weekdayMultiplier)).toFixed(1)}배
          </s.HighlightText>{' '}
          더 많아요.
        </>
      )
  }

  // 차트 props
  const labels = ['주중', '주말']
  const values = [weekdaySum, weekendSum]
  const percentageValues = [weekdayPercentage, weekendPercentage]

  return (
    <s.TodaySalesChart>
      <s.ChartTitle>주중/주말 매출액</s.ChartTitle>
      <s.ChartSubTitle>{chartSubTitle}</s.ChartSubTitle>
      <HorizontalBarChart
        labels={labels}
        values={values}
        datasetsLabel="매출액"
        aspectRatio={4}
        xDisplay={false}
        pluginUnit=""
        pluginValues={percentageValues}
      />
    </s.TodaySalesChart>
  )
}

export default TodaySalesChart
