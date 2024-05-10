import { forwardRef, Ref } from 'react'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TodayChart from '@src/components/analysis/flowPopulation/TodayChart'
import WeekChart from '@src/components/analysis/flowPopulation/WeekChart'
import AgeChart from '@src/components/analysis/flowPopulation/AgeChart'
import TimeChart from '@src/components/analysis/flowPopulation/TimeChart'
import * as f from '@src/components/styles/analysis/FlowPopulationAnalysisStyle'

const FlowPopulationAnalysis = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <CategoryTitleCard src="/images/flow_population.png" title="유동인구" />
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
})

FlowPopulationAnalysis.displayName = 'FlowPopulationAnalysis'
export default FlowPopulationAnalysis
