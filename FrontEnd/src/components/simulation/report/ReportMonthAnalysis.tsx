import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import useReportStore from '@src/stores/reportStore'
import { SimulationReportType } from '@src/types/SimulationType'

const ReportMonthAnalysis = ({
  ReportData,
}: {
  ReportData: SimulationReportType
}) => {
  const { sigungu } = useReportStore()
  const { peakSeasons } = ReportData.monthAnalysisInfo
  const { offPeakSeasons } = ReportData.monthAnalysisInfo

  const Months = Array.from({ length: 12 }, (_, i) => i + 1)
  return (
    <c.Container>
      <c.Title>성수기 비성수기 분석</c.Title>
      <c.SubTitle>
        {sigungu}의<c.Emphasis> 성수기는 {peakSeasons.join(',')}월</c.Emphasis>{' '}
        이고
        <c.Emphasis> 비성수기는 {offPeakSeasons.join(',')}월</c.Emphasis>입니다.
      </c.SubTitle>
      <c.CircleContainer>
        {Months.map((month, i) => {
          let season = ''
          if (peakSeasons.includes(i + 1)) {
            season = 'peak'
          }
          if (offPeakSeasons.includes(i + 1)) {
            season = 'offpeak'
          }
          return (
            <c.CircleMonth key={month} $season={season || null}>
              {month}월
            </c.CircleMonth>
          )
        })}
      </c.CircleContainer>
    </c.Container>
  )
}

export default ReportMonthAnalysis
