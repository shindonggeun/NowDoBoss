import RadarChart from '@src/common/RadarChart'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const AgeChart = () => {
  const labels: string[] = ['10대', '20대', '30대', '40대', '50대', '60대 이상']
  const value1 = [12, 13, 15, 30, 10, 20]
  const value2 = [5, 20, 10, 15, 15, 35]

  return (
    <s.AgeChart>
      <s.ChartTitle>연령별 매출액</s.ChartTitle>
      <s.ChartSubTitle>60대 이상 남성 매출액이 가장 높아요.</s.ChartSubTitle>
      <RadarChart labels={labels} value1={value1} value2={value2} />
    </s.AgeChart>
  )
}

export default AgeChart
