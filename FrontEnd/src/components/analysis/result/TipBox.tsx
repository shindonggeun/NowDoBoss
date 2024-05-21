import styled from 'styled-components'
import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 2% 6% 2% 12%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 5px;
  font-size: 15px;
  color: #333;
  background-color: #fff;

  img {
    position: absolute;
    top: 5%;
    left: 4%;
    width: 25px;
    height: 25px;
  }
`

const TipBox = () => {
  const flowSummary = useAnalysisSummaryStore(state => state.flowSummary)

  let tip
  switch (flowSummary.age) {
    case '10대':
      tip =
        '해당 상권의 유동인구는 10대가 많아 최신 트렌드와 SNS 마케팅을 활용해 젊은 고객들의 관심을 끄는 것이 중요해요.'
      break
    case '20대':
      tip =
        '해당 상권의 유동인구는 20대가 많아 창의적이고 개성 있는 상품이나 서비스를 제공하여 젊은 층의 호기심과 구매욕구를 자극해 보세요.'
      break
    case '30대':
      tip =
        '해당 상권의 유동인구는 30대가 많아 다양한 라이프스타일을 반영한 맞춤형 서비스나 제품을 제공할 필요가 있어요.'
      break
    case '40대':
      tip =
        '해당 상권의 유동인구는 40대가 많아 가족 단위 고객을 위한 편의성과 안전성을 고려한 서비스가 중요해요.'
      break
    case '50대':
      tip =
        '해당 상권의 유동인구는 50대가 많으므로 건강, 여가, 취미 생활과 관련된 상품이나 서비스로 관심을 끌어보세요.'
      break
    case '60대 이상':
      tip =
        '해당 상권의 유동인구는 60대 이상이 많아 편안함과 접근성을 고려한 제품이나 서비스 제공이 중요해요.'
      break
    default:
      tip = ''
  }

  return (
    <Container>
      <div>
        <img src="/icons/check.png" alt="check" />
      </div>
      <div>{tip}</div>
    </Container>
  )
}

export default TipBox
