import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TimeChart from '@src/components/analysis/flowPopulation/TimeChart'
import * as f from '@src/components/styles/analysis/FlowPopulationAnalysisStyle'

const FlowPopulationAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="유동인구" />
      <f.FirstLowContainer>
        <f.TodayChart>일일 평균 유동인구 차트 카드</f.TodayChart>
        <f.WeekChart>요일별 유동인구 차트 카드</f.WeekChart>
      </f.FirstLowContainer>
      <f.SecondLowContainer>
        <f.AgeChart>연령별 유동인구 차트 카드</f.AgeChart>
        <f.TimeChart>
          <TimeChart />
        </f.TimeChart>
      </f.SecondLowContainer>
    </>
  )
}

export default FlowPopulationAnalysis
