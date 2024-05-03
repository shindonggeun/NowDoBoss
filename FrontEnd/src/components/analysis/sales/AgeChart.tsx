import RadarChart from '@src/common/RadarChart'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const AgeChart = () => {
  return (
    <s.AgeChart>
      <s.ChartTitle>연령별 매출액</s.ChartTitle>
      <s.ChartSubTitle>60대 이상 남성 매출액이 가장 높아요.</s.ChartSubTitle>
      <RadarChart />
    </s.AgeChart>
  )
}

export default AgeChart
