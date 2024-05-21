import * as s from '@src/components/styles/analysis/result/SummaryCardStyle'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import SummaryIconCard from '@src/common/StatusSummaryIconCard'
import useStateStore, { WeekData } from '@src/stores/statusStore'
import { useQuery } from '@tanstack/react-query'
import {
  FootPrintResponse,
  StoreCloseResponse,
  StoreOpenResponse,
} from '@src/types/StatusType'
import {
  fetchStatusClose,
  fetchStatusFootTraffic,
  fetchStatusOpen,
} from '@src/api/statusApi'
import { useEffect } from 'react'
import shop from '@src/assets/shopIcon.svg'
import open from '@src/assets/openIcon.png'
import close from '@src/assets/closeIcon.png'

const DetailSummaryComponent = () => {
  const { regionCode } = useStateStore()

  // api 호출
  // 유동인구
  const {
    data: footPrintData,
    isLoading: footPrintLoading,
    refetch: footPrintFetch,
  } = useQuery<FootPrintResponse>({
    queryKey: ['StatusDetailFootTraffic'],
    queryFn: () => fetchStatusFootTraffic(Number(regionCode)),
    enabled: !!regionCode,
  })

  // 개업률
  const {
    data: OpendData,
    isLoading: OpenLoading,
    refetch: OpenRefetch,
  } = useQuery<StoreOpenResponse>({
    queryKey: ['StatusDetailOpen'],
    queryFn: () => fetchStatusOpen(Number(regionCode)),
    enabled: !!regionCode,
  })

  // 폐업률
  const {
    data: ClosedData,
    isLoading: CloseLoading,
    refetch: CloseRefetch,
  } = useQuery<StoreCloseResponse>({
    queryKey: ['StatusDetailClose'],
    queryFn: () => fetchStatusClose(Number(regionCode)),
    enabled: !!regionCode,
  })

  useEffect(() => {
    footPrintFetch()
    OpenRefetch()
    CloseRefetch()
  }, [footPrintFetch, OpenRefetch, CloseRefetch, regionCode])

  let GenderSummary
  let AgeSummary
  let TimeSummary
  let TimeStart
  let TimeEnd
  let DaySummary

  if (footPrintData) {
    GenderSummary =
      footPrintData.dataBody.footTrafficDistrictListByGender.summary
    AgeSummary = footPrintData.dataBody.footTrafficDistrictListByAge.summary
      .split('age')[1]
      .toString()
    TimeSummary =
      footPrintData.dataBody.footTrafficDistrictListByTime.summary.replace(
        'time',
        '',
      )
    TimeStart = TimeSummary.split('to')[0].toString()
    TimeEnd = TimeSummary.split('to')[1].toString()
    DaySummary = footPrintData.dataBody.footTrafficDistrictListByDay
  }

  let OpenData

  if (OpendData) {
    OpenData = OpendData.dataBody[0].administrationCodeName.replace(/\?/g, ',')
  }

  let CloseData
  if (ClosedData) {
    CloseData = ClosedData.dataBody[0].administrationCodeName.replace(
      /\?/g,
      ',',
    )
  }
  console.log(OpenData)
  return (
    <c.SumContainer>
      <c.AnalysisTitle>핵심 분석</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        한눈에 알아볼 수 있도록 정리했어요
      </c.AnalysisSubTitle>
      <s.Container>
        {!footPrintLoading && footPrintData ? (
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
            <s.CardDiv>
              <SummaryIconCard
                title="가장 많은 요일"
                icon="/icons/calendar.png"
                text={WeekData[DaySummary!.summary]}
              />
            </s.CardDiv>
          </s.CardWrap>
        ) : (
          <div />
        )}

        {!OpenLoading && OpendData && !CloseLoading && ClosedData ? (
          <s.CardWrap>
            <s.CardDiv>
              <SummaryIconCard
                title="개업률 높은 동네"
                icon={open}
                text={OpenData!}
              />
            </s.CardDiv>
            <s.CardDiv>
              <SummaryIconCard
                title="폐업률 높은 동네"
                icon={close}
                text={`${CloseData!}`}
              />
            </s.CardDiv>
            <s.CardDiv>
              <SummaryIconCard title="가장 많은 업종" icon={shop} text="dd" />
            </s.CardDiv>
          </s.CardWrap>
        ) : (
          <div />
        )}
      </s.Container>
    </c.SumContainer>
  )
}

export default DetailSummaryComponent
