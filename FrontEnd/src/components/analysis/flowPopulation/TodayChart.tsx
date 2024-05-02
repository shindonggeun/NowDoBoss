import React, { useEffect, useRef, useState } from 'react'
import analysisStore from '@src/stores/analysisStore'
import * as f from '@src/components/styles/analysis/FlowPopulationAnalysisStyle'

const TodayChart = () => {
  const { flowPopulationDataBody } = analysisStore()
  const values: number[] = Object.values(
    flowPopulationDataBody.dayOfWeekFootTraffic,
  )

  const weekdaySum = values.slice(0, 5).reduce((acc, curr) => acc + curr, 0) // 주중(월화수목금) 합계
  const weekendSum = values.slice(5, 7).reduce((acc, curr) => acc + curr, 0) // 주말(토일) 합계
  const totalSum = weekdaySum + weekendSum // 총 합계
  const dailyAverage = Math.round(totalSum / 7).toLocaleString('ko-KR') // 일일 평균
  const weekdayMultiplier = (weekdaySum / weekendSum).toFixed(1) // 주중 주말 비율
  // 백분율로 변환
  const weekdayPercentage = Math.round((weekdaySum / totalSum) * 100)
  const weekendPercentage = Math.round((weekendSum / totalSum) * 100)

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

  return (
    <f.TodayChart>
      <f.TodayTopContainer>
        <f.IconImg src="src/assets/flow_population.png" alt="flow_population" />
        <f.Title>일일 평균 유동인구는 {dailyAverage} 명 입니다.</f.Title>
      </f.TodayTopContainer>
      <f.Divider />
      <f.ChartTitle>주중/주말 유동인구</f.ChartTitle>
      <f.ChartSubTitle>
        주말보다 주중의 유동인구가 약 {weekdayMultiplier}배 더 많아요.
      </f.ChartSubTitle>
      <f.Wrap>
        <f.BoxContainer>
          <f.ChartBox
            style={{
              width: `${weekdayPercentage}%`,
              backgroundColor: '#7ED321',
            }}
          >
            주중 ({weekdayPercentage}%)
          </f.ChartBox>
          <f.ChartBox
            style={{
              width: `${weekendPercentage}%`,
              backgroundColor: '#FFA84A',
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
