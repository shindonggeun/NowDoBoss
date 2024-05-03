import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'

const ReportMonthAnalysis = () => {
  const peakSeasons: number[] = [12, 1, 2]
  const offPeakSeasons: number[] = [3, 4, 5]

  const Months: string[] = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ]
  return (
    <c.Container>
      <c.Title>성수기 비성수기 분석</c.Title>
      <c.SubTitle>
        000구 000동의
        <c.Emphasis> 성수기는 {peakSeasons.join(',')}월</c.Emphasis> 이고
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
            <c.CircleMonth key={month} season={season || null}>
              {month}
            </c.CircleMonth>
          )
        })}
      </c.CircleContainer>
    </c.Container>
  )
}

export default ReportMonthAnalysis
