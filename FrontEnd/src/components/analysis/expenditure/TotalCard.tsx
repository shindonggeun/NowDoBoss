import AreaChart from '@src/common/AreaChart'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'

const TotalCard = () => {
  const labels = [
    '2023 1분기',
    '2023 2분기',
    '2023 3분기',
    '2023 4분기',
    '2024 1분기',
  ]
  const values = [1158613397, 1291339569, 1239312676, 1200000000, 1250000000]

  return (
    <e.TotalCard>
      <e.ChartTitle>총 지출금액</e.ChartTitle>
      <e.ChartSubTitle>작년 동분기에 비해 어찌구</e.ChartSubTitle>
      <AreaChart labels={labels} values={values} />
    </e.TotalCard>
  )
}

export default TotalCard
