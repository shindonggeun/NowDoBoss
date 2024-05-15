import analysisStore from '@src/stores/analysisStore'
import DoughnutChart from '@src/common/DoughnutChart'
import * as r from '@src/components/styles/analysis/ResidentPopulationAnalysisStyle'

const GenderChart = () => {
  const { residentPopulationDataBody } = analysisStore()

  const { malePercentage } = residentPopulationDataBody
  const { femalePercentage } = residentPopulationDataBody
  const totalResidentPopulation =
    residentPopulationDataBody.populationInfo.totalPopulation.toLocaleString(
      'ko-KR',
    )

  const labels: string[] = ['남성', '여성']
  const value: number[] = [malePercentage, femalePercentage]
  const textCenter = `총 상주인구 수 : ${totalResidentPopulation}명`

  const maxValue = Math.max(malePercentage, femalePercentage)
  const minValue = Math.min(malePercentage, femalePercentage)
  const ratio = (maxValue / minValue).toFixed(1)
  const maxLabel = labels[value.indexOf(maxValue)]
  const minLabel = labels[value.indexOf(minValue)]

  return (
    <r.GenderChart>
      <r.ChartTitle>남/녀 상주인구</r.ChartTitle>
      <r.ChartSubTitle>
        {minLabel}의 상주인구가 {maxLabel}보다 약{' '}
        <r.HighlightText>{ratio}배</r.HighlightText> 더 많아요.
      </r.ChartSubTitle>
      <DoughnutChart labels={labels} value={value} textCenter={textCenter} />
    </r.GenderChart>
  )
}

export default GenderChart
