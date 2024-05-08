import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TotalCard from '@src/components/analysis/expenditure/TotalCard'
import CategoryCard from '@src/components/analysis/expenditure/CategoryCard'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'
import { forwardRef, Ref } from 'react'

const ExpenditureAnalysis = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <CategoryTitleCard src="src/assets/expenditure.png" title="지출내역" />
      <e.FirstLowContainer>
        <TotalCard />
        <CategoryCard />
      </e.FirstLowContainer>
    </div>
  )
})

ExpenditureAnalysis.displayName = 'ExpenditureAnalysis'
export default ExpenditureAnalysis
