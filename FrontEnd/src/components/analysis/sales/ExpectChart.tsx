import AreaChart from '@src/common/AreaChart'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const ExpectChart = () => {
  const labels = [
    '2023 1분기',
    '2023 2분기',
    '2023 3분기',
    '2023 4분기',
    '2024 1분기',
  ]
  const values = [1158613397, 1291339569, 1239312676, 1200000000, 1250000000]
  return (
    <s.ExpectChart>
      <s.ChartTitle>추정 매출액</s.ChartTitle>
      <s.ChartSubTitle>전분기 대비 매출액이 00% 상승했어요.</s.ChartSubTitle>
      <AreaChart labels={labels} values={values} />
    </s.ExpectChart>
  )
}

export default ExpectChart
