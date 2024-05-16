import * as c from '@src/components/styles/simulation/CompareModalStyle'
import { SimulationReportType } from '@src/types/SimulationType'
import TotalPriceIcon from '@src/assets/TotalPrice.svg'
import Woman from '@src/assets/WomanSimple.svg'
import Man from '@src/assets/ManSimple.svg'
import Age from '@src/assets/AgeSimple.svg'
import Month from '@src/assets/MonthSimple.svg'

const CompareList = ({
  ReportData,
  title,
}: {
  ReportData: SimulationReportType
  title: boolean
}) => {
  let TotalNumber
  if (ReportData.totalPrice >= 10000) {
    const billions = Math.floor(ReportData.totalPrice / 10000)
    const millions = Math.floor(ReportData.totalPrice % 10000)
    TotalNumber = `${billions}억 ${millions.toLocaleString()} 만원`
  } else {
    TotalNumber = `${ReportData.totalPrice.toLocaleString()} 만원`
  }
  return (
    <c.ListContainer>
      {title && (
        <c.BodyContainerTitle top={0} min={0}>
          전체 창업 비용
        </c.BodyContainerTitle>
      )}
      <c.ContainerBox height={40} min={40} />
      <c.Icon src={TotalPriceIcon} width={40} />
      <c.TotalPrice>{TotalNumber}</c.TotalPrice>

      {title && (
        <c.BodyContainerTitle top={140} min={135}>
          상세 비용
        </c.BodyContainerTitle>
      )}
      <c.ContainerBox height={50} min={50} />
      <c.BodyContainerSubText>임대료</c.BodyContainerSubText>
      <c.BodyContainerText>
        {ReportData.detail.rentPrice.toLocaleString()} 만원
      </c.BodyContainerText>
      <c.BodyContainerSubText>보증금</c.BodyContainerSubText>
      <c.BodyContainerText>
        {ReportData.detail.deposit.toLocaleString()} 만원
      </c.BodyContainerText>
      <c.BodyContainerSubText>인테리어 비용</c.BodyContainerSubText>
      <c.BodyContainerText>
        {ReportData.detail.interior.toLocaleString()} 만원
      </c.BodyContainerText>
      <c.BodyContainerSubText>가맹 사업자 부담금</c.BodyContainerSubText>
      <c.BodyContainerText>
        {ReportData.detail.levy !== null
          ? `${ReportData.detail.levy.toLocaleString()} 만원`
          : '없음'}
      </c.BodyContainerText>
      <c.BodyContainerSubText>권리금</c.BodyContainerSubText>
      <c.BodyContainerText>
        {ReportData.keyMoneyInfo.keyMoney.toLocaleString()} 만원
      </c.BodyContainerText>

      {title && (
        <c.BodyContainerTitle top={490} min={440}>
          연령대별, 남여별 분석
        </c.BodyContainerTitle>
      )}
      <c.ContainerBox height={60} min={55} />
      <c.BodyContainerSubText>유동인구 많은 성별</c.BodyContainerSubText>
      {ReportData.genderAndAgeAnalysisInfo.femaleSalesPercent >
      ReportData.genderAndAgeAnalysisInfo.maleSalesPercent ? (
        <c.Icon src={Woman} width={38} />
      ) : (
        <c.Icon src={Man} width={32} />
      )}
      {ReportData.genderAndAgeAnalysisInfo.femaleSalesPercent >
      ReportData.genderAndAgeAnalysisInfo.maleSalesPercent ? (
        <c.BodyContainerText>
          {ReportData.genderAndAgeAnalysisInfo.femaleSalesPercent.toFixed(2)}%
        </c.BodyContainerText>
      ) : (
        <c.BodyContainerText>
          {ReportData.genderAndAgeAnalysisInfo.maleSalesPercent.toFixed(2)}%
        </c.BodyContainerText>
      )}
      <c.BodyContainerSubText>유동인구 많은 연령대</c.BodyContainerSubText>
      <c.Icon src={Age} width={60} />
      <c.BodyContainerText>
        {ReportData.genderAndAgeAnalysisInfo.first.name}
      </c.BodyContainerText>

      {title && (
        <c.BodyContainerTitle top={830} min={755}>
          성수기 비수기
        </c.BodyContainerTitle>
      )}
      <c.ContainerBox height={55} min={50} />
      <c.Icon src={Month} width={50} />
      <c.BodyContainerSubText>성수기</c.BodyContainerSubText>
      <c.BodyContainerText>
        {ReportData.monthAnalysisInfo.peakSeasons.join(',')} 월
      </c.BodyContainerText>
      <c.BodyContainerSubText>비수기</c.BodyContainerSubText>
      <c.BodyContainerText>
        {ReportData.monthAnalysisInfo.offPeakSeasons.join(',')} 월
      </c.BodyContainerText>

      {title && (
        <c.BodyContainerTitle top={1060} min={960}>
          유사한 프렌차이즈 추천
        </c.BodyContainerTitle>
      )}
      <c.ContainerBox height={60} min={55} />
      {ReportData.franchisees.map((franchise, i) => {
        let formattedNumber
        if (franchise.totalPrice >= 10000) {
          const billions = Math.floor(franchise.totalPrice / 10000)
          const millions = Math.floor(franchise.totalPrice % 10000)
          formattedNumber = `${billions}억 ${millions.toLocaleString()} 만원`
        } else {
          formattedNumber = `${franchise.totalPrice.toLocaleString()} 만원`
        }

        return (
          <div key={i}>
            <c.BodyContainerSubText>추천 {i + 1}</c.BodyContainerSubText>
            <c.FranchiseTitle>{franchise.brandName}</c.FranchiseTitle>
            <c.BodyContainerText>{formattedNumber}</c.BodyContainerText>
          </div>
        )
      })}
      <c.ContainerBox height={40} min={40} />
    </c.ListContainer>
  )
}

export default CompareList
