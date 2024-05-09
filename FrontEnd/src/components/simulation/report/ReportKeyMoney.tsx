import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import { SimulationReportType } from '@src/types/SimulationType'
import ReportStore from '@src/stores/reportStore'
// import blueCheck from '@src/assets/blue_check_icon.svg'
import greenCheck from '@src/assets/green_check_icon.svg'
import ContainerBox from '@src/common/ContainerBox'

const ReportKeyMoney = ({
  ReportData,
}: {
  ReportData: SimulationReportType
}) => {
  const { sigungu } = ReportStore()
  const Keymoney = ReportData.keyMoneyInfo

  return (
    <c.Container>
      <c.GrayBox>
        <c.Title>
          <c.CheckIcon src={greenCheck} alt="CheckIcon" />
          참고 도움말
        </c.Title>
        <ContainerBox height={10} />
        <c.GrayBoxText>
          <c.GrayBoxTextEmphasis>
            좋은 자리라면 권리금이 추가 발생
          </c.GrayBoxTextEmphasis>
          할 수 있습니다.
        </c.GrayBoxText>
        <c.GrayBoxText>
          {sigungu}에서{' '}
          <c.GrayBoxTextEmphasis>
            권리금이 발생한 거래 비율은 {Keymoney.keyMoneyRatio}%
          </c.GrayBoxTextEmphasis>
          로 신고된 100개의 거래 중 {Math.floor(Keymoney.keyMoneyRatio)}개의
          거래는 권리금이 발생한 것을 뜻합니다.
        </c.GrayBoxText>
        <c.GrayBoxText>
          <c.GrayBoxTextEmphasis>
            권리금 수준 평균은 {Keymoney.keyMoney.toLocaleString()}만원
          </c.GrayBoxTextEmphasis>
          이고, ㎡당 평균{' '}
          <c.GrayBoxTextEmphasis>
            {Keymoney.keyMoneyLevel}만원
          </c.GrayBoxTextEmphasis>{' '}
          입니다.
        </c.GrayBoxText>
      </c.GrayBox>
      <div>(선택) : 권리금이 무엇인가요?</div>
    </c.Container>
  )
}

export default ReportKeyMoney
