import { useEffect } from 'react'
import analysisStore from '@src/stores/analysisStore'
import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import DoughnutChart from '@src/common/DoughnutChart'
import * as r from '@src/components/styles/analysis/result/ResidentPopulationAnalysisStyle'

const GenderChart = () => {
  const residentPopulationDataBody = analysisStore(
    state => state.residentPopulationDataBody,
  )
  const setResidentSummary = useAnalysisSummaryStore(
    state => state.setResidentSummary,
  )

  const { malePercentage } = residentPopulationDataBody
  const { femalePercentage } = residentPopulationDataBody
  const totalResidentPopulation =
    residentPopulationDataBody.populationInfo.totalPopulation.toLocaleString(
      'ko-KR',
    )

  const labels: string[] = ['남성', '여성']
  const value: number[] = [malePercentage, femalePercentage]
  const textCenter = `${totalResidentPopulation}명`
  const subTextCenter = '총 상주인구 수'

  const maxValue = Math.max(malePercentage, femalePercentage)
  const minValue = Math.min(malePercentage, femalePercentage)
  const ratio = (maxValue / minValue).toFixed(1)
  const maxLabel = labels[value.indexOf(maxValue)]
  const minLabel = labels[value.indexOf(minValue)]

  // 요약 상태 업데이트
  useEffect(() => {
    setResidentSummary('gender', maxLabel)
  }, [residentPopulationDataBody, maxLabel, setResidentSummary])

  return (
    <r.Chart>
      <r.ChartTitle>남/녀 상주인구</r.ChartTitle>
      <r.ChartSubTitle>
        {maxLabel}의 상주인구가 {minLabel}보다 약{' '}
        <r.HighlightText>{ratio}배</r.HighlightText> 더 많아요.
      </r.ChartSubTitle>
      <DoughnutChart
        labels={labels}
        value={value}
        textCenter={textCenter}
        subTextCenter={subTextCenter}
      />
    </r.Chart>
  )
}

export default GenderChart
