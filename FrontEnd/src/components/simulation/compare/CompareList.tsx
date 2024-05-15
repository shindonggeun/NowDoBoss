import * as c from '@src/components/styles/simulation/CompareModalStyle.tsx'
import { SimulationReportType } from '@src/types/SimulationType.tsx'

const CompareList = ({ ReportData }: { ReportData: SimulationReportType }) => {
  return (
    <div>
      <c.BodyContainerText>
        {ReportData.totalPrice.toLocaleString()} 만원
      </c.BodyContainerText>
      <c.BodyContainerText>
        {ReportData.detail.rentPrice.toLocaleString()} 만원
      </c.BodyContainerText>
      <c.BodyContainerText>
        {ReportData.detail.deposit.toLocaleString()} 만원
      </c.BodyContainerText>
      <c.BodyContainerText>
        {ReportData.detail.interior.toLocaleString()} 만원
      </c.BodyContainerText>
      <c.BodyContainerText>
        {ReportData.detail.levy !== null
          ? `${ReportData.detail.levy.toLocaleString()} 만원`
          : '없음'}
      </c.BodyContainerText>
      <c.BodyContainerText>
        {ReportData.keyMoneyInfo.keyMoney.toLocaleString()} 만원
      </c.BodyContainerText>
    </div>
  )
}

export default CompareList
