import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import { SimulationReportType } from '@src/types/SimulationType'
import ReportStore from '@src/stores/reportStore'

const ReportKeyMoney = ({
  ReportData,
}: {
  ReportData: SimulationReportType
}) => {
  const { sigungu } = ReportStore()
  const Keymoney = ReportData.keyMoneyInfo

  return (
    <c.Container>
      <c.Title>참고 도움말</c.Title>
      <div>좋은 자리라면 권리금이 추가 발생할 수 있습니다.</div>
      <div>
        {sigungu}에서 권리금이 발생한 거래 비율은 {Keymoney.keyMoneyRatio}%
        입니다.
      </div>
      <div>
        권리금 수준 평균은 {Keymoney.keyMoney}만원이고, ㎡당 평균
        {Keymoney.keyMoneyLevel}만원 입니다.
      </div>
      <div>(선택) : 권리금이 무엇인가요?</div>
    </c.Container>
  )
}

export default ReportKeyMoney
