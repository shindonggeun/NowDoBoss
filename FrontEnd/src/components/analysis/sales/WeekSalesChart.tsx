import analysisStore from '@src/stores/analysisStore'
import { SalesErrPropsType } from '@src/types/AnalysisType'
import BarChart2 from '@src/common/BarChart2'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const WeekSalesChart = (props: SalesErrPropsType) => {
  const { salesErr } = props
  const salesDataBody = analysisStore(state => state.salesDataBody)

  const labels: string[] = ['월', '화', '수', '목', '금', '토', '일']
  const values: number[] = Object.values(salesDataBody.daySalesInfo)

  // 가장 높은 값 찾기
  const maxValue: number = Math.max(...values)
  // 해당 인덱스를 사용하여 라벨 찾기
  const maxLabel: string = labels[values.indexOf(maxValue)]
  // 가장 낮은 값 찾기
  const minValue = Math.min(...values)

  return (
    <s.WeekSalesChart>
      <s.ChartTitle>요일별 매출액</s.ChartTitle>
      {salesErr ? (
        <div>{salesErr}</div>
      ) : (
        <>
          <s.ChartSubTitle>
            {maxLabel}요일 매출액이 가장 높아요.
          </s.ChartSubTitle>
          <BarChart2
            labels={labels}
            values={values}
            minValue={minValue}
            datasetsLabel="매출액(원)"
            pluginUnit="원"
          />
        </>
      )}
    </s.WeekSalesChart>
  )
}

export default WeekSalesChart
