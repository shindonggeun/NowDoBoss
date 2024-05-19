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

  const backgroundColor = [
    'rgba(33, 150, 243, 0.2)', // 파란색
    'rgba(156, 39, 176, 0.2)', // 보라색
    'rgba(0, 150, 136, 0.2)', // 틸색
    'rgba(205, 220, 57, 0.2)', // 라임색
    'rgba(255, 193, 7, 0.2)', // 앰버색
    'rgba(255, 87, 34, 0.2)', // 오렌지색
    'rgba(121, 85, 72, 0.2)', // 브라운색
    'rgba(96, 125, 139, 0.2)', // 블루 그레이
    'rgba(233, 30, 99, 0.2)', // 핑크색
  ]

  const borderColor = [
    'rgba(33, 150, 243, 1)', // 파란색
    'rgba(156, 39, 176, 1)', // 보라색
    'rgba(0, 150, 136, 1)', // 틸색
    'rgba(205, 220, 57, 1)', // 라임색
    'rgba(255, 193, 7, 1)', // 앰버색
    'rgba(255, 87, 34, 1)', // 오렌지색
    'rgba(121, 85, 72, 1)', // 브라운색
    'rgba(96, 125, 139, 1)', // 블루 그레이
    'rgba(233, 30, 99, 1)', // 핑크색
  ]

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
        backgroundColor={backgroundColor}
        borderColor={borderColor}
      />
    </e.CategoryCard>
  )
}

export default CategoryCard
