import { useEffect } from 'react'
import analysisStore from '@src/stores/analysisStore'
import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import RadarChart from '@src/common/RadarChart'
import * as s from '@src/components/styles/analysis/result/SalesAnalysisStyle'

const AgeChart = () => {
  const salesDataBody = analysisStore(state => state.salesDataBody)
  const setSalesSummary = useAnalysisSummaryStore(
    state => state.setSalesSummary,
  )
  const labels: string[] = ['10대', '20대', '30대', '40대', '50대', '60대 이상']

  const maleValues: number[] = [
    salesDataBody.ageGenderPercentSales.maleTeenSalesPercent,
    salesDataBody.ageGenderPercentSales.maleTwentySalesPercent,
    salesDataBody.ageGenderPercentSales.maleThirtySalesPercent,
    salesDataBody.ageGenderPercentSales.maleFortySalesPercent,
    salesDataBody.ageGenderPercentSales.maleFiftySalesPercent,
    salesDataBody.ageGenderPercentSales.maleSixtySalesPercent,
  ]

  const femaleValues: number[] = [
    salesDataBody.ageGenderPercentSales.femaleTeenSalesPercent,
    salesDataBody.ageGenderPercentSales.femaleTwentySalesPercent,
    salesDataBody.ageGenderPercentSales.femaleThirtySalesPercent,
    salesDataBody.ageGenderPercentSales.femaleFortySalesPercent,
    salesDataBody.ageGenderPercentSales.femaleFiftySalesPercent,
    salesDataBody.ageGenderPercentSales.femaleSixtySalesPercent,
  ]

  // 가장 높은 값 찾기
  const maxMaleValue = Math.max(...maleValues)
  const maxFemaleValue = Math.max(...femaleValues)

  // 해당 인덱스를 사용하여 라벨 찾기
  const maxMaleLabel: string = labels[maleValues.indexOf(maxMaleValue)]
  const maxFemaleLabel: string = labels[femaleValues.indexOf(maxFemaleValue)]

  const maxGender = maxMaleValue > maxFemaleValue ? '남성' : '여성'
  const maxLabel = maxMaleValue > maxFemaleValue ? maxMaleLabel : maxFemaleLabel

  // 요약 상태 업데이트
  useEffect(() => {
    setSalesSummary('age', maxLabel)
    setSalesSummary('gender', maxGender)
  }, [maxLabel, maxGender, setSalesSummary])

  return (
    <s.AgeChart>
      <s.ChartTitle>연령별 매출액</s.ChartTitle>
      <s.ChartSubTitle>
        <s.HighlightText>
          {maxLabel} {maxGender}
        </s.HighlightText>{' '}
        매출액이 가장 높아요.
      </s.ChartSubTitle>
      <RadarChart labels={labels} value1={maleValues} value2={femaleValues} />
    </s.AgeChart>
  )
}

export default AgeChart
