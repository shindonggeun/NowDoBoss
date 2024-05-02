import * as c from '@src/components/styles/simulation/ReportDetailStyle'
import LightIcon from '@src/assets/lightBulbIcon.svg'

const ReportDetail = () => {
  type DetailType = {
    name: string
    detail: string
  }
  const DetailInfos: DetailType[] = [
    { name: '첫 월 임대료', detail: '단위면적(3.3㎡)당 ???원' },
    { name: '보증금', detail: '월 임대료 * 10개월' },
    { name: '인테리어 비용', detail: '단위면적(3.3㎡)당 인테리어 비용' },
  ]

  const DetailPrices: number[] = [123, 235, 1322]

  return (
    <>
      <c.SummaryHeader>
        <c.LightIcon src={LightIcon} alt="close" />

        <c.HighLight>예상비용 상세</c.HighLight>
        <c.SummarySubTitle>아래의 비용들을 더해 계산했어요</c.SummarySubTitle>
      </c.SummaryHeader>
      {DetailInfos.map((detailInfo: DetailType, i) => (
        <c.Body>
          <c.BodyText>
            <c.TextTitle>{detailInfo.name}</c.TextTitle>
            <c.TextSubtitle>{detailInfo.detail}</c.TextSubtitle>
          </c.BodyText>
          <c.TextPrice>{DetailPrices[i].toLocaleString()}만원</c.TextPrice>
        </c.Body>
      ))}
    </>
  )
}

export default ReportDetail
