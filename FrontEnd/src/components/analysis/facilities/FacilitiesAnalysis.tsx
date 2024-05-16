import { forwardRef, Ref, useState } from 'react'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TransChart from '@src/components/analysis/facilities/TransChart'
import EduChart from '@src/components/analysis/facilities/EduChart'
import * as f from '@src/components/styles/analysis/FacilitiesAnalysisStyle'

const FacilitiesAnalysis = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  const [periodCode, setPeriodCode] = useState('20233') // 분기 코드

  return (
    <div ref={ref}>
      <CategoryTitleCard
        src="/images/facilities.png"
        title="집객시설"
        setPeriodCode={setPeriodCode}
      />
      <f.FirstLowContainer>
        <TransChart />
        <EduChart />
      </f.FirstLowContainer>
      <div>{periodCode}</div>
    </div>
  )
})

FacilitiesAnalysis.displayName = 'FacilitiesAnalysis'
export default FacilitiesAnalysis
