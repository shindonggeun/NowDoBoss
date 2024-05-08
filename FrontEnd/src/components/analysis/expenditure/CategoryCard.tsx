import HorizontalBarChart from '@src/common/HorizontalBarChart'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'

const CategoryCard = () => {
  // 차트 props
  const labels = [
    '식료품',
    '의류',
    '생활용품',
    '의료비',
    '교통',
    '여가',
    '문화',
    '교육',
    '유흥',
  ]
  const values = [12, 23, 500, 30, 101, 69, 90, 350, 200]

  return (
    <e.CategoryCard>
      <e.ChartTitle>유형별 지출금액</e.ChartTitle>
      <e.ChartSubTitle>식료품 관련 지출금액이 가장 높아요.</e.ChartSubTitle>
      <HorizontalBarChart
        labels={labels}
        values={values}
        datasetsLabel="유형별 지출금액"
        aspectRatio={2}
        xDisplay
      />
    </e.CategoryCard>
  )
}

export default CategoryCard
