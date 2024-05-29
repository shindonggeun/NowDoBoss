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
import * as s from '@src/components/styles/analysis/result/SummaryCardStyle'
import SummaryIconCard from '@src/common/StatusSummaryIconCard'
import open from '@src/assets/openIcon.png'
import close from '@src/assets/closeIcon.png'
import shop from '@src/assets/shopIcon.svg'

const DetailCommercialComponent = () => {
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

  let PeriodSummary
  let TimeSummary
  let TimeStart
  let TimeEnd
  let DaySummary
  let DetailSummary
  let GenderSummary
  let AgeSummary
  let AgeRange
  let OpenSummary
  let CloseSummary
  let TopSaleStoreSummary
  let OpenMonthSummary
  let CloseMonthSummary

  if (data) {
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
    AgeRange =
      data.dataBody.footTrafficDistrictDetail.footTrafficDistrictListByAge
        .summary === 'age60'
        ? '대 이상'
        : '대'
    OpenSummary =
      data.dataBody.storeDistrictDetail.openedStoreAdministrationTopFiveList[0].administrationCodeName.replace(
        /\?/g,
        ',',
      )

    CloseSummary =
      data.dataBody.storeDistrictDetail.closedStoreAdministrationTopFiveList[0].administrationCodeName.replace(
        /\?/g,
        ',',
      )
    TopSaleStoreSummary =
      data.dataBody.salesDistrictDetail.salesDistrictSalesTopFiveList[0].serviceCodeName.replace(
        /\?/g,
        ',',
      )

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
            <h.HighLight>핵심 요약</h.HighLight>
          </h.SummaryHeader>
          <ContainerBox height={20} />
          <c.SummaryTitle>
            <c.SummaryEmphasis>한눈에</c.SummaryEmphasis>알아볼 수 있도록 정리해
            왔어요
          </c.SummaryTitle>

          <c.SumContainer>
            <s.Container>
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
                    text={`${AgeSummary}${AgeRange}`}
                  />
                </s.CardDiv>
                <s.CardDiv>
                  <SummaryIconCard
                    title="가장 많은 시간대"
                    icon="/icons/clock.png"
                    text={`${TimeStart}~${TimeEnd}시`}
                  />
                </s.CardDiv>
                <s.CardDiv>
                  <SummaryIconCard
                    title="가장 많은 요일"
                    icon="/icons/calendar.png"
                    text={WeekData[DaySummary!]}
                  />
                </s.CardDiv>
              </s.CardWrap>

              <s.CardWrap>
                <s.CardDiv>
                  <SummaryIconCard
                    title="개업률 높은 동네"
                    icon={open}
                    text={OpenSummary!}
                  />
                </s.CardDiv>
                <s.CardDiv>
                  <SummaryIconCard
                    title="폐업률 높은 동네"
                    icon={close}
                    text={`${CloseSummary!}`}
                  />
                </s.CardDiv>
                <s.CardDiv>
                  <SummaryIconCard
                    title="매출 높은 업종"
                    icon={shop}
                    text={TopSaleStoreSummary!}
                  />
                </s.CardDiv>
              </s.CardWrap>
            </s.Container>
          </c.SumContainer>

          <div>
            <c.SummaryContainer>
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
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

export default DetailCommercialComponent
