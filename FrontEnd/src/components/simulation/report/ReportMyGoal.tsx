import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import ThumbUp from '@src/assets/thumbUp.svg'
import { SimulationReportType } from '@src/types/SimulationType'

const ReportMyGoal = ({ ReportData }: { ReportData: SimulationReportType }) => {
  const GoalPrice = Math.floor(
    ReportData.detail.deposit / 10000,
  ).toLocaleString()

  const GoalMinPrice = Math.floor(
    ReportData.detail.rentPrice / 10000,
  ).toLocaleString()
  return (
    <c.Container>
      <c.Title>내 매장 목표</c.Title>
      <c.SubTitle>
        지속적인 운영을 위해 필요한 <c.Emphasis>월 최소 목표 매출</c.Emphasis>
        이에요.
      </c.SubTitle>
      <c.GrayBox>
        <c.GrayBoxHeader>
          <c.ThumbUpIcon src={ThumbUp} alt="thumbUp" />
          <c.GrayBoxHeaderTitle>
            매장 월 최소 평균 목표 매출
          </c.GrayBoxHeaderTitle>
        </c.GrayBoxHeader>
        <c.GrayBoxTitle>{GoalPrice} 만원</c.GrayBoxTitle>
        <c.GrayBoxSubTitle>
          안정적인 운영을 위해서는 영업일 3일 이내로 평균 ({GoalMinPrice}
          만원)만큼의 매출이 발생해야해요.
        </c.GrayBoxSubTitle>
      </c.GrayBox>
    </c.Container>
  )
}

export default ReportMyGoal
