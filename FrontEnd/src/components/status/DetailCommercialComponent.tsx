import * as h from '@src/components/styles/simulation/ReportDetailStyle'
import * as c from '@src/components/styles/status/DeatilComponentStyle'

import { DetailDataBody } from '@src/types/StatusType'
import useStateStore, { WeekData } from '@src/stores/statusStore'
import ThumbUp from '@src/assets/thumbUp.svg'
import ContainerBox from '@src/common/ContainerBox'

interface DetailCommercialProps {
  props: DetailDataBody
}
const DetailCommercialComponent = ({ props }: DetailCommercialProps) => {
  const { selectedRegion } = useStateStore()

  const ChangeSummary = props!.changeIndicatorDistrictDetail.changeIndicatorName
  const PeriodSummary =
    props.footTrafficDistrictDetail.footTrafficDistrictListByPeriod.summary
  const TimeSummary =
    props.footTrafficDistrictDetail.footTrafficDistrictListByTime.summary.replace(
      'time',
      '',
    )
  const TimeStart = TimeSummary.split('to')[0]
  const TimeEnd = TimeSummary.split('to')[1]
  const DaySummary =
    props.footTrafficDistrictDetail.footTrafficDistrictListByDay.summary
  const DatailSummary = props.storeDistrictDetail.storeDistrictTotalTopEightList
  const GenderSummary =
    props.footTrafficDistrictDetail.footTrafficDistrictListByGender.summary
  const AgeSummary =
    props.footTrafficDistrictDetail.footTrafficDistrictListByAge.summary.split(
      'age',
    )[1]
  const OpenSummary =
    props.storeDistrictDetail.openedStoreAdministrationTopFiveList[0]
      .administrationCodeName
  const CloseSummary =
    props.storeDistrictDetail.closedStoreAdministrationTopFiveList[0]
      .administrationCodeName
  const TopSaleStoreSummary =
    props.salesDistrictDetail.salesDistrictSalesTopFiveList[0].serviceCodeName
  const TopSaleAreaSummary =
    props.salesDistrictDetail.salesAdministrationTopFiveList[0]
      .administrationCodeName
  const OpenMonthSummary =
    props.changeIndicatorDistrictDetail.openedMonths >= 106 ? '높고' : '낮고'
  const CloseMonthSummary =
    props.changeIndicatorDistrictDetail.closedMonths >= 52
      ? '높습니다'
      : '낮습니다'

  return (
    <>
      <ContainerBox height={30} />
      <h.SummaryHeader>
        <h.LightIcon src={ThumbUp} alt="close" />

        <h.HighLight>핵심 요약</h.HighLight>
      </h.SummaryHeader>
      <div>
        <c.SummaryTitle>
          <c.SummaryTitleEmphasis>{selectedRegion}</c.SummaryTitleEmphasis>의
          상권변화는
          {ChangeSummary}입니다.
        </c.SummaryTitle>
        <div>
          <div>전분기 대비 유동인구가 {PeriodSummary}했습니다.</div>
          <div>
            유동인구는 {TimeStart}~{TimeEnd}시에 가장 많고,{' '}
            {GenderSummary === 'femail' ? '여성' : '남성'}과 {AgeSummary}대가
            주를 이룹니다.
          </div>

          <div>가장 붐비는 요일은 {WeekData[DaySummary]}입니다.</div>
          <div>{TopSaleAreaSummary}의 매출이 가장 높습니다.</div>
          <div>가장 매출이 높은 업종은 {TopSaleStoreSummary}입니다.</div>
          <div>
            주요 업종은 {DatailSummary[0].serviceCodeName}이며, 그다음으로는{' '}
            {DatailSummary[1].serviceCodeName},
            {DatailSummary[2].serviceCodeName} 입니다.
          </div>
          <div>
            가장 개업률이 높은 동네는 {OpenSummary}이며, 폐업률이 높은 동네는{' '}
            {CloseSummary}입니다.
          </div>
          <div>
            평균 운영 영업개월은 서울시보다 {OpenMonthSummary}, 폐업 영업개월은
            서울시보다 {CloseMonthSummary}.
          </div>
        </div>
      </div>
      <ContainerBox height={30} />
    </>
  )
}

export default DetailCommercialComponent
