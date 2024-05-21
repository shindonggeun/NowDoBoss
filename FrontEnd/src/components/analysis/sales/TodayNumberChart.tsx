import { useEffect } from 'react'
import analysisStore from '@src/stores/analysisStore'
import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import HorizontalBarChart from '@src/common/HorizontalBarChart'
import * as s from '@src/components/styles/analysis/result/SalesAnalysisStyle'

const TodayNumberChart = () => {
  const salesDataBody = analysisStore(state => state.salesDataBody)
  const setSalesSummary = useAnalysisSummaryStore(
    state => state.setSalesSummary,
  )
  const totalSales = analysisStore(
    state => state.totalSalesDataBody.commercialTotalSalesInfo.totalSales,
  )
  const dayCounts: number[] = Object.values(salesDataBody.daySalesCountInfo)

  const weekdaySum = dayCounts.slice(0, 5).reduce((acc, curr) => acc + curr, 0) // 주중(월화수목금) 합계
  const weekendSum = dayCounts.slice(5, 7).reduce((acc, curr) => acc + curr, 0) // 주말(토일) 합계
  const totalSum = weekdaySum + weekendSum // 전체 합계

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

  const formatSalesAmount = (amount: number) => {
    // 만원 미만일 경우 원 단위로 표시
    if (amount < 10000) {
      return `${amount}원`
    }

    const tenThousands = amount / 10000
    // 조 단위가 필요한지 확인
    if (tenThousands >= 100000000) {
      // 조 단위, 억 단위, 만 단위로 나누어 표현
      const trillions = Math.floor(tenThousands / 100000000)
      const remainBillions = tenThousands % 100000000
      const billions = Math.floor(remainBillions / 10000)
      const remainTenThousands = Math.floor(remainBillions % 10000)
      // 억 단위와 만 단위가 0이면 조 단위만 표시
      if (billions === 0 && remainTenThousands === 0) {
        return `${trillions}조원`
      }
      if (remainTenThousands === 0) {
        // 만 단위가 0이면 조 단위와 억 단위만 표시
        return `${trillions}조 ${billions}억원`
      }
      return `${trillions}조 ${billions}억 ${remainTenThousands}만원`
    }
    if (tenThousands >= 10000) {
      // 억 단위와 만 단위로 나누어 표현
      const billions = Math.floor(tenThousands / 10000)
      const remainTenThousands = Math.floor(tenThousands % 10000)
      // 만 단위가 0이면 억 단위만 표시
      if (remainTenThousands === 0) {
        return `${billions}억원`
      }
      return `${billions}억 ${remainTenThousands}만원`
    }
    // 만 단위만으로 표현
    return `${Math.floor(tenThousands)}만원`
  }

  // 차트 props
  const labels = ['주중', '주말']
  const values = [weekdaySum, weekendSum]

  // 요약 상태 업데이트
  useEffect(() => {
    setSalesSummary('count', `${totalSum.toLocaleString()}건`)
    setSalesSummary(
      'average',
      `${formatSalesAmount(Math.round(totalSales / totalSum))}`,
    )
  }, [weekdaySum, weekendSum, totalSum, totalSales, setSalesSummary])

  const backgroundColor = ['rgba(75,192,192,0.2)', 'rgba(255, 159, 64, 0.2)']

  const borderColor = ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)']

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
        backgroundColor={backgroundColor}
        borderColor={borderColor}
      />
    </s.TodayNumberChart>
  )
}

export default TodayNumberChart
