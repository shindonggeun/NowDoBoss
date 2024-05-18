import { useEffect } from 'react'
import analysisStore from '@src/stores/analysisStore'
import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import AreaChart from '@src/common/AreaChart'
import * as f from '@src/components/styles/analysis/FlowPopulationAnalysisStyle'

const TimeChart = () => {
  const { flowPopulationDataBody } = analysisStore()
  const flowSummary = useAnalysisSummaryStore(state => state.flowSummary)
  const setFlowSummary = useAnalysisSummaryStore(state => state.setFlowSummary)

  const labels: string[] = [
    '00~06시',
    '06~11시',
    '11~14시',
    '14~17시',
    '17~21시',
    '21~24시',
  ]

  useEffect(() => {
    const values: number[] = Object.values(
      flowPopulationDataBody.timeSlotFootTraffic,
    )
    // 가장 높은 값 찾기
    const maxValue: number = Math.max(...values)
    // 해당 인덱스를 사용하여 라벨 찾기
    const maxLabel: string = labels[values.indexOf(maxValue)]

    let dynamicMessage

    switch (maxLabel) {
      case '00~06시':
        dynamicMessage = '새벽시간대'
        break
      case '06~11시':
        dynamicMessage = '아침시간대'
        break
      case '11~14시':
        dynamicMessage = '점심시간대'
        break
      case '14~17시':
        dynamicMessage = '오후시간대'
        break
      case '17~21시':
        dynamicMessage = '저녁시간대'
        break
      case '21~24시':
        dynamicMessage = '밤시간대'
        break
      default:
        dynamicMessage = '활발한 시간대를 파악하는데 오류가 있습니다.'
    }

    // 요약 상태 업데이트
    setFlowSummary('time', maxLabel)
    setFlowSummary('timeInfo', dynamicMessage)
  }, [flowPopulationDataBody, setFlowSummary])

  return (
    <f.TimeChart>
      <f.ChartTitle>시간대별 유동인구</f.ChartTitle>
      <f.ChartSubTitle>
        <f.HighlightText>{flowSummary.time}</f.HighlightText> 유동인구가 가장
        높아요.
      </f.ChartSubTitle>
      <f.AddBox>
        <f.HighlightText>{flowSummary.time}</f.HighlightText> 유동인구가 가장
        높습니다. {flowSummary.timeInfo}가 활발한 상권입니다.
      </f.AddBox>
      <AreaChart
        labels={labels}
        values={Object.values(flowPopulationDataBody.timeSlotFootTraffic)}
      />
    </f.TimeChart>
  )
}

export default TimeChart
