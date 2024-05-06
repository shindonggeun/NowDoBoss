import * as c from '@src/components/styles/status/DeatilComponentStyle'
import { DetailDataBody } from '@src/types/StatusType'
import AreaChart from '@src/common/AreaChart'
import BarChart2 from '@src/common/BarChart2'
import PieChart from '@src/common/PieChart'
import Radar2Chart from '@src/common/Radar2Chart'
import BarChart3 from '@src/common/BarChart3'

interface DetailPopulationProps {
  props: DetailDataBody
}

const DetailPopulationComponent = ({ props }: DetailPopulationProps) => {
  console.log(props!.footTrafficDistrictDetail.footTrafficDistrictListByTime)

  const PeriodData =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByPeriod
  const PeriodDataArray = Object.entries(PeriodData.data).map(
    ([key, value]) => ({
      [key]: value,
    }),
  )

  const labels = PeriodDataArray.map(item => {
    const key = Object.keys(item)[0]
    const year = key.substring(0, 4)
    const quarter = key.substring(4)
    return `${year}-${quarter}분기`
  })

  const TimeData =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByTime
  const TimeDataArray = Object.entries(TimeData.data).map(([key, value]) => ({
    [key]: value,
  }))
  const PeakTime = TimeData.summary.split('to')
  const StartTime = PeakTime[0].split('time')
  const EndTime = PeakTime[1]

  const GenderData =
    props!.footTrafficDistrictDetail.footTrafficDistrictListByGender

  const AgeData = props!.footTrafficDistrictDetail.footTrafficDistrictListByAge
  const AgeDataArray = Object.entries(AgeData.data).map(([key, value]) => ({
    [key]: value,
  }))

  const DayData = props!.footTrafficDistrictDetail.footTrafficDistrictListByDay
  const DayDataArray = Object.entries(DayData.data).map(([key, value]) => ({
    [key]: value,
  }))

  return (
    <>
      {/* <h1>유동인구 페이지</h1> */}
      <c.AnalysisTitle>분기별 평균 유동인구</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        유동인구가 이전분기에 비해
        <c.AnalysiEemphasis>{PeriodData.summary}</c.AnalysiEemphasis>
        하고 있습니다.
      </c.AnalysisSubTitle>
      <BarChart2
        labels={labels}
        values={PeriodDataArray.map(item => Object.values(item)[0])}
      />

      <c.AnalysisTitle>시간대별 유동인구</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        유동인구가 가장 높은 시간대는
        <c.AnalysiEemphasis>
          {StartTime} ~ {EndTime}시
        </c.AnalysiEemphasis>
        입니다
      </c.AnalysisSubTitle>
      <AreaChart
        labels={['00~06', '06~11', '11~17', '17~21', '21~24']}
        values={TimeDataArray.map(item => Object.values(item)[0])}
      />

      <c.AnalysisTitle>성별 유동인구</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        유동인구가 가장 많은 성별은
        <c.AnalysiEemphasis>
          {GenderData.summary === 'female' ? ' 여성' : ' 남성'}
        </c.AnalysiEemphasis>
        입니다
      </c.AnalysisSubTitle>
      <PieChart
        labels={['남성', '여성']}
        value={[GenderData.data.male, GenderData.data.female]}
      />

      <c.AnalysisTitle>연령별 유동인구</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        유동인구가 가장 많은 연령대는
        <c.AnalysiEemphasis>
          {AgeData.summary.split('age')}대
        </c.AnalysiEemphasis>
        입니다
      </c.AnalysisSubTitle>
      <Radar2Chart
        value={AgeDataArray.map(item => Object.values(item)[0] / 500000)}
      />

      <c.AnalysisTitle>요일별 유동인구</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        유동인구가 가장 높은 요일은
        <c.AnalysiEemphasis>{PeriodData.summary}</c.AnalysiEemphasis>
        입니다
      </c.AnalysisSubTitle>
      <BarChart3
        labels={labels}
        values={DayDataArray.map(item => Object.values(item)[0])}
      />
    </>
  )
}

export default DetailPopulationComponent
