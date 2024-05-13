import analysisStore from '@src/stores/analysisStore'
import { TotalExpenditureErrPropsType } from '@src/types/AnalysisType'
import BarChartCompare2 from '@src/common/BarChartCompare2'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'

const TotalCard = (props: TotalExpenditureErrPropsType) => {
  const { totalExpenditureErr } = props
  const totalExpenditureDataBody = analysisStore(
    state => state.totalExpenditureDataBody,
  )
  const {
    districtTotalIncomeInfo,
    administrationTotalIncomeInfo,
    commercialTotalIncomeInfo,
  } = totalExpenditureDataBody

  const labels: string[] = [
    districtTotalIncomeInfo.districtCodeName,
    administrationTotalIncomeInfo.administrationCodeName,
    commercialTotalIncomeInfo.commercialCodeName,
  ]

  const values = [
    districtTotalIncomeInfo.totalPrice,
    administrationTotalIncomeInfo.totalPrice,
    commercialTotalIncomeInfo.totalPrice,
  ]

  const minValue = Math.min(...values)

  return (
    <e.TotalCard>
      <e.ChartTitle>총 지출금액</e.ChartTitle>
      {totalExpenditureErr ? (
        <div>{totalExpenditureErr}</div>
      ) : (
        <>
          <e.ChartSubTitle>자치구의 몇 %입니다.</e.ChartSubTitle>
          <e.AddBox>행정동의 몇 %입니다.</e.AddBox>
          <BarChartCompare2
            labels={labels}
            values={values}
            datasetsLabel="지출금액(원)"
            minvalue={minValue}
            pluginUnit="원"
          />
        </>
      )}
    </e.TotalCard>
  )
}

export default TotalCard
