import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import { SimulationReportType } from '@src/types/SimulationType'
import ReportStore from '@src/stores/reportStore'
// import blueCheck from '@src/assets/blue_check_icon.svg'
import greenCheck from '@src/assets/green_check_icon.svg'
import ContainerBox from '@src/common/ContainerBox'
import AccordionGroup from '@mui/joy/AccordionGroup'
import Accordion from '@mui/joy/Accordion'
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails'
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary'

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
      <ContainerBox height={10} />
      <AccordionGroup
        sx={{
          borderRadius: 'md',
          [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
            {
              paddingBlock: '1rem',
              borderTop: '1px solid #C1BEBE',
              fontFamily: 'pretendard',
              fontSize: '14px',
            },
          [`& .${accordionSummaryClasses.button}`]: {
            paddingBlock: '0.7rem',
            borderRadius: '5px 5px 0 0',
            fontFamily: 'pretendard',
            fontSize: '15px',
          },
        }}
      >
        <Accordion>
          <AccordionSummary>권리금이 무엇인가요?</AccordionSummary>
          <AccordionDetails>
            <div>상가건물 임대차보호법 제10조의3(권리금의 정의 등)</div>
            <ContainerBox height={5} />
            <div>
              ① 권리금이란 임대차 목적물인 상가건물에서 영업을 하는 자 또는
              영업을 하려는 자가 영업시설ㆍ비품, 거래처, 신용, 영업상의 노하우,
              상가건물의 위치에 따른 영업상의 이점 등 유형ㆍ무형의 재산적 가치의
              양도 또는 이용대가로서 임대인, 임차인에게 보증금과 차임 이외에
              지급하는 금전 등의 대가.
            </div>
            <ContainerBox height={5} />
            <div>
              ② 권리금 계약이란 신규임차인이 되려는 자가 임차인에게 권리금을
              지급하기로 하는 계약.
            </div>
            <ContainerBox height={13} />
            <div>
              즉, 기존의 가게나 회사를 인수할 때 고객과 영업방식을 인계받는
              대가로 지급하는 돈입니다.
            </div>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </c.Container>
  )
}

export default ReportKeyMoney
