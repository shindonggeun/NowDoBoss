import * as c from '@src/containers/simulation/ReportStyle'
import LightIcon from '@src/assets/lightBulbIcon.svg'
import { SimulationReportType } from '@src/types/SimulationType'

const reportSummary = ({
  ReportData,
}: {
  ReportData: SimulationReportType
}) => {
  const TotalPrice = ReportData.totalPrice
  const isFranchise = ReportData.request.isFranchisee
  const { brandName } = ReportData.request
  const subCategoryName = ReportData.request.serviceCodeName
  const bulidingSize = ReportData.request.storeSize
  const { floor } = ReportData.request
  const { gugun } = ReportData.request

  let formattedNumber
  if (TotalPrice >= 10000) {
    const billions = Math.floor(TotalPrice / 10000)
    const millions = Math.floor(TotalPrice % 10000)
    formattedNumber = `${billions}억 ${millions.toLocaleString()} 만원`
  } else {
    formattedNumber = `${TotalPrice.toLocaleString()} 만원`
  }

  return (
    <c.Container>
      <c.SummaryContainer>
        <c.SummaryHeader>
          <c.LightIcon src={LightIcon} alt="close" />
          <c.HighLight>핵심 요약 분석</c.HighLight>
        </c.SummaryHeader>
        <c.SummaryBody>
          <c.BodyTop>
            <c.BodyTopTitle>{formattedNumber}</c.BodyTopTitle>
            <c.BodyTopSubTitle>
              주변상권 및 업종을 반영하여 계산한 비용으로 실제와 다를 수
              있습니다.
            </c.BodyTopSubTitle>
          </c.BodyTop>
          <c.SplitLine />
          <c.BodyBottom>
            <c.BodyBottomLeft>
              {isFranchise ? <c.BottomText>이름</c.BottomText> : null}
              {['지역', '업종', '면적', '층'].map(data => (
                <c.BottomText key={data}>{data}</c.BottomText>
              ))}
            </c.BodyBottomLeft>
            <c.BodyBottomRight>
              {isFranchise ? <c.BottomText>{brandName}</c.BottomText> : null}
              <c.BottomText>{gugun}</c.BottomText>
              <c.BottomText>{subCategoryName}</c.BottomText>
              <c.BottomText>{bulidingSize}㎡</c.BottomText>
              <c.BottomText>{floor}</c.BottomText>
            </c.BodyBottomRight>
          </c.BodyBottom>
        </c.SummaryBody>
      </c.SummaryContainer>
    </c.Container>
  )
}

export default reportSummary
