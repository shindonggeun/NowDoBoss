import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import Woman from '@src/assets/womanIcon.svg'
import Man from '@src/assets/manIcon.svg'
import { SimulationReportType } from '@src/types/SimulationType'

const ReportGender = ({ ReportData }: { ReportData: SimulationReportType }) => {
  const GendarAndAgeDInfo = ReportData.genderAndAgeAnalysisInfo
  // const AgeInfos = {
  //   first: Math.floor(GendarAndAgeDInfo.second.sales / 10000),
  //   second: Math.floor(GendarAndAgeDInfo.second.sales / 10000),
  //   third: Math.floor(GendarAndAgeDInfo.second.sales / 10000),
  // }

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
        베이커리는 <c.Emphasis>{GendarAndAgeDInfo.first.name}</c.Emphasis>와
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
            {AgeInfos.map(info => (
              <c.AgeDetail key={info.rank}>
                <div>{info.data}억</div>
                <c.AgeBar rank={info.rank} data={info.data} />
                <div>{info.name}</div>
              </c.AgeDetail>
            ))}
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
