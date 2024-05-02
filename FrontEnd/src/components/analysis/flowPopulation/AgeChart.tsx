import RadarChart from '@src/common/RadarChart'
import * as f from '@src/components/styles/analysis/FlowPopulationAnalysisStyle'

const AgeChart = () => {
  return (
    <f.AgeChart>
      <f.ChartTitle>연령별 유동인구</f.ChartTitle>
      <f.ChartSubTitle>60대 이상 남성 유동인구가 가장 높아요.</f.ChartSubTitle>
      <RadarChart />
    </f.AgeChart>
  )
}

export default AgeChart
