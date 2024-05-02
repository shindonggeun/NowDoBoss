import * as c from '@src/containers/status/ReportStyle'
import LightIcon from '@src/assets/lightBulbIcon.svg'

const reportSummary = () => {
  return (
    <c.Container>
      <c.SummaryContainer>
        <c.SummaryHeader>
          <c.LightIcon src={LightIcon} alt="close" />
          <c.HighLight>핵심 요약 분석</c.HighLight>
        </c.SummaryHeader>
        <c.SummaryBody>
          <c.BodyTop>
            <c.BodyTopTitle>5,456만원</c.BodyTopTitle>
            <c.BodyTopSubTitle>
              주변상권 및 업종을 반영하여 계산한 비용으로 실제와 다를 수
              있습니다.
            </c.BodyTopSubTitle>
          </c.BodyTop>
          <c.SplitLine />
          <c.BodyBottom>
            <c.BodyBottomLeft>
              <c.BottomText>지역</c.BottomText>
              <c.BottomText>업종</c.BottomText>
              <c.BottomText>면적</c.BottomText>
              <c.BottomText>층</c.BottomText>
            </c.BodyBottomLeft>
            <c.BodyBottomRight>
              <c.BottomText>종로구 부암동</c.BottomText>
              <c.BottomText>베이커리</c.BottomText>
              <c.BottomText>중형(47)</c.BottomText>
              <c.BottomText>1층</c.BottomText>
            </c.BodyBottomRight>
          </c.BodyBottom>
        </c.SummaryBody>
      </c.SummaryContainer>
    </c.Container>
  )
}

export default reportSummary
