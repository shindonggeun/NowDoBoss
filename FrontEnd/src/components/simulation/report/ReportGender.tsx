import * as c from '@src/components/styles/simulation/ReportGenderStyle'
import Woman from '@src/assets/womanIcon.svg'
import Man from '@src/assets/manIcon.svg'

const ReportGender = () => {
  interface AnalysisInfotype {
    maleSalesPercent: number
    femaleSalesPercent: number
    first: string
    second: string
    third: string
  }

  const genderAndAgeAnalysisInfo: AnalysisInfotype = {
    maleSalesPercent: 40.677364,
    femaleSalesPercent: 59.32263,
    first: '30대',
    second: '20대',
    third: '40대',
  }

  return (
    <c.Container>
      <c.Title>고객남여, 연령대별 분석</c.Title>
      <c.SubTitle>
        베이커리는 <c.Emphasis>{genderAndAgeAnalysisInfo.first}</c.Emphasis>와
        <c.Emphasis>
          {genderAndAgeAnalysisInfo.maleSalesPercent >
          genderAndAgeAnalysisInfo.femaleSalesPercent
            ? ' 남성'
            : ' 여성'}
        </c.Emphasis>
        에게 가장 인기가 많아요
      </c.SubTitle>
      <c.GraphContainer>
        <c.AgeContainer>연령대별 그래프</c.AgeContainer>
        <c.GenderContainer>
          <c.GenderDetail>
            <c.GenderPercent>
              {genderAndAgeAnalysisInfo.femaleSalesPercent.toFixed(1)}%
            </c.GenderPercent>
            <c.GenderImg
              src={Woman}
              alt="woman"
              size={genderAndAgeAnalysisInfo.femaleSalesPercent / 6}
            />
            <c.GenderText>여성</c.GenderText>
          </c.GenderDetail>
          <c.GenderDetail>
            <c.GenderPercent>
              {genderAndAgeAnalysisInfo.maleSalesPercent.toFixed(1)}%
            </c.GenderPercent>
            <c.GenderImg
              src={Man}
              alt="man"
              size={genderAndAgeAnalysisInfo.maleSalesPercent / 6}
            />
            <c.GenderText>남성</c.GenderText>
          </c.GenderDetail>
        </c.GenderContainer>
      </c.GraphContainer>
    </c.Container>
  )
}

export default ReportGender
