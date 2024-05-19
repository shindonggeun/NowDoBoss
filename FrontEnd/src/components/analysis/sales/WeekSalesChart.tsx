import { useEffect } from 'react'
import analysisStore from '@src/stores/analysisStore'
import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import BarChart2 from '@src/common/BarChart2'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const WeekSalesChart = () => {
  const salesDataBody = analysisStore(state => state.salesDataBody)
  const setSalesSummary = useAnalysisSummaryStore(
    state => state.setSalesSummary,
  )

  const labels: string[] = ['월', '화', '수', '목', '금', '토', '일']
  const values: number[] = Object.values(salesDataBody.daySalesInfo)

  // 가장 높은 값 찾기
  const maxValue: number = Math.max(...values)
  // 해당 인덱스를 사용하여 라벨 찾기
  const maxLabel: string = labels[values.indexOf(maxValue)]
  // 가장 낮은 값 찾기
  const minValue = Math.min(...values)
  // values 배열의 총합 구하기
  const totalSum: number = values.reduce((acc, current) => acc + current, 0)
  // 백분율로 나타낸 배열 생성
  const percentageValues = values.map(value =>
    Math.round((value / totalSum) * 100),
  )

  // 요약 상태 업데이트
  useEffect(() => {
    setSalesSummary('week', `${maxLabel}요일`)
  }, [maxLabel, setSalesSummary])

  return (
    <s.WeekSalesChart>
      <s.ChartTitle>요일별 매출액</s.ChartTitle>
      <s.ChartSubTitle>
        <s.HighlightText>{maxLabel}요일</s.HighlightText> 매출액이 가장 높아요.
      </s.ChartSubTitle>
      <BarChart2
        labels={labels}
        values={values}
        minValue={minValue}
        datasetsLabel="매출액(원)"
        pluginUnit="원"
        pluginValues={percentageValues}
      />
    </s.WeekSalesChart>
  )
}

export default WeekSalesChart
