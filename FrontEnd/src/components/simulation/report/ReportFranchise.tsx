import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import { SimulationReportType } from '@src/types/SimulationType'

const ReportFranchise = ({
  ReportData,
}: {
  ReportData: SimulationReportType
}) => {
  return (
    <c.Container>
      <div>현재 창업비용과 가장 유사한 5개 프렌차이즈 정보</div>
      <div>------------------------------------</div>
      {ReportData.franchisees.map(franchise => (
        <div key={franchise.brandName}>
          <div>브랜드 이름 : {franchise.brandName}</div>
          <div>총 비용 : {franchise.totalPrice}</div>
          <div>가맹 보증금 : {franchise.deposit}</div>
          <div>교육비 : {franchise.education}</div>
          <div>가입비 : {franchise.subscription}</div>
          <div>인테리어 비용 : {franchise.interior}</div>
          <div>기타 비용 : {franchise.etc} - ??</div>
          <div>------------------------------------</div>
        </div>
      ))}
    </c.Container>
  )
}

export default ReportFranchise
