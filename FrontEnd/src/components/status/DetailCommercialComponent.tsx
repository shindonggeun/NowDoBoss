import * as h from '@src/components/styles/simulation/ReportDetailStyle'
import * as c from '@src/components/styles/status/DeatilComponentStyle'

import { DetailDataBody } from '@src/types/StatusType'
import useStateStore, { WeekData } from '@src/stores/statusStore'
import Dot from '@src/assets/dotIcon.svg'
import ThumbUp from '@src/assets/thumbUp.svg'
import ContainerBox from '@src/common/ContainerBox'

interface DetailCommercialProps {
  props: DetailDataBody
}
const DetailCommercialComponent = ({ props }: DetailCommercialProps) => {
  const { selectedRegion } = useStateStore()

  const ChangeSummary = props!.changeIndicatorDistrictDetail.changeIndicatorName
  const PeriodSummary =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByPeriod.summary
  const TimeSummary =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByTime.summary.replace(
      'time',
      '',
    )
  const TimeStart = TimeSummary.split('to')[0]
  const TimeEnd = TimeSummary.split('to')[1]
  const DaySummary =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByDay.summary
  const DatailSummary =
    props!.storeDistrictDetail.storeDistrictTotalTopEightList
  const GenderSummary =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByGender.summary
  const AgeSummary =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByAge.summary.split(
      'age',
    )[1]
  const OpenSummary =
    props!.storeDistrictDetail.openedStoreAdministrationTopFiveList[0]
      .administrationCodeName
  const CloseSummary =
    props!.storeDistrictDetail.closedStoreAdministrationTopFiveList[0]
      .administrationCodeName
  const TopSaleStoreSummary =
    props!.salesDistrictDetail.salesDistrictSalesTopFiveList[0].serviceCodeName
  const TopSaleAreaSummary =
    props!.salesDistrictDetail.salesAdministrationTopFiveList[0]
      .administrationCodeName
  const OpenMonthSummary =
    props!.changeIndicatorDistrictDetail.openedMonths >= 106 ? '높고' : '낮고'
  const CloseMonthSummary =
    props!.changeIndicatorDistrictDetail.closedMonths >= 52
      ? '높습니다'
      : '낮습니다'

  return (
    <>
      <ContainerBox height={15} />
      <h.SummaryHeader>
        <h.LightIcon src={ThumbUp} alt="close" />

        <h.HighLight>핵심 요약</h.HighLight>
      </h.SummaryHeader>
      <c.SummaryContainer>
        <c.SummaryTitle>
          <c.SummaryTitleEmphasis>{selectedRegion}</c.SummaryTitleEmphasis>의
          상권변화는 <c.SummaryEmphasis>{ChangeSummary}</c.SummaryEmphasis>
          입니다.
        </c.SummaryTitle>
        <div>
          <c.SummaryTextContainer>
            <c.DotIcon src={Dot} alt="dot" />
            <c.SummaryList>
              전분기 대비 유동인구가{' '}
              <c.SummaryEmphasis>{PeriodSummary}</c.SummaryEmphasis>
              했습니다.
            </c.SummaryList>
          </c.SummaryTextContainer>
          <c.SummaryTextContainer>
            <c.DotIcon src={Dot} alt="dot" />
            <c.SummaryList>
              유동인구는{' '}
              <c.SummaryEmphasis>
                {TimeStart}~{TimeEnd}시
              </c.SummaryEmphasis>
              에 가장 많고,{' '}
              <c.SummaryEmphasis>
                {GenderSummary === 'femail' ? '여성' : '남성'}
              </c.SummaryEmphasis>
              과 <c.SummaryEmphasis>{AgeSummary}</c.SummaryEmphasis>대가 주를
              이룹니다.
            </c.SummaryList>
          </c.SummaryTextContainer>

          <c.SummaryTextContainer>
            <c.DotIcon src={Dot} alt="dot" />
            <c.SummaryList>
              가장 붐비는 요일은
              <c.SummaryEmphasis>{WeekData[DaySummary]}</c.SummaryEmphasis>
              입니다.
            </c.SummaryList>
          </c.SummaryTextContainer>
          <c.SummaryTextContainer>
            <c.DotIcon src={Dot} alt="dot" />
            <c.SummaryList>
              <c.SummaryEmphasis>
                {TopSaleAreaSummary.replace('?', ',')}
              </c.SummaryEmphasis>
              의 매출이 가장 높습니다.
            </c.SummaryList>
          </c.SummaryTextContainer>
          <c.SummaryTextContainer>
            <c.DotIcon src={Dot} alt="dot" />
            <c.SummaryList>
              가장 매출이 높은 업종은{' '}
              <c.SummaryEmphasis>{TopSaleStoreSummary}</c.SummaryEmphasis>
              입니다.
            </c.SummaryList>
          </c.SummaryTextContainer>
          <c.SummaryTextContainer>
            <c.DotIcon src={Dot} alt="dot" />
            <c.SummaryList>
              주요 업종은{' '}
              <c.SummaryEmphasis>
                {DatailSummary[0].serviceCodeName}
              </c.SummaryEmphasis>
              이며, 그다음으로는{' '}
              <c.SummaryEmphasis>
                {DatailSummary[1].serviceCodeName}
              </c.SummaryEmphasis>
              ,{' '}
              <c.SummaryEmphasis>
                {DatailSummary[2].serviceCodeName}
              </c.SummaryEmphasis>{' '}
              입니다.
            </c.SummaryList>
          </c.SummaryTextContainer>
          <c.SummaryTextContainer>
            <c.DotIcon src={Dot} alt="dot" />
            <c.SummaryList>
              가장 개업률이 높은 동네는{' '}
              <c.SummaryEmphasis>
                {OpenSummary.replace('?', ',')}
              </c.SummaryEmphasis>
              이며, 폐업률이 높은 동네는{' '}
              <c.SummaryEmphasis>
                {CloseSummary.replace('?', ',')}
              </c.SummaryEmphasis>
              입니다.
            </c.SummaryList>
          </c.SummaryTextContainer>
          <c.SummaryTextContainer>
            <c.DotIcon src={Dot} alt="dot" />
            <c.SummaryList>
              평균 운영 영업개월은 서울시보다{'  '}
              <c.SummaryEmphasis>{OpenMonthSummary}</c.SummaryEmphasis>, 폐업
              영업개월은 서울시보다{'  '}
              <c.SummaryEmphasis>{CloseMonthSummary}</c.SummaryEmphasis>.
            </c.SummaryList>
          </c.SummaryTextContainer>
        </div>
      </c.SummaryContainer>
      <ContainerBox height={10} />
    </>
  )
}

export default DetailCommercialComponent
