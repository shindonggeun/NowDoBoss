import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import * as s from '@src/components/styles/analysis/StoreCountAnalysisStyle'

const StoreCountAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="점포 수" />
      <s.FirstLowContainer>
        <s.TotalChart>선택 상권 총 점포 수</s.TotalChart>
        <s.FirstRightWrap>
          <s.FranchiseChart>프랜차이즈 점포 수</s.FranchiseChart>
          <s.StatusWrap>
            <s.OpenChart>개업률</s.OpenChart>
            <s.CloseChart>폐업률</s.CloseChart>
          </s.StatusWrap>
        </s.FirstRightWrap>
      </s.FirstLowContainer>
    </>
  )
}

export default StoreCountAnalysis
