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
        현재 창업비용과 유사한 프렌차이즈 정보들을 가져왔어요.
      </c.SubTitle>
      <ContainerBox height={40} />
      {ReportData.franchisees.map((franchise, i) => {
        let formattedNumber
        if (franchise.totalPrice >= 100000000) {
          const billions = Math.floor(franchise.totalPrice / 100000000)
          const millions = Math.floor(
            (franchise.totalPrice % 100000000) / 10000,
          )
          formattedNumber = `${billions}억 ${millions.toFixed(0)} 만원`
        } else {
          formattedNumber = `${(MyTotalPrice / 10000).toFixed(0)} 만원`
        }
        const ComparePrice = Math.floor(
          franchise.totalPrice / 10000,
        ).toLocaleString()
        const CompareData: string =
          MyTotalPrice - franchise.totalPrice >= 0 ? '더 낮아요' : '더 높아요'
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
                  {ComparePrice}만원 {CompareData}
                </c.FranchiseSubPrice>
              </c.FranchiseHeaderRight>
            </c.FranchiseHeader>
            <c.FranchiseContainer>
              {Infos.map((info, index) => (
                <c.FranchiseBox key={index}>
                  <div>{info.name}</div>
                  <c.FranchiseDetailPrice>
                    {info.price}원
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
