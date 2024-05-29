import { forwardRef, Ref, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import { getFlowPopulationData } from '@src/api/analysisApi'
import CategoryTitleCard from '@src/components/analysis/result/CategoryTitleCard'
import TodayChart from '@src/components/analysis/flowPopulation/TodayChart'
import WeekChart from '@src/components/analysis/flowPopulation/WeekChart'
import AgeChart from '@src/components/analysis/flowPopulation/AgeChart'
import TimeChart from '@src/components/analysis/flowPopulation/TimeChart'
import * as c from '@src/components/styles/analysis/result/ChartCardStyle'

const FlowContainer = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const setFlowPopulationDataBody = analysisStore(
    state => state.setFlowPopulationDataBody,
  )
  const [periodCode, setPeriodCode] = useState('20233') // 분기 코드
  const [errMsg, setErrMsg] = useState('') // 유동인구 에러 메세지

  // 유동인구
  const { data: FlowPopulationData, status: flowPopulationStatus } = useQuery({
    queryKey: ['GetFlowPopulationData', selectedCommercial.code, periodCode],
    queryFn: () =>
      getFlowPopulationData(String(selectedCommercial.code), periodCode),
    enabled: selectedCommercial.code !== 0, // 상권 코드가 0일때는 보내지 않는 조건
  })

  useEffect(() => {
    // 호출 성공
    if (
      flowPopulationStatus === 'success' &&
      FlowPopulationData?.dataHeader.successCode === 0
    ) {
      setFlowPopulationDataBody(FlowPopulationData.dataBody)
      setErrMsg('')
    }
    // 호출 실패
    else if (
      flowPopulationStatus === 'success' &&
      FlowPopulationData?.dataHeader.successCode === 1
    ) {
      setErrMsg(FlowPopulationData.dataHeader.resultMessage)
    }
  }, [flowPopulationStatus, FlowPopulationData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      <CategoryTitleCard
        src="/images/flow_population.png"
        title="유동인구"
        setPeriodCode={setPeriodCode}
      />
      {errMsg ? (
        <c.ErrBox>
          해당 분기의 선택 상권 유동인구 데이터를 제공하지 않습니다.
        </c.ErrBox>
      ) : (
        <div>
          <TodayChart />
          <WeekChart />
          <AgeChart />
          <TimeChart />
        </div>
      )}
    </div>
  )
})

FlowContainer.displayName = 'FlowContainer'
export default FlowContainer
