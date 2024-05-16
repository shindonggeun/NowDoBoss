import { forwardRef, Ref, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import { getSalesData, getTotalSalesData } from '@src/api/analysisApi'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import ExpectChart from '@src/components/analysis/sales/ExpectChart'
import AgeChart from '@src/components/analysis/sales/AgeChart'
import TodaySalesChart from '@src/components/analysis/sales/TodaySalesChart'
import TodayNumberChart from '@src/components/analysis/sales/TodayNumberChart'
import WeekSalesChart from '@src/components/analysis/sales/WeekSalesChart'
import WeekNumberChart from '@src/components/analysis/sales/WeekNumberChart'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const SalesAnalysisContainer = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  const selectedGoo = selectPlaceStore(state => state.selectedGoo)
  const selectedDong = selectPlaceStore(state => state.selectedDong)
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const selectedService = analysisStore(state => state.selectedService)
  const setSalesDataBody = analysisStore(state => state.setSalesDataBody)
  const setTotalSalesDataBody = analysisStore(
    state => state.setTotalSalesDataBody,
  )
  const [periodCode, setPeriodCode] = useState('20233') // 분기 코드
  const [salesErr, setSalesErr] = useState('') // 매출분석 에러 메세지
  const [totalSalesErr, setTotalSalesErr] = useState('') // 매출분석 (매출 총 금액) 에러 메세지

  // 매출분석
  const { data: SalesData, status: salesStatus } = useQuery({
    queryKey: [
      'GetSalesData',
      selectedCommercial.code,
      selectedService.serviceCode,
      periodCode,
    ],
    queryFn: () =>
      getSalesData(
        String(selectedCommercial.code),
        selectedService.serviceCode,
        periodCode,
      ),
    enabled:
      selectedCommercial.code !== 0 && selectedService.serviceCode !== '', // 상권 코드가 0이거나 업종 코드가 없으면 호출하지 않는 조건
  })

  useEffect(() => {
    // 호출 성공
    if (salesStatus === 'success' && SalesData?.dataHeader.successCode === 0) {
      setSalesDataBody(SalesData.dataBody)
      setSalesErr('')
    }
    // 호출 실패
    else if (
      salesStatus === 'success' &&
      SalesData?.dataHeader.successCode === 1
    ) {
      setSalesErr(SalesData.dataHeader.resultMessage)
    }
  }, [salesStatus, SalesData]) // eslint-disable-line react-hooks/exhaustive-deps

  // 매출분석 (매출 총 금액)
  const { data: TotalSalesData, status: totalSalesStatus } = useQuery({
    queryKey: [
      'GetTotalSalesData',
      selectedGoo.code,
      selectedDong.code,
      selectedCommercial.code,
      selectedService.serviceCode,
    ],
    queryFn: () =>
      getTotalSalesData(
        String(selectedGoo.code),
        String(selectedDong.code),
        String(selectedCommercial.code),
        selectedService.serviceCode,
        periodCode,
      ),
    enabled:
      selectedGoo.code !== 0 &&
      selectedDong.code !== 0 &&
      selectedCommercial.code !== 0 &&
      selectedService.serviceCode !== '', // 구, 동, 상권 코드가 0이거나 업종 코드가 없으면 호출하지 않는 조건
  })

  useEffect(() => {
    // 호출 성공
    if (
      totalSalesStatus === 'success' &&
      TotalSalesData?.dataHeader.successCode === 0
    ) {
      setTotalSalesDataBody(TotalSalesData.dataBody)
      setTotalSalesErr('')
    }
    // 호출 실패
    else if (
      totalSalesStatus === 'success' &&
      TotalSalesData?.dataHeader.successCode === 1
    ) {
      setTotalSalesErr(TotalSalesData.dataHeader.resultMessage)
    }
  }, [totalSalesStatus, TotalSalesData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      <CategoryTitleCard
        src="/images/sales.png"
        title="매출분석"
        setPeriodCode={setPeriodCode}
      />
      {totalSalesErr || salesErr ? (
        <s.ErrBox>
          해당 분기의 선택 업종 매출분석 데이터를 제공하지 않습니다.
        </s.ErrBox>
      ) : (
        <>
          <s.FirstLowContainer>
            <ExpectChart />
            <AgeChart />
          </s.FirstLowContainer>
          <s.SecondLowContainer>
            <TodaySalesChart />
            <TodayNumberChart />
          </s.SecondLowContainer>
          <s.ThirdLowContainer>
            <WeekSalesChart />
            <WeekNumberChart />
          </s.ThirdLowContainer>
        </>
      )}
    </div>
  )
})

SalesAnalysisContainer.displayName = 'SalesAnalysisContainer'
export default SalesAnalysisContainer
