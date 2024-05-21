import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import * as t from '@src/components/styles/analysis/result/TotalSummaryCardStyle.tsx'

const TotalSummaryCard = () => {
  const flowSummary = useAnalysisSummaryStore(state => state.flowSummary)
  const storeSummary = useAnalysisSummaryStore(state => state.storeSummary)
  const residentSummary = useAnalysisSummaryStore(
    state => state.residentSummary,
  )

  const tips = storeSummary.tip.split('. ').filter(tip => tip.trim() !== '')

  return (
    <t.Container>
      <t.TitleContainer>
        <t.TitleImage src="/icons/bulb.png" alt="" />
        <t.Title>종합의견</t.Title>
      </t.TitleContainer>
      <t.TextBox>
        <t.CategoryWrap>
          <t.Category>1. 인구 분석</t.Category>
          <t.Text>
            - 해당 상권의 일일 평균 유동인구는 {flowSummary.daily}명으로, 특히{' '}
            {flowSummary.age} {flowSummary.gender} 유동인구가 높고{' '}
            {flowSummary.timeInfo}에 가장 활발한 상권입니다.
          </t.Text>
          <t.Text>
            - 상대적으로 높은 {flowSummary.timeInfo}({flowSummary.time})의
            유동인구를 고려하여, 해당 시간대에 특화된 서비스나 프로그램을
            제공함으로써 경쟁력을 높여보세요.
          </t.Text>
          <t.Text>
            - 또한, {flowSummary.maxWeek} 유동인구가 {flowSummary.minWeek}보다
            약 {flowSummary.ratio}배 더 많은 것으로 나타나,{' '}
            {flowSummary.maxWeek} 대상 프로모션 전략 수립이 유리할 것으로
            기대됩니다.
          </t.Text>
          <t.Text>
            - 상주인구 중 {residentSummary.gender} 비율이 높고, 특히{' '}
            {residentSummary.age} 인구 비율이 높은 점을 고려하여, 이 연령대를
            타겟으로 한 마케팅 전략이 필요합니다.
          </t.Text>
        </t.CategoryWrap>
        <t.CategoryWrap>
          <t.Category>2. 업종 분석</t.Category>
          {tips.map((tip, index) => (
            <t.Text key={index}>- {tip}.</t.Text>
          ))}
        </t.CategoryWrap>
      </t.TextBox>
    </t.Container>
  )
}

export default TotalSummaryCard
