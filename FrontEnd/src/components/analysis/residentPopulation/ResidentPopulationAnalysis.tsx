import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import AgeChart from '@src/components/analysis/residentPopulation/AgeChart'
import GenderChart from '@src/components/analysis/residentPopulation/GenderChart'
import * as r from '@src/components/styles/analysis/ResidentPopulationAnalysisStyle'

const ResidentPopulationAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="상주인구" />
      <r.FirstLowContainer>
        <GenderChart />
        <AgeChart />
      </r.FirstLowContainer>
    </>
  )
}

export default ResidentPopulationAnalysis
