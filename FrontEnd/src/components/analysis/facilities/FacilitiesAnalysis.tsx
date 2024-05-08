import { forwardRef, Ref } from 'react'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TransChart from '@src/components/analysis/facilities/TransChart'
import EduChart from '@src/components/analysis/facilities/EduChart'
import * as f from '@src/components/styles/analysis/FacilitiesAnalysisStyle'

const FacilitiesAnalysis = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <CategoryTitleCard src="src/assets/facilities.png" title="집객시설" />
      <f.FirstLowContainer>
        <TransChart />
        <EduChart />
      </f.FirstLowContainer>
    </div>
  )
})

FacilitiesAnalysis.displayName = 'FacilitiesAnalysis'
export default FacilitiesAnalysis
