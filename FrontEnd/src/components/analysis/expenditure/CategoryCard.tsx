import analysisStore from '@src/stores/analysisStore'
import HorizontalBarChart from '@src/common/HorizontalBarChart'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'

const CategoryCard = () => {
  const expenditureDataBody = analysisStore(state => state.expenditureDataBody)
  const { typeIncomeInfo } = expenditureDataBody

  // 차트 props
  const labels = [
    '식료품',
    '의류',
    '의료비',
    '생활용품',
    '교통',
    '여가',
    '문화',
    '교육',
    '유흥',
  ]

  const values = Object.values(typeIncomeInfo)

  // 가장 높은 값 찾기
  const maxValue: number = Math.max(...values)
  // 해당 인덱스를 사용하여 라벨 찾기
  const maxLabel: string = labels[values.indexOf(maxValue)]
  // values 배열의 총합 구하기
  const totalSum: number = values.reduce((acc, current) => acc + current, 0)
  // 백분율로 나타낸 배열 생성
  const percentageValues = values.map(value =>
    Math.round((value / totalSum) * 100),
  )

  return (
    <e.CategoryCard>
      <e.ChartTitle>유형별 지출금액</e.ChartTitle>
      <e.ChartSubTitle>
        <e.HighlightText>{maxLabel}</e.HighlightText> 관련 지출금액이 가장
        높아요.
      </e.ChartSubTitle>
      <HorizontalBarChart
        labels={labels}
        values={values}
        datasetsLabel="유형별 지출금액"
        aspectRatio={1.5}
        xDisplay={false}
        pluginUnit=""
        pluginValues={percentageValues}
      />
    </e.CategoryCard>
  )
}

export default CategoryCard
