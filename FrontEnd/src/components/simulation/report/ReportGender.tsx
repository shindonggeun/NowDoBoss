import * as c from '@src/components/styles/simulation/ReportAnalysisStyle'
import Woman from '@src/assets/womanIcon.svg'
import Man from '@src/assets/manIcon.svg'
import { SimulationReportType } from '@src/types/SimulationType'

const ReportGender = ({ ReportData }: { ReportData: SimulationReportType }) => {
  const GendarAndAgeDInfo = ReportData.genderAndAgeAnalysisInfo

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
            <c.AgeDetail>
              <div>
                {Math.floor(GendarAndAgeDInfo.second.sales / 100000000)}억
              </div>
              <c.AgeBar rank="second" />
              <div>{GendarAndAgeDInfo.second.name}</div>
            </c.AgeDetail>
            <c.AgeDetail>
              <div>
                {Math.floor(GendarAndAgeDInfo.first.sales / 100000000)}억
              </div>
              <c.AgeBar rank="first" />
              <div>{GendarAndAgeDInfo.first.name}</div>
            </c.AgeDetail>
            <c.AgeDetail>
              <div>
                {Math.floor(GendarAndAgeDInfo.third.sales / 100000000)}억
              </div>
              <c.AgeBar rank="third" />
              <div>{GendarAndAgeDInfo.third.name}</div>
            </c.AgeDetail>
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
