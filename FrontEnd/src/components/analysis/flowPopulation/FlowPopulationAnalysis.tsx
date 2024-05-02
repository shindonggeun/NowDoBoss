import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TodayChart from '@src/components/analysis/flowPopulation/TodayChart'
import WeekChart from '@src/components/analysis/flowPopulation/WeekChart'
import AgeChart from '@src/components/analysis/flowPopulation/AgeChart'
import TimeChart from '@src/components/analysis/flowPopulation/TimeChart'
import * as f from '@src/components/styles/analysis/FlowPopulationAnalysisStyle'

const FlowPopulationAnalysis = () => {
  return (
    <div>
      <CategoryTitleCard title="유동인구" />
      <f.FirstLowContainer>
        <TodayChart />
        <WeekChart />
      </f.FirstLowContainer>
      <f.SecondLowContainer>
        <AgeChart />
        <TimeChart />
      </f.SecondLowContainer>
    </div>
  )
}

export default FlowPopulationAnalysis
