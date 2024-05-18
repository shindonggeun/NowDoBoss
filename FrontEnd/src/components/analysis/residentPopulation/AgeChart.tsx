import { useEffect } from 'react'
import analysisStore from '@src/stores/analysisStore'
import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import ComboChart from '@src/common/ComboChart'
import * as r from '@src/components/styles/analysis/ResidentPopulationAnalysisStyle'

const AgeChart = () => {
  const residentPopulationDataBody = analysisStore(
    state => state.residentPopulationDataBody,
  )
  const setResidentSummary = useAnalysisSummaryStore(
    state => state.setResidentSummary,
  )

  const labels: string[] = ['10대', '20대', '30대', '40대', '50대', '60대 이상']
  const allValues: number[] = Object.values(
    residentPopulationDataBody.populationInfo,
  )

  const totalPopulation: number = allValues[0] // 총 상주인구 수
  const ageGroupPopulations: number[] = allValues.slice(1) // 연령대별 상주인구 수
  const ageGroupProportions: number[] = ageGroupPopulations.map(
    population => Math.round((population / totalPopulation) * 100 * 100) / 100,
  ) // 연령대별 상주인구 비율

  // 가장 높은 값 찾기
  const maxValue: number = Math.max(...ageGroupPopulations)
  // 해당 인덱스를 사용하여 라벨 찾기
  const maxLabel: string = labels[ageGroupPopulations.indexOf(maxValue)]

  // 요약 상태 업데이트
  useEffect(() => {
    setResidentSummary('age', maxLabel)
  }, [residentPopulationDataBody, maxLabel, setResidentSummary])

  return (
    <r.AgeChart>
      <r.ChartTitle>연령대별 상주인구</r.ChartTitle>
      <r.ChartSubTitle>
        <r.HighlightText>{maxLabel}</r.HighlightText>
        상주인구 비율이 가장 높아요.
      </r.ChartSubTitle>
      <ComboChart
        labels={labels}
        value1={ageGroupPopulations}
        value2={ageGroupProportions}
      />
    </r.AgeChart>
  )
}

export default AgeChart
