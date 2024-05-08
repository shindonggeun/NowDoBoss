import { forwardRef, Ref } from 'react'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TotalChart from '@src/components/analysis/rentalCost/TotalChart'
import CategoryChart from '@src/components/analysis/rentalCost/CategoryChart'
import * as r from '@src/components/styles/analysis/RentalCostAnalysisStyle'

const RentalCostAnalysis = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <CategoryTitleCard src="src/assets/rental_cost.png" title="임대료" />
      <r.FirstLowContainer>
        <TotalChart />
        <CategoryChart />
      </r.FirstLowContainer>
    </div>
  )
})

RentalCostAnalysis.displayName = 'RentalCostAnalysis'
export default RentalCostAnalysis
