import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import { SimulationReportType } from '@src/types/SimulationType'
import Check from '@src/assets/circle_check_icon.svg'
import Search from '@src/assets/search_icon.svg'
import ContainerBox from '@src/common/ContainerBox'

const ReportFranchise = ({
  ReportData,
}: {
  ReportData: SimulationReportType
}) => {
  const MyTotalPrice = ReportData.totalPrice

  return (
    <c.Container>
      <c.FranchiseTitleContainer>
        <c.Title>프렌차이즈 창업비용 비교 </c.Title>
        <c.SearchIcon src={Search} alt="SearchIcon" />
      </c.FranchiseTitleContainer>
      <c.SubTitle>
        현재 카테고리에서 유사한 비용의 프렌차이즈 정보들을 가져왔어요.
      </c.SubTitle>
      <ContainerBox height={40} />
      {ReportData.franchisees.map((franchise, i) => {
        let formattedNumber
        if (franchise.totalPrice >= 10000) {
          const billions = Math.floor(franchise.totalPrice / 10000)
          const millions = Math.floor(franchise.totalPrice % 10000)
          formattedNumber = `${billions}억 ${millions.toLocaleString()} 만원`
        } else {
          formattedNumber = `${franchise.totalPrice.toLocaleString()} ${franchise.totalPrice === 0 ? '원' : '만원'}`
        }

        const isUp = MyTotalPrice - franchise.totalPrice > 0
        const isSame = MyTotalPrice - franchise.totalPrice === 0
        const ComparePrice = isUp
          ? (MyTotalPrice - franchise.totalPrice).toLocaleString()
          : (franchise.totalPrice - MyTotalPrice).toLocaleString()

        let CompareData: string = isUp ? '더 낮아요' : '더 높아요'
        if (MyTotalPrice - franchise.totalPrice === 0) {
          CompareData = '비슷한 가격이에요'
        }
        const Infos = [
          { name: '가입비', price: franchise.subscription },
          { name: '보증금', price: franchise.deposit },
          { name: '교육비', price: franchise.education },
          { name: '인테리어 비용', price: franchise.interior },
          { name: '기타비용', price: franchise.etc },
        ]
        return (
          <div key={franchise.brandName}>
            <c.FranchiseHeader>
              <c.FranchiseHeaderLeft>
                <c.FranchiseTitleContainer>
                  <c.CheckedIcon src={Check} alt="check" />
                  <c.FranchiseHeaderTitle>
                    {franchise.brandName}
                  </c.FranchiseHeaderTitle>
                </c.FranchiseTitleContainer>
                <c.FranchiseHeaderSubTitle>
                  예상 창업비용 계산 (임대료 및 보증금 포함)
                </c.FranchiseHeaderSubTitle>
              </c.FranchiseHeaderLeft>
              <c.FranchiseHeaderRight>
                <c.FranchiseTotalPrice>{formattedNumber}</c.FranchiseTotalPrice>
                <c.FranchiseSubPrice>
                  {isSame ? '' : `${ComparePrice}만원`} {CompareData}
                </c.FranchiseSubPrice>
              </c.FranchiseHeaderRight>
            </c.FranchiseHeader>
            <c.FranchiseContainer>
              {Infos.map((info, index) => (
                <c.FranchiseBox key={index}>
                  <div>{info.name}</div>
                  <c.FranchiseDetailPrice>
                    {info.price.toLocaleString()}
                    {info.price === 0 ? '원' : '만원'}
                  </c.FranchiseDetailPrice>
                </c.FranchiseBox>
              ))}
            </c.FranchiseContainer>
            {i !== ReportData.franchisees.length - 1 && <c.SeparateLine />}
          </div>
        )
      })}
    </c.Container>
  )
}

export default ReportFranchise
