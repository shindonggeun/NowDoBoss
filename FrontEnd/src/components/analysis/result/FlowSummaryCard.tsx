import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import SummaryIconCard from '@src/common/SummaryIconCard'
import * as s from '@src/components/styles/analysis/result/SummaryCardStyle'

const FlowSummaryCard = () => {
  const flowSummary = useAnalysisSummaryStore(state => state.flowSummary)

  return (
    <s.Container>
      <s.Title>유동인구 한눈에 보기</s.Title>
      <s.CardWrap>
        <s.CardDiv>
          <SummaryIconCard
            title="가장 많은 성별"
            icon="/icons/toilet.png"
            text={`${flowSummary.gender}`}
          />
        </s.CardDiv>
        <s.CardDiv>
          <SummaryIconCard
            title="가장 많은 연령대"
            icon="/icons/three_people.png"
            text={`${flowSummary.age}`}
          />
        </s.CardDiv>
        <s.CardDiv>
          <SummaryIconCard
            title="가장 많은 시간대"
            icon="/icons/clock.png"
            text={`${flowSummary.time}`}
          />
        </s.CardDiv>
      </s.CardWrap>
    </s.Container>
  )
}

export default FlowSummaryCard
