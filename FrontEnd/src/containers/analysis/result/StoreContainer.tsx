import { forwardRef, Ref, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import { getStoreCountData } from '@src/api/analysisApi'
import CategoryTitleCard from '@src/components/analysis/result/CategoryTitleCard'
import TotalChart from '@src/components/analysis/storeCount/TotalChart'
import FranchiseChart from '@src/components/analysis/storeCount/FranchiseChart'
import OpenChart from '@src/components/analysis/storeCount/OpenChart'
import CloseChart from '@src/components/analysis/storeCount/CloseChart'
import * as s from '@src/components/styles/analysis/result/StoreCountAnalysisStyle'

const StoreContainer = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const selectedService = analysisStore(state => state.selectedService)
  const setStoreCountDataBody = analysisStore(
    state => state.setStoreCountDataBody,
  )
  const [periodCode, setPeriodCode] = useState('20233') // 분기 코드
  const [errMsg, setErrMsg] = useState('')

  // 점포 수
  const { data: StoreCountData, status: storeCountStatus } = useQuery({
    queryKey: ['GetStoreCountData', selectedCommercial.code, periodCode],
    queryFn: () =>
      getStoreCountData(
        String(selectedCommercial.code),
        selectedService.serviceCode,
        periodCode,
      ),
    enabled:
      selectedCommercial.code !== 0 && selectedService.serviceCode !== '', // 상권 코드가 0이거나 업종 코드가 없으면 호출하지 않는 조건
  })

  useEffect(() => {
    // 호출 성공
    if (
      storeCountStatus === 'success' &&
      StoreCountData?.dataHeader.successCode === 0
    ) {
      setStoreCountDataBody(StoreCountData.dataBody)
      setErrMsg('')
    }
    // 호출 실패
    else if (
      storeCountStatus === 'success' &&
      StoreCountData?.dataHeader.successCode === 1
    ) {
      setErrMsg(StoreCountData.dataHeader.resultMessage)
    }
  }, [storeCountStatus, StoreCountData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      <CategoryTitleCard
        src="/images/store_count.png"
        title="점포분석"
        setPeriodCode={setPeriodCode}
      />
      {errMsg ? (
        <s.ErrBox>
          해당 분기의 업종 점포분석 데이터를 제공하지 않습니다.
        </s.ErrBox>
      ) : (
        <>
          <TotalChart />
          <s.FirstRightWrap>
            <FranchiseChart />
            <s.StatusWrap>
              <OpenChart />
              <CloseChart />
            </s.StatusWrap>
          </s.FirstRightWrap>
        </>
      )}
    </div>
  )
})

StoreContainer.displayName = 'StoreContainer'
export default StoreContainer
