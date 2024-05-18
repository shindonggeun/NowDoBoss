import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import Woman from '@src/assets/womanIcon.svg'
import Man from '@src/assets/manIcon.svg'
import { SimulationReportType } from '@src/types/SimulationType'
import TripleBar from '@src/common/TripleBarChart'

const ReportGender = ({ ReportData }: { ReportData: SimulationReportType }) => {
  const GendarAndAgeDInfo = ReportData.genderAndAgeAnalysisInfo

  const Category = ReportData.request.serviceCodeName
  const AgeInfos = [
    {
      rank: 'second',
      data: Math.floor(GendarAndAgeDInfo.second.sales / 10000),
      name: GendarAndAgeDInfo.second.name,
    },
    {
      rank: 'first',
      data: Math.floor(GendarAndAgeDInfo.first.sales / 10000),
      name: GendarAndAgeDInfo.first.name,
    },
    {
      rank: 'third',
      data: Math.floor(GendarAndAgeDInfo.third.sales / 10000),
      name: GendarAndAgeDInfo.third.name,
    },
  ]

  return (
    <c.Container>
      <c.Title>고객남여, 연령대별 분석</c.Title>
      <c.SubTitle>
        {Category}는 <c.Emphasis>{GendarAndAgeDInfo.first.name}</c.Emphasis>와
        <c.Emphasis>
          {GendarAndAgeDInfo.maleSalesPercent >
          GendarAndAgeDInfo.femaleSalesPercent
            ? ' 남성'
            : ' 여성'}
        </c.Emphasis>
        에게 가장 인기가 많아요
      </c.SubTitle>
      <c.GraphContainer>
        <c.AgeContainer>
          <c.AgeWrapper>
            <TripleBar
              labels={AgeInfos.map(info => info.name)}
              infos={['2위', '1위', '3위']}
              values={AgeInfos.map(info => info.data)}
              dataLavel="인구(명)"
            />
          </c.AgeWrapper>
        </c.AgeContainer>
        <c.GenderContainer>
          <c.GenderDetail>
            <c.GenderPercent>
              {GendarAndAgeDInfo.femaleSalesPercent.toFixed(1)}%
            </c.GenderPercent>
            <c.GenderImg
              src={Woman}
              alt="woman"
              size={GendarAndAgeDInfo.femaleSalesPercent / 6}
            />
            <c.GenderText>여성</c.GenderText>
          </c.GenderDetail>
          <c.GenderDetail>
            <c.GenderPercent>
              {GendarAndAgeDInfo.maleSalesPercent.toFixed(1)}%
            </c.GenderPercent>
            <c.GenderImg
              src={Man}
              alt="man"
              size={GendarAndAgeDInfo.maleSalesPercent / 6}
            />
            <c.GenderText>남성</c.GenderText>
          </c.GenderDetail>
        </c.GenderContainer>
      </c.GraphContainer>
    </c.Container>
  )
}

export default ReportGender
