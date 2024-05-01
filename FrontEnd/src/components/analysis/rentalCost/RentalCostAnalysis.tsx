import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TotalChart from '@src/components/analysis/rentalCost/TotalChart'
import CategoryChart from '@src/components/analysis/rentalCost/CategoryChart'
import * as r from '@src/components/styles/analysis/RentalCostAnalysisStyle'

const RentalCostAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="임대료" />
      <r.FirstLowContainer>
        <TotalChart />
        <CategoryChart />
      </r.FirstLowContainer>
    </>
  )
}

export default RentalCostAnalysis
