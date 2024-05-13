import analysisStore from '@src/stores/analysisStore'
import { ExpenditureErrPropsType } from '@src/types/AnalysisType'
import HorizontalBarChart from '@src/common/HorizontalBarChart'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'

const CategoryCard = (props: ExpenditureErrPropsType) => {
  const { expenditureErr } = props
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

  return (
    <e.CategoryCard>
      <e.ChartTitle>유형별 지출금액</e.ChartTitle>
      {expenditureErr ? (
        <div>{expenditureErr}</div>
      ) : (
        <>
          <e.ChartSubTitle>
            {maxLabel} 관련 지출금액이 가장 높아요.
          </e.ChartSubTitle>
          <HorizontalBarChart
            labels={labels}
            values={values}
            datasetsLabel="유형별 지출금액"
            aspectRatio={1.5}
            xDisplay={false}
          />
        </>
      )}
    </e.CategoryCard>
  )
}

export default CategoryCard
