import analysisStore from '@src/stores/analysisStore'
import BarChartCompare2 from '@src/common/BarChartCompare2'
import * as e from '@src/components/styles/analysis/result/ExpenditureAnalysisStyle'

const TotalCard = () => {
  const totalExpenditureDataBody = analysisStore(
    state => state.totalExpenditureDataBody,
  )
  const {
    districtTotalIncomeInfo,
    administrationTotalIncomeInfo,
    commercialTotalIncomeInfo,
  } = totalExpenditureDataBody

  const formatSalesAmount = (amount: number) => {
    // 만원 미만일 경우 원 단위로 표시
    if (amount < 10000) {
      return `${amount}원`
    }

    const tenThousands = amount / 10000
    // 조 단위가 필요한지 확인
    if (tenThousands >= 100000000) {
      // 조 단위, 억 단위, 만 단위로 나누어 표현
      const trillions = Math.floor(tenThousands / 100000000)
      const remainBillions = tenThousands % 100000000
      const billions = Math.floor(remainBillions / 10000)
      const remainTenThousands = Math.floor(remainBillions % 10000)
      // 억 단위와 만 단위가 0이면 조 단위만 표시
      if (billions === 0 && remainTenThousands === 0) {
        return `${trillions}조원`
      }
      if (remainTenThousands === 0) {
        // 만 단위가 0이면 조 단위와 억 단위만 표시
        return `${trillions}조 ${billions}억원`
      }
      return `${trillions}조 ${billions}억 ${remainTenThousands}만원`
    }
    if (tenThousands >= 10000) {
      // 억 단위와 만 단위로 나누어 표현
      const billions = Math.floor(tenThousands / 10000)
      const remainTenThousands = Math.floor(tenThousands % 10000)
      // 만 단위가 0이면 억 단위만 표시
      if (remainTenThousands === 0) {
        return `${billions}억원`
      }
      return `${billions}억 ${remainTenThousands}만원`
    }
    // 만 단위만으로 표현
    return `${Math.floor(tenThousands)}만원`
  }

  const labels: string[] = ['자치구', '행정동', '상권']

  const values = [
    districtTotalIncomeInfo.totalPrice,
    administrationTotalIncomeInfo.totalPrice,
    commercialTotalIncomeInfo.totalPrice,
  ]

  const pluginValues: string[] = [
    formatSalesAmount(districtTotalIncomeInfo.totalPrice),
    formatSalesAmount(administrationTotalIncomeInfo.totalPrice),
    formatSalesAmount(commercialTotalIncomeInfo.totalPrice),
  ]

  // 상권 대비 자치구 매출액 비율 계산
  const commercialToDistrictPercentage = (
    (commercialTotalIncomeInfo.totalPrice /
      districtTotalIncomeInfo.totalPrice) *
    100
  ).toFixed(2)

  // 상권 대비 행정동 매출액 비율 계산
  const commercialToAdministrationPercentage = (
    (commercialTotalIncomeInfo.totalPrice /
      administrationTotalIncomeInfo.totalPrice) *
    100
  ).toFixed(2)

  return (
    <e.TotalCard>
      <e.ChartTitle>총 지출금액</e.ChartTitle>
      <e.ChartSubTitle>
        선택 상권의 매출액은 해당 행정동 전체의{' '}
        <e.HighlightText>
          {commercialToAdministrationPercentage}%{' '}
        </e.HighlightText>
        이에요.
      </e.ChartSubTitle>
      <e.AddBox>
        해당 자치구 내의{'  '}
        <e.HighlightText>{commercialToDistrictPercentage}%</e.HighlightText>를
        차지합니다.
      </e.AddBox>
      <BarChartCompare2
        labels={labels}
        values={values}
        datasetsLabel="지출금액(원)"
        pluginValues={pluginValues}
      />
    </e.TotalCard>
  )
}

export default TotalCard
