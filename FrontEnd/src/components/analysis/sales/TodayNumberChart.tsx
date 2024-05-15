import analysisStore from '@src/stores/analysisStore'
import HorizontalBarChart from '@src/common/HorizontalBarChart'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const TodayNumberChart = () => {
  const salesDataBody = analysisStore(state => state.salesDataBody)
  const dayCounts: number[] = Object.values(salesDataBody.daySalesCountInfo)

  const weekdaySum = dayCounts.slice(0, 5).reduce((acc, curr) => acc + curr, 0) // 주중(월화수목금) 합계
  const weekendSum = dayCounts.slice(5, 7).reduce((acc, curr) => acc + curr, 0) // 주말(토일) 합계

  // 주중/주말 비율 계산 전에 0인지 확인
  let chartSubTitle
  if (weekdaySum === 0 && weekendSum === 0) {
    chartSubTitle = '매출건수 정보가 없어요.'
  } else if (weekdaySum === 0) {
    chartSubTitle = (
      <>
        주말의 매출건수가 <s.HighlightText>100%</s.HighlightText> 이에요.
      </>
    )
  } else if (weekendSum === 0) {
    chartSubTitle = (
      <>
        주중의 매출건수가 <s.HighlightText>100%</s.HighlightText> 이에요.
      </>
    )
  } else {
    const weekdayMultiplier = (weekdaySum / weekendSum).toFixed(1)
    chartSubTitle =
      parseFloat(weekdayMultiplier) > 1 ? (
        <>
          주중의 매출건수는 주말보다 약{' '}
          <s.HighlightText>{weekdayMultiplier}배</s.HighlightText> 더 많아요.
        </>
      ) : (
        <>
          주말의 매출건수는 주중보다 약{' '}
          <s.HighlightText>
            {(1 / parseFloat(weekdayMultiplier)).toFixed(1)} 배
          </s.HighlightText>{' '}
          더 많아요.
        </>
      )
  }

  // 차트 props
  const labels = ['주중', '주말']
  const values = [weekdaySum, weekendSum]

  return (
    <s.TodayNumberChart>
      <s.ChartTitle>주중/주말 매출건수</s.ChartTitle>
      <s.ChartSubTitle>{chartSubTitle}</s.ChartSubTitle>
      <HorizontalBarChart
        labels={labels}
        values={values}
        datasetsLabel="매출건수"
        aspectRatio={4}
        xDisplay={false}
        pluginUnit="건"
      />
    </s.TodayNumberChart>
  )
}

export default TodayNumberChart
