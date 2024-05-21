import * as s from '@src/components/styles/analysis/result/SummaryCardStyle'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import SummaryIconCard from '@src/common/StatusSummaryIconCard'
import { DetailDataBody } from '@src/types/StatusType'

interface DetailCommercialProps {
  props: DetailDataBody
}

const DetailSummaryComponent = ({ props }: DetailCommercialProps) => {
  const GenderSummary =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByGender.summary
  const AgeSummary =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByAge.summary.split(
      'age',
    )[1]
  const TimeSummary =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByTime.summary.replace(
      'time',
      '',
    )
  const TimeStart = TimeSummary.split('to')[0]
  const TimeEnd = TimeSummary.split('to')[1]

  return (
    <c.SumContainer>
      <s.Container>
        {/* <s.Title>누가있나요?</s.Title> */}
        <s.CardWrap>
          <s.CardDiv>
            <SummaryIconCard
              title="가장 많은 성별"
              icon="/icons/toilet.png"
              text={GenderSummary === 'femail' ? '여성' : '남성'}
            />
          </s.CardDiv>
          <s.CardDiv>
            <SummaryIconCard
              title="가장 많은 연령대"
              icon="/icons/three_people.png"
              text={`${AgeSummary}대`}
            />
          </s.CardDiv>
          <s.CardDiv>
            <SummaryIconCard
              title="가장 많은 시간대"
              icon="/icons/clock.png"
              text={`${TimeStart}~${TimeEnd}시`}
            />
          </s.CardDiv>
        </s.CardWrap>
      </s.Container>
    </c.SumContainer>
  )
}

export default DetailSummaryComponent
