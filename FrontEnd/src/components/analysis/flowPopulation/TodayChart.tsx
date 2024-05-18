import React, { useEffect, useRef, useState } from 'react'
import analysisStore from '@src/stores/analysisStore'
import useAnalysisSummaryStore from '@src/stores/analysisSummaryStore'
import * as f from '@src/components/styles/analysis/FlowPopulationAnalysisStyle'

const TodayChart = () => {
  const flowPopulationDataBody = analysisStore(
    state => state.flowPopulationDataBody,
  )
  const setFlowSummary = useAnalysisSummaryStore(state => state.setFlowSummary)

  const values: number[] = Object.values(
    flowPopulationDataBody.dayOfWeekFootTraffic,
  )

  const weekdaySum = values.slice(0, 5).reduce((acc, curr) => acc + curr, 0) // 주중(월화수목금) 합계
  const weekendSum = values.slice(5, 7).reduce((acc, curr) => acc + curr, 0) // 주말(토일) 합계
  const totalSum = weekdaySum + weekendSum // 총 합계
  const dailyAverage = Math.round(totalSum / 7).toLocaleString('ko-KR') // 일일 평균

  // 백분율로 변환
  const weekdayPercentage = Math.round((weekdaySum / totalSum) * 100)
  const weekendPercentage = Math.round((weekendSum / totalSum) * 100)

  // 요약 상태 업데이트
  useEffect(() => {
    setFlowSummary('daily', dailyAverage)
    if (weekdaySum > weekendSum) {
      setFlowSummary('maxWeek', '주중')
      setFlowSummary('minWeek', '주말')
      setFlowSummary('ratio', (weekdaySum / weekendSum).toFixed(1))
    } else {
      setFlowSummary('maxWeek', '주말')
      setFlowSummary('minWeek', '주중')
      setFlowSummary('ratio', (weekendSum / weekdaySum).toFixed(1))
    }
  }, [dailyAverage, setFlowSummary, weekdaySum, weekendSum])

  const lineRef = useRef<HTMLDivElement>(null)
  const [lineWidth, setLineWidth] = useState(0)

  useEffect(() => {
    // 라인의 너비를 얻어 업데이트
    const updateLineWidth = () => {
      if (lineRef.current) {
        setLineWidth(lineRef.current.offsetWidth)
      }
    }

    // 컴포넌트 마운트 시 한번 그리고, 리사이즈 할 때마다 업데이트
    window.addEventListener('resize', updateLineWidth)
    updateLineWidth() // 초기화

    // Clean up
    return () => window.removeEventListener('resize', updateLineWidth)
  }, [])

  // 눈금과 레이블을 그리기
  const renderTicks = () => {
    const ticks = []
    for (let i = 0; i <= 10; i += 1) {
      const position = (lineWidth / 10) * i // 선의 길이에 따라 비율을 계산
      ticks.push(
        <React.Fragment key={i}>
          <f.Tick style={{ left: `${position}px` }} />
          <f.TickLabel style={{ left: `${position}px` }}>{i * 10}</f.TickLabel>
        </React.Fragment>,
      )
    }
    return ticks
  }

  // 주중/주말 비율 계산 전에 0인지 확인
  let chartSubTitle
  if (weekdaySum === 0 && weekendSum === 0) {
    chartSubTitle = '유동인구 정보가 없어요.'
  } else if (weekdaySum === 0) {
    chartSubTitle = (
      <>
        주말의 매출액이 <f.HighlightText>100%</f.HighlightText> 이에요.
      </>
    )
  } else if (weekendSum === 0) {
    chartSubTitle = (
      <>
        주중의 유동인구가 <f.HighlightText>100%</f.HighlightText> 이에요.
      </>
    )
  } else {
    const weekdayMultiplier = (weekdaySum / weekendSum).toFixed(1)
    chartSubTitle =
      parseFloat(weekdayMultiplier) > 1 ? (
        <>
          주중의 유동인구는 주말보다 약{' '}
          <f.HighlightText>{weekdayMultiplier}배</f.HighlightText> 더 많아요.
        </>
      ) : (
        <>
          주말의 유동인구는 주중보다 약{' '}
          <f.HighlightText>
            {(1 / parseFloat(weekdayMultiplier)).toFixed(1)}배
          </f.HighlightText>{' '}
          더 많아요.
        </>
      )
  }

  return (
    <f.TodayChart>
      <f.TodayTopContainer>
        <f.IconImg src="/images/flow_population.png" alt="flow_population" />
        <f.Title>
          일일 평균 유동인구는{' '}
          <f.HighlightText>{dailyAverage}명</f.HighlightText> 입니다.
        </f.Title>
      </f.TodayTopContainer>
      <f.Divider />
      <f.ChartTitle>주중/주말 유동인구</f.ChartTitle>
      <f.ChartSubTitle>{chartSubTitle}</f.ChartSubTitle>

      <f.Wrap>
        <f.BoxContainer>
          <f.ChartBox
            style={{
              width: `${weekdayPercentage}%`,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
            }}
          >
            주중 ({weekdayPercentage}%)
          </f.ChartBox>
          <f.ChartBox
            style={{
              width: `${weekendPercentage}%`,
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
            }}
          >
            주말 ({weekendPercentage}%)
          </f.ChartBox>
        </f.BoxContainer>
        <f.HorizontalLine ref={lineRef}>
          {lineWidth && renderTicks()}
        </f.HorizontalLine>
      </f.Wrap>
    </f.TodayChart>
  )
}

export default TodayChart
