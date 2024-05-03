import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'

const ReportMonthAnalysis = () => {
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
        창업 성공을 위해 도움이 될 만한 데이터를 분석해 왔어요.
      </c.SubTitle>
      {Months.map(month => (
        <div key={month}>{month}</div>
      ))}
    </c.Container>
  )
}

export default ReportMonthAnalysis
