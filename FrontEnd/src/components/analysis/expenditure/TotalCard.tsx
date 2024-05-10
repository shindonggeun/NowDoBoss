import AreaChart from '@src/common/AreaChart'
import analysisStore from '@src/stores/analysisStore'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'

const TotalCard = () => {
  const expenditureDataBody = analysisStore(state => state.expenditureDataBody)
  const { annualQuarterIncomeInfos } = expenditureDataBody

  const periodCodes = annualQuarterIncomeInfos.map(info => info.periodCode)
  const values = annualQuarterIncomeInfos.map(info => info.totalPrice)

  const labels = periodCodes.map(code => {
    // 연도와 분기를 추출
    const year = code.substring(0, 4)
    const quarter = code.substring(4)

    // '2023-1' 형식의 문자열로 변환
    return `${year}-${quarter}`
  })

  return (
    <e.TotalCard>
      <e.ChartTitle>총 지출금액</e.ChartTitle>
      <e.ChartSubTitle>전분기 대비 지출금액이 00% 상승했어요.</e.ChartSubTitle>
      <e.AddBox>전년 동분기 대비 지출금액은 00% 하락했어요.</e.AddBox>
      <AreaChart labels={labels} values={values} />
    </e.TotalCard>
  )
}

export default TotalCard
