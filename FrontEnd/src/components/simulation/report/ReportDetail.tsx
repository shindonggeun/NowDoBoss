import * as c from '@src/components/styles/simulation/ReportDetailStyle'
import LightIcon from '@src/assets/lightBulbIcon.svg'
import useSimulationStore from '@src/stores/simulationStore'
import { SimulationReportType } from '@src/types/SimulationType'

const ReportDetail = ({ ReportData }: { ReportData: SimulationReportType }) => {
  const { isFranchise } = useSimulationStore()
  type DetailType = {
    name: string
    detail: string
  }
  // 단위면적당 임대료 계산
  const rentPriceCalcul = Math.floor(
    ReportData.detail.rentPrice / 3.3,
  ).toLocaleString()

  const DetailInfos: DetailType[] = [
    {
      name: '첫 월 임대료',
      detail: `단위면적(3.3㎡)당 ${rentPriceCalcul}원`,
    },
    { name: '보증금', detail: '월 임대료 * 10개월' },
    { name: '인테리어 비용', detail: '단위면적(3.3㎡)당 인테리어 비용' },
  ]

  const FranchiseInfo = {
    name: '가맹 사업자 부담금',
    detail: '가입비+교육비+가맹보증금 등',
  }

  const DetailPrices: (number | null)[] = [
    ReportData.detail.rentPrice,
    ReportData.detail.deposit,
    ReportData.detail.interior,
    ReportData.detail.levy,
  ]

  const formattedPrices = DetailPrices.map(price => {
    if (price !== null) {
      if (price > 10000) {
        const billions = Math.floor(price / 10000)
        const millions = Math.floor(price % 10000)
        return `${billions}억 ${millions.toLocaleString()} '만원'}`
      }
      return `${price.toLocaleString()} ${price === 0 ? '원' : '만원'}`
    }
    return null
  })

  return (
    <>
      <c.SummaryHeader>
        <c.LightIcon src={LightIcon} alt="close" />

        <c.HighLight>예상비용 상세</c.HighLight>
        <c.SummarySubTitle>아래의 비용들을 더해 계산했어요</c.SummarySubTitle>
      </c.SummaryHeader>
      {DetailInfos.map((detailInfo: DetailType, i) => (
        <c.Body key={detailInfo.name}>
          <c.BodyText>
            <c.TextTitle>{detailInfo.name}</c.TextTitle>
            <c.TextSubtitle>{detailInfo.detail}</c.TextSubtitle>
          </c.BodyText>
          <c.TextPrice>{formattedPrices[i]}</c.TextPrice>
        </c.Body>
      ))}
      {isFranchise ? (
        <c.Body>
          <c.BodyText>
            <c.TextTitle>{FranchiseInfo.name}</c.TextTitle>
            <c.TextSubtitle>{FranchiseInfo.detail}</c.TextSubtitle>
          </c.BodyText>
          <c.TextPrice>{formattedPrices[3]}</c.TextPrice>
        </c.Body>
      ) : null}
    </>
  )
}

export default ReportDetail
