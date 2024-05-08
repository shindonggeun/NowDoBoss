import { forwardRef, Ref } from 'react'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import AgeChart from '@src/components/analysis/residentPopulation/AgeChart'
import GenderChart from '@src/components/analysis/residentPopulation/GenderChart'
import * as r from '@src/components/styles/analysis/ResidentPopulationAnalysisStyle'

const ResidentPopulationAnalysis = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <CategoryTitleCard
        src="src/assets/resident_population.png"
        title="상주인구"
      />
      <r.FirstLowContainer>
        <GenderChart />
        <AgeChart />
      </r.FirstLowContainer>
    </div>
  )
})

ResidentPopulationAnalysis.displayName = 'ResidentPopulationAnalysis' // eslint 에 위반되는 조건 해결
export default ResidentPopulationAnalysis
