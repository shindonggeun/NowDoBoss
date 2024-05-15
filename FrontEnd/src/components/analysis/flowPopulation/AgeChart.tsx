import analysisStore from '@src/stores/analysisStore'
import RadarChart from '@src/common/RadarChart'
import * as f from '@src/components/styles/analysis/FlowPopulationAnalysisStyle'

const AgeChart = () => {
  const flowPopulationDataBody = analysisStore(
    state => state.flowPopulationDataBody,
  )

  const labels: string[] = ['10대', '20대', '30대', '40대', '50대', '60대 이상']

  const maleValues: number[] = [
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .maleTeenFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .maleTwentyFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .maleThirtyFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .maleFortyFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .maleFiftyFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .maleSixtyFootTrafficPercent,
  ]

  const femaleValues: number[] = [
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .femaleTeenFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .femaleTwentyFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .femaleThirtyFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .femaleFortyFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .femaleFiftyFootTrafficPercent,
    flowPopulationDataBody.ageGenderPercentFootTraffic
      .femaleSixtyFootTrafficPercent,
  ]

  // 가장 높은 값 찾기
  const maxMaleValue = Math.max(...maleValues)
  const maxFemaleValue = Math.max(...femaleValues)

  // 해당 인덱스를 사용하여 라벨 찾기
  const maxMaleLabel: string = labels[maleValues.indexOf(maxMaleValue)]
  const maxFemaleLabel: string = labels[femaleValues.indexOf(maxFemaleValue)]

  const maxGender = maxMaleValue > maxFemaleValue ? '남성' : '여성'
  const maxLabel = maxMaleValue > maxFemaleValue ? maxMaleLabel : maxFemaleLabel

  return (
    <f.AgeChart>
      <f.ChartTitle>연령별 유동인구</f.ChartTitle>
      <f.ChartSubTitle>
        <f.HighlightText>
          {maxLabel} {maxGender}
        </f.HighlightText>{' '}
        유동인구가 가장 높아요.
      </f.ChartSubTitle>
      <RadarChart labels={labels} value1={maleValues} value2={femaleValues} />
    </f.AgeChart>
  )
}

export default AgeChart
