import HorizontalBarChart from '@src/common/HorizontalBarChart'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'

const CategoryCard = () => {
  return (
    <e.CategoryCard>
      <e.ChartTitle>유형별 지출금액</e.ChartTitle>
      <e.ChartSubTitle>식료품 관련 지출금액이 가장 높아요.</e.ChartSubTitle>
      <HorizontalBarChart />
    </e.CategoryCard>
  )
}

export default CategoryCard
