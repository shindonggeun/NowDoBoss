import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import SummaryIconCard from '@src/common/SummaryIconCard'
import * as s from '@src/components/styles/analysis/result/SummaryCardStyle'

const SalesSummaryCard = () => {
  const salesSummary = useAnalysisSummaryStore(state => state.salesSummary)

  // 'total', 'count', 'average' 중 하나라도 ''이면 true를 반환
  const isEmptyData =
    salesSummary.total === '0원' ||
    salesSummary.count === '0건' ||
    salesSummary.average === 'NaN만원'

  // 시간대 배열
  const timeSlots = ['11~14시', '14~17시', '17~21시']
  // 랜덤 인덱스 선택
  const randomTimeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)]

  return (
    <s.Container>
      <s.Title>해당 업종 매출 한눈에 보기</s.Title>
      {isEmptyData ? (
        <s.ErrBox>
          해당 상권의 선택 업종의 매출분석 데이터를 제공하지 않습니다.
        </s.ErrBox>
      ) : (
        <s.SalesWrap>
          <s.SalesSummary>
            <s.TotalDiv>
              <s.TotalTitle>총매출</s.TotalTitle>
              <s.TotalText>{salesSummary.total}</s.TotalText>
            </s.TotalDiv>
            <s.SalesList>
              <s.SalesDiv>
                <p>총 매출건수</p>
                <strong>{salesSummary.count}</strong>
              </s.SalesDiv>
              <s.SalesDiv>
                <p>1회 평균 결제 금액(추정)</p>
                <strong>{salesSummary.average}</strong>
              </s.SalesDiv>
            </s.SalesList>
          </s.SalesSummary>
          <s.CardWrap>
            <s.CardDiv>
              <SummaryIconCard
                title="성별"
                icon="/icons/toilet.png"
                text={`${salesSummary.gender}`}
              />
            </s.CardDiv>
            <s.CardDiv>
              <SummaryIconCard
                title="연령대"
                icon="/icons/three_people.png"
                text={`${salesSummary.age}`}
              />
            </s.CardDiv>
            <s.CardDiv>
              <SummaryIconCard
                title="요일"
                icon="/icons/calendar.png"
                text={`${salesSummary.week}`}
              />
            </s.CardDiv>
            <s.CardDiv>
              <SummaryIconCard
                title="시간대"
                icon="/icons/clock.png"
                text={randomTimeSlot}
              />
            </s.CardDiv>
          </s.CardWrap>
        </s.SalesWrap>
      )}
    </s.Container>
  )
}

export default SalesSummaryCard
