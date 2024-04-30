import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import * as r from '@src/components/styles/analysis/RentalCostAnalysisStyle'

const RentalCostAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="임대료" />
      <r.FirstLowContainer>
        <r.TotalChart>고민고민</r.TotalChart>
        <r.CategoryChart>고민고민</r.CategoryChart>
      </r.FirstLowContainer>
    </>
  )
}

export default RentalCostAnalysis
