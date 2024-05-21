import { useEffect } from 'react'
import analysisStore from '@src/stores/analysisStore'
import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import BarChartCompare2 from '@src/common/BarChartCompare2'
import * as s from '@src/components/styles/analysis/result/SalesAnalysisStyle'

const ExpectChart = () => {
  const totalSalesDataBody = analysisStore(state => state.totalSalesDataBody)
  const setSalesSummary = useAnalysisSummaryStore(
    state => state.setSalesSummary,
  )
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

  const labels: string[] = ['자치구', '행정동', '상권']

  const values: number[] = [
    totalSalesDataBody.districtTotalSalesInfo.totalSales,
    totalSalesDataBody.administrationTotalSalesInfo.totalSales,
    totalSalesDataBody.commercialTotalSalesInfo.totalSales,
  ]

  const pluginValues: string[] = [
    formatSalesAmount(totalSalesDataBody.districtTotalSalesInfo.totalSales),
    formatSalesAmount(
      totalSalesDataBody.administrationTotalSalesInfo.totalSales,
    ),
    formatSalesAmount(totalSalesDataBody.commercialTotalSalesInfo.totalSales),
  ]

  // 상권 대비 자치구 매출액 비율 계산
  const commercialToDistrictPercentage = (
    (totalSalesDataBody.commercialTotalSalesInfo.totalSales /
      totalSalesDataBody.districtTotalSalesInfo.totalSales) *
    100
  ).toFixed(2)

  // 상권 대비 행정동 매출액 비율 계산
  const commercialToAdministrationPercentage = (
    (totalSalesDataBody.commercialTotalSalesInfo.totalSales /
      totalSalesDataBody.administrationTotalSalesInfo.totalSales) *
    100
  ).toFixed(2)

  // 요약 상태 업데이트
  useEffect(() => {
    setSalesSummary(
      'total',
      formatSalesAmount(totalSalesDataBody.commercialTotalSalesInfo.totalSales),
    )
  }, [totalSalesDataBody.commercialTotalSalesInfo.totalSales, setSalesSummary])

  return (
    <s.ExpectChart>
      <s.ChartTitle>추정 매출액</s.ChartTitle>
      <s.ChartSubTitle>
        선택 상권의 매출액은 해당 행정동 전체의{' '}
        <s.HighlightText>
          {commercialToAdministrationPercentage}%{' '}
        </s.HighlightText>
        이에요.
      </s.ChartSubTitle>
      <s.AddBox>
        해당 자치구 내의{'  '}
        <s.HighlightText>{commercialToDistrictPercentage}%</s.HighlightText>를
        차지합니다.
      </s.AddBox>
      <BarChartCompare2
        labels={labels}
        values={values}
        datasetsLabel="매출액(원)"
        pluginValues={pluginValues}
      />
    </s.ExpectChart>
  )
}

export default ExpectChart
