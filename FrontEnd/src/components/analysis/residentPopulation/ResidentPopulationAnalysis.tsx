import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import * as r from '@src/components/styles/analysis/ResidentPopulationAnalysisStyle'

const ResidentPopulationAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="상주인구" />
      <r.FirstLowContainer>
        <r.TotalChart>고민고민</r.TotalChart>
        <r.CategoryChart>고민고민</r.CategoryChart>
      </r.FirstLowContainer>
    </>
  )
}

export default ResidentPopulationAnalysis
