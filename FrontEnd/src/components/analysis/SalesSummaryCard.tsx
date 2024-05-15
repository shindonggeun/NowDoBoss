import SummaryIconCard from '@src/common/SummaryIconCard'
import * as s from '@src/components/styles/analysis/SummaryCardStyle'

const SalesSummaryCard = () => {
  return (
    <s.Container>
      <s.Title>종로2가 커피업종 가게들은 얼마나 버나요?</s.Title>
      <s.SalesWrap>
        <s.SalesSummary>
          <s.TotalDiv>
            <s.TotalTitle>총매출</s.TotalTitle>
            <s.TotalText>4억 8,242만원</s.TotalText>
          </s.TotalDiv>
          <s.SalesList>
            <s.SalesDiv>
              <p>월 평균 매출</p>
              <strong>2,838만원</strong>
            </s.SalesDiv>
            <s.SalesDiv>
              <p>1회 평균 결제 금액(추정)</p>
              <strong>8,758원</strong>
            </s.SalesDiv>
          </s.SalesList>
        </s.SalesSummary>
        <s.CardWrap>
          <s.CardDiv>
            <SummaryIconCard
              title="성별"
              icon="/icons/toilet.png"
              text="남성"
            />
          </s.CardDiv>
          <s.CardDiv>
            <SummaryIconCard
              title="연령대"
              icon="/icons/three_people.png"
              text="20대"
            />
          </s.CardDiv>
          <s.CardDiv>
            <SummaryIconCard
              title="요일"
              icon="/icons/calendar.png"
              text="토요일"
            />
          </s.CardDiv>
          <s.CardDiv>
            <SummaryIconCard
              title="시간대"
              icon="/icons/clock.png"
              text="18~22시"
            />
          </s.CardDiv>
        </s.CardWrap>
      </s.SalesWrap>
    </s.Container>
  )
}

export default SalesSummaryCard
