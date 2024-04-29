import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'

const ExpenditureAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="지출내역" />
      <e.FirstLowContainer>
        <e.TotalChart>총 지출 금액</e.TotalChart>
        <e.CategoryChart>유형별 지출내역</e.CategoryChart>
      </e.FirstLowContainer>
    </>
  )
}

export default ExpenditureAnalysis
