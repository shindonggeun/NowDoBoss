import * as c from '@src/components/styles/status/DeatilComponentStyle'
import { DetailDataBody } from '@src/types/StatusType'
import AreaChart from '@src/common/AreaChart'
import BarChart2 from '@src/common/BarChart2'
import DoughnutChart from '@src/common/DoughnutChart.tsx'

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
    props!.footTrafficDistrictDetail.footTrafficDistrictListByGender.data
  // const totalPopulation = GenderData.male + GenderData.female
  // const malePercentage = (GenderData.male / totalPopulation) * 100
  // const femalePercentage = (GenderData.female / totalPopulation) * 100

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
        <c.AnalysiEemphasis>{}</c.AnalysiEemphasis>
        입니다
      </c.AnalysisSubTitle>
      <DoughnutChart
        labels={['여성', '남성']}
        value={[GenderData.male, GenderData.female]}
        textCenter="test"
      />

      <c.AnalysisTitle>연령별 유동인구</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        유동인구가 가장 많은 연령대는
        <c.AnalysiEemphasis>{}</c.AnalysiEemphasis>
        입니다
      </c.AnalysisSubTitle>
    </>
  )
}

export default DetailPopulationComponent
