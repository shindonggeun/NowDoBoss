import * as c from '@src/components/styles/status/DeatilComponentStyle'
import * as h from '@src/components/styles/status/StatusDetailbarStyle'
import { useQuery } from '@tanstack/react-query'
import { fetchStatusFootTraffic } from '@src/api/statusApi'
import { FootPrintResponse } from '@src/types/StatusType'
import useStateStore, { WeekData } from '@src/stores/statusStore'
import ContainerBox from '@src/common/ContainerBox'
import AreaChart from '@src/common/AreaChart'
import PieChart from '@src/common/PieChart'
import Radar2Chart from '@src/common/Radar2Chart'
import BarChart3 from '@src/common/BarChart3'
import { useEffect } from 'react'
import CircleLoading from '@src/common/CircleLoading'

const DetailPopulationComponent = () => {
  const { regionCode } = useStateStore()

  // api 호출
  const { data, isLoading, refetch } = useQuery<FootPrintResponse>({
    queryKey: ['StatusDetailFootTraffic'],
    queryFn: () => fetchStatusFootTraffic(Number(regionCode)),
    enabled: !!regionCode,
  })

  useEffect(() => {
    refetch()
  }, [refetch, regionCode])

  let TrafficPeriod
  let PeriodDataArray
  let PeriodValues
  let PeriodMinValue
  let PeriodLabels

  let TrafficTime
  let TimeDataArray
  let PeakTime
  let StartTime
  let EndTime

  let TrafficGender
  let TrafficAge
  let AgeDataArray

  let TrafficDay
  let DayDataArray
  let DayValues
  let DayMinValue

  if (data) {
    // 분기별 평균 유동인구
    TrafficPeriod = data.dataBody.footTrafficDistrictListByPeriod
    PeriodDataArray = Object.entries(TrafficPeriod.data).map(
      ([key, value]) => ({
        [key]: value,
      }),
    )
    PeriodValues = Object.values(TrafficPeriod.data)
    PeriodMinValue = Math.min(...PeriodValues) * 0.99
    PeriodLabels = PeriodDataArray.map(item => {
      const key = Object.keys(item)[0]
      const year = key.substring(0, 4)
      const quarter = key.substring(4)
      return `${year}-${quarter}분기`
    })

    // 시간대별 유동인구
    TrafficTime = data.dataBody.footTrafficDistrictListByTime
    TimeDataArray = Object.entries(TrafficTime.data).map(([key, value]) => ({
      [key]: value,
    }))
    PeakTime = TrafficTime.summary.split('to')
    StartTime = PeakTime[0].split('time')
    EndTime = PeakTime[1]

    // 성별, 연령별 유동인구
    TrafficGender = data.dataBody.footTrafficDistrictListByGender
    TrafficAge = data.dataBody.footTrafficDistrictListByAge
    AgeDataArray = Object.entries(TrafficAge.data).map(([key, value]) => ({
      [key]: value,
    }))

    // 요일별 유동인구
    TrafficDay = data.dataBody.footTrafficDistrictListByDay
    DayDataArray = Object.entries(TrafficDay.data).map(([key, value]) => ({
      [key]: value,
    }))
    DayValues = Object.values(TrafficDay)
    DayMinValue = Math.min(...DayValues)
  }

  // spinner를 넣을까 말까~
  // const [spinner, setSpinner] = useState(true)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setSpinner(false)
  //   }, 100)
  // }, [])

  return (
    <div>
      {!isLoading && data ? (
        <>
          <div>
            <c.AnalysisTitle>분기별 평균 유동인구</c.AnalysisTitle>
            <c.AnalysisSubTitle>
              유동인구가 이전분기에 비해{' '}
              <c.AnalysiEemphasis>{TrafficPeriod!.summary}</c.AnalysiEemphasis>
              하고 있습니다.
            </c.AnalysisSubTitle>
            <BarChart3
              labels={PeriodLabels!}
              values={PeriodValues!}
              minvalue={Math.floor(PeriodMinValue!)}
              dataLavel="인구(명)"
            />
            <ContainerBox height={30} />
          </div>

          <div>
            <c.AnalysisTitle>시간대별 유동인구</c.AnalysisTitle>
            <c.AnalysisSubTitle>
              유동인구가 가장 높은 시간대는{' '}
              <c.AnalysiEemphasis>
                {StartTime!}~{EndTime!}시
              </c.AnalysiEemphasis>
              입니다
            </c.AnalysisSubTitle>
            <AreaChart
              labels={['00~06', '06~11', '11~17', '17~21', '21~24']}
              values={TimeDataArray!.map(item => Object.values(item)[0])}
            />
            <ContainerBox height={30} />
          </div>

          <c.MixConatiner>
            <c.MixInnerConatiner>
              <c.AnalysisTitle>성별 유동인구</c.AnalysisTitle>
              <c.AnalysisSubTitle>
                유동인구가 가장 많은 성별은
                <c.AnalysiEemphasis>
                  {TrafficGender!.summary === 'female' ? ' 여성' : ' 남성'}
                </c.AnalysiEemphasis>
                입니다
              </c.AnalysisSubTitle>
              <PieChart
                labels={['남성', '여성']}
                value={[TrafficGender!.data.male, TrafficGender!.data.female]}
              />
              <ContainerBox height={30} />
            </c.MixInnerConatiner>

            <c.MixInnerConatiner>
              <c.AnalysisTitle>연령별 유동인구</c.AnalysisTitle>
              <c.AnalysisSubTitle>
                유동인구가 가장 많은 연령대는{' '}
                <c.AnalysiEemphasis>
                  {TrafficAge!.summary.split('age')}대{' '}
                  {TrafficAge!.summary === 'age60' ? '이상' : ''}
                </c.AnalysiEemphasis>
                입니다
              </c.AnalysisSubTitle>
              <Radar2Chart
                value={AgeDataArray!.map(
                  item => Object.values(item)[0] / 500000,
                )}
              />
              <ContainerBox height={30} />
            </c.MixInnerConatiner>
          </c.MixConatiner>

          <div>
            <c.AnalysisTitle>요일별 유동인구</c.AnalysisTitle>
            <c.AnalysisSubTitle>
              유동인구가 가장 높은 요일은
              <c.AnalysiEemphasis>
                {WeekData[TrafficDay!.summary]}
              </c.AnalysiEemphasis>
              입니다
            </c.AnalysisSubTitle>
            <BarChart3
              labels={['월', '화', '수', '목', '금', '토', '일']}
              values={DayDataArray!.map(item => Object.values(item)[0])}
              minvalue={DayMinValue!}
              dataLavel="인구 (명)"
            />
          </div>
        </>
      ) : (
        <div>
          <ContainerBox height={60} />
          <h.LoadingContainer>
            <CircleLoading />
          </h.LoadingContainer>
        </div>
      )}
    </div>
  )
}

export default DetailPopulationComponent
