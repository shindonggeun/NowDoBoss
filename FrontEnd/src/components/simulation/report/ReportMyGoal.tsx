import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import ThumbUp from '@src/assets/thumbUp.svg'
import { SimulationReportType } from '@src/types/SimulationType'

const ReportMyGoal = ({ ReportData }: { ReportData: SimulationReportType }) => {
  const GoalPrice: number = ReportData.detail.deposit

  const GoalMinPrice = Math.floor(ReportData.detail.rentPrice).toLocaleString()

  const formattedPrices = () => {
    if (GoalPrice > 10000) {
      const billions = Math.floor(GoalPrice / 10000)
      const millions = Math.floor(GoalPrice % 10000)
      return `${billions}억 ${millions.toLocaleString()} '만원'}`
    }
    return `${GoalPrice.toLocaleString()} ${GoalPrice === 0 ? '원' : '만원'}`
  }

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
        <c.GrayBoxTitle>{formattedPrices()}</c.GrayBoxTitle>
        <c.GrayBoxSubTitle>
          안정적인 운영을 위해서는 영업일 3일 이내로 평균 ({GoalMinPrice}
          만원) 만큼의 매출이 발생해야해요.
        </c.GrayBoxSubTitle>
      </c.GrayBox>
    </c.Container>
  )
}

export default ReportMyGoal
