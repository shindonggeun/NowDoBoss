import analysisStore from '@src/stores/analysisStore'
import BarChartCompare2 from '@src/common/BarChartCompare2'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const ExpectChart = () => {
  const totalSalesDataBody = analysisStore(state => state.totalSalesDataBody)

  const labels: string[] = [
    totalSalesDataBody.districtTotalSalesInfo.districtCodeName,
    totalSalesDataBody.administrationTotalSalesInfo.administrationCodeName,
    totalSalesDataBody.commercialTotalSalesInfo.commercialCodeName,
  ]

  const values: number[] = [
    totalSalesDataBody.districtTotalSalesInfo.totalSales,
    totalSalesDataBody.administrationTotalSalesInfo.totalSales,
    totalSalesDataBody.commercialTotalSalesInfo.totalSales,
  ]
  const minvalue = Math.min(...values)

  return (
    <s.ExpectChart>
      <s.ChartTitle>추정 매출액</s.ChartTitle>
      <s.ChartSubTitle>
        선택 상권의 추정매출액은 행정동 전체의 00% 이에요.
      </s.ChartSubTitle>
      <s.AddBox>자치구의 몇 %입니다.</s.AddBox>
      <BarChartCompare2
        labels={labels}
        values={values}
        datasetsLabel="원"
        minvalue={minvalue}
        pluginUnit="원"
      />
    </s.ExpectChart>
  )
}

export default ExpectChart
