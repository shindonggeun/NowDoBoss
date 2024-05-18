import * as h from '@src/components/styles/simulation/ReportDetailStyle'
import * as c from '@src/components/styles/status/DeatilComponentStyle'

import { StatusResponse } from '@src/types/StatusType'
import useStateStore, { WeekData } from '@src/stores/statusStore'
import Dot from '@src/assets/dotIcon.svg'
import ThumbUp from '@src/assets/thumbUp.svg'
import ContainerBox from '@src/common/ContainerBox'
import { useQuery } from '@tanstack/react-query'
import { fetchStatusDetail } from '@src/api/statusApi'
import { useEffect } from 'react'

const DetailCommercialComponent = () => {
  const { selectedRegion } = useStateStore()
  const { regionCode } = useStateStore()

  // api 호출
  const { data, isLoading, refetch } = useQuery<StatusResponse>({
    queryKey: ['StatusDetailData'],
    queryFn: () => fetchStatusDetail(Number(regionCode)),
    enabled: !!regionCode,
  })

  useEffect(() => {
    refetch()
  }, [refetch, regionCode])

  let ChangeSummary
  let PeriodSummary
  let TimeSummary
  let TimeStart
  let TimeEnd
  let DaySummary
  let DetailSummary
  let GenderSummary
  let AgeSummary
  let OpenSummary
  let CloseSummary
  let TopSaleStoreSummary
  let TopSaleAreaSummary
  let OpenMonthSummary
  let CloseMonthSummary

  if (data) {
    ChangeSummary =
      data.dataBody.changeIndicatorDistrictDetail.changeIndicatorName
    PeriodSummary =
      data.dataBody.footTrafficDistrictDetail.footTrafficDistrictListByPeriod
        .summary
    TimeSummary =
      data.dataBody.footTrafficDistrictDetail.footTrafficDistrictListByTime.summary.replace(
        'time',
        '',
      )
    TimeStart = TimeSummary.split('to')[0].toString()
    TimeEnd = TimeSummary.split('to')[1].toString()
    DaySummary =
      data.dataBody.footTrafficDistrictDetail.footTrafficDistrictListByDay
        .summary
    DetailSummary =
      data.dataBody.storeDistrictDetail.storeDistrictTotalTopEightList
    GenderSummary =
      data.dataBody.footTrafficDistrictDetail.footTrafficDistrictListByGender
        .summary
    AgeSummary =
      data.dataBody.footTrafficDistrictDetail.footTrafficDistrictListByAge.summary
        .split('age')[1]
        .toString()
    OpenSummary =
      data.dataBody.storeDistrictDetail.openedStoreAdministrationTopFiveList[0]
        .administrationCodeName

    CloseSummary =
      data.dataBody.storeDistrictDetail.closedStoreAdministrationTopFiveList[0]
        .administrationCodeName
    TopSaleStoreSummary =
      data.dataBody.salesDistrictDetail.salesDistrictSalesTopFiveList[0]
        .serviceCodeName
    TopSaleAreaSummary =
      data.dataBody.salesDistrictDetail.salesAdministrationTopFiveList[0]
        .administrationCodeName
    OpenMonthSummary =
      data.dataBody.changeIndicatorDistrictDetail.openedMonths >= 106
        ? '높고'
        : '낮고'
    CloseMonthSummary =
      data.dataBody.changeIndicatorDistrictDetail.closedMonths >= 52
        ? '높습니다'
        : '낮습니다'
  }

  return (
    <div>
      {!isLoading && data ? (
        <div>
          <ContainerBox height={15} />
          <h.SummaryHeader>
            <h.LightIcon src={ThumbUp} alt="close" />

            <h.HighLight>한줄 요약</h.HighLight>
          </h.SummaryHeader>
          <c.SummaryContainer>
            <c.SummaryTitle>
              <c.SummaryTitleEmphasis>{selectedRegion}</c.SummaryTitleEmphasis>
              의 상권변화는{' '}
              <c.SummaryEmphasis>{ChangeSummary}</c.SummaryEmphasis>
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
                  과 <c.SummaryEmphasis>{AgeSummary}</c.SummaryEmphasis>대가
                  주를 이룹니다.
                </c.SummaryList>
              </c.SummaryTextContainer>

              <c.SummaryTextContainer>
                <c.DotIcon src={Dot} alt="dot" />
                <c.SummaryList>
                  가장 붐비는 요일은
                  <c.SummaryEmphasis>{WeekData[DaySummary!]}</c.SummaryEmphasis>
                  입니다.
                </c.SummaryList>
              </c.SummaryTextContainer>
              <c.SummaryTextContainer>
                <c.DotIcon src={Dot} alt="dot" />
                <c.SummaryList>
                  <c.SummaryEmphasis>
                    {TopSaleAreaSummary!.replace('?', ',')}
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
                    {DetailSummary![0].serviceCodeName}
                  </c.SummaryEmphasis>
                  이며, 그다음으로는{' '}
                  <c.SummaryEmphasis>
                    {DetailSummary![1].serviceCodeName}
                  </c.SummaryEmphasis>
                  ,{' '}
                  <c.SummaryEmphasis>
                    {DetailSummary![2].serviceCodeName}
                  </c.SummaryEmphasis>{' '}
                  입니다.
                </c.SummaryList>
              </c.SummaryTextContainer>
              <c.SummaryTextContainer>
                <c.DotIcon src={Dot} alt="dot" />
                <c.SummaryList>
                  개업률이 높은 동네는{' '}
                  <c.SummaryEmphasis>
                    {OpenSummary!.replace('?', ',')}
                  </c.SummaryEmphasis>
                  이며, 폐업률이 높은 동네는{' '}
                  <c.SummaryEmphasis>
                    {CloseSummary!.replace('?', ',')}
                  </c.SummaryEmphasis>
                  입니다.
                </c.SummaryList>
              </c.SummaryTextContainer>
              <c.SummaryTextContainer>
                <c.DotIcon src={Dot} alt="dot" />
                <c.SummaryList>
                  평균 운영 영업개월은 서울시보다{'  '}
                  <c.SummaryEmphasis>{OpenMonthSummary}</c.SummaryEmphasis>,
                  평균 폐업 영업개월은 서울시보다{' '}
                  <c.SummaryEmphasis>{CloseMonthSummary}</c.SummaryEmphasis>.
                </c.SummaryList>
              </c.SummaryTextContainer>
            </div>
          </c.SummaryContainer>
          <ContainerBox height={10} />
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

export default DetailCommercialComponent
