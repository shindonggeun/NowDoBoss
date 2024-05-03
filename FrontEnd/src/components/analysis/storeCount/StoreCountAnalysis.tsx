import { forwardRef, Ref } from 'react'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TotalChart from '@src/components/analysis/storeCount/TotalChart'
import FranchiseChart from '@src/components/analysis/storeCount/FranchiseChart'
import OpenChart from '@src/components/analysis/storeCount/OpenChart'
import CloseChart from '@src/components/analysis/storeCount/CloseChart'
import * as s from '@src/components/styles/analysis/StoreCountAnalysisStyle'

const StoreCountAnalysis = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <CategoryTitleCard title="점포 수" />
      <s.FirstLowContainer>
        <TotalChart />
        <s.FirstRightWrap>
          <FranchiseChart />
          <s.StatusWrap>
            <OpenChart />
            <CloseChart />
          </s.StatusWrap>
        </s.FirstRightWrap>
      </s.FirstLowContainer>
    </div>
  )
})

StoreCountAnalysis.displayName = 'StoreCountAnalysis'
export default StoreCountAnalysis
