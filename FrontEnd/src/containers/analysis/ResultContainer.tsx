import { forwardRef, Ref, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import analysisStore from '@src/stores/analysisStore'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import {
  getFlowPopulationData,
  getResidentPopulationData,
  getSalesData,
  getStoreCountData,
} from '@src/api/analysisApi'
import FlowPopulationAnalysis from '@src/components/analysis/flowPopulation/FlowPopulationAnalysis'
import FacilitiesAnalysis from '@src/components/analysis/facilities/FacilitiesAnalysis'
import StoreCountAnalysis from '@src/components/analysis/storeCount/StoreCountAnalysis'
import SalesAnalysis from '@src/components/analysis/sales/SalesAnalysis'
import RentalCostAnalysis from '@src/components/analysis/rentalCost/RentalCostAnalysis'
import ResidentPopulationAnalysis from '@src/components/analysis/residentPopulation/ResidentPopulationAnalysis'
import ExpenditureAnalysis from '@src/components/analysis/expenditure/ExpenditureAnalysis'
import SideBarMenu from '@src/components/analysis/SideBarMenu'
import ResultIntro from '@src/components/analysis/ResultIntro'
import * as a from '@src/containers/analysis/ResultContainerStyle'

const ResultContainer = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const {
    selectedService,
    setFlowPopulationDataBody,
    setResidentPopulationDataBody,
    setSalesDataBody,
    setStoreCountDataBody,
  } = analysisStore()

  // 카테고리별 컴포넌트로 이동하기 위한 ref
  const flowRef = useRef<HTMLDivElement>(null)
  const facilitiesRef = useRef<HTMLDivElement>(null)
  const storeRef = useRef<HTMLDivElement>(null)
  const salesRef = useRef<HTMLDivElement>(null)
  const rentalRef = useRef<HTMLDivElement>(null)
  const residentRef = useRef<HTMLDivElement>(null)
  const expenditureRef = useRef<HTMLDivElement>(null)
  const refArr = [
    flowRef,
    facilitiesRef,
    storeRef,
    salesRef,
    rentalRef,
    residentRef,
    expenditureRef,
  ]
  // 카테고리별 컴포넌트로 이동 함수
  const moveTo = (index: number) => {
    refArr[index]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  // 유동인구
  const { data: FlowPopulationData, status: flowPopulationStatus } = useQuery({
    queryKey: ['GetFlowPopulationData', selectedCommercial.code],
    queryFn: () => getFlowPopulationData(String(selectedCommercial.code)),
    enabled: selectedCommercial.code !== 0, // 상권 코드가 0일때는 보내지 않는 조건
  })

  useEffect(() => {
    if (
      flowPopulationStatus === 'success' &&
      FlowPopulationData?.dataHeader.successCode === 0
    ) {
      setFlowPopulationDataBody(FlowPopulationData.dataBody)
    }
  }, [flowPopulationStatus, FlowPopulationData]) // eslint-disable-line react-hooks/exhaustive-deps

  // 상주인구
  const { data: ResidentPopulationData, status: residentPopulationStatus } =
    useQuery({
      queryKey: ['GetResidentPopulationData', selectedCommercial.code],
      queryFn: () => getResidentPopulationData(String(selectedCommercial.code)),
      enabled: selectedCommercial.code !== 0, // 상권 코드가 0일때는 보내지 않는 조건
    })

  useEffect(() => {
    if (
      residentPopulationStatus === 'success' &&
      ResidentPopulationData?.dataHeader.successCode === 0
    ) {
      setResidentPopulationDataBody(ResidentPopulationData.dataBody)
    }
  }, [residentPopulationStatus, ResidentPopulationData]) // eslint-disable-line react-hooks/exhaustive-deps

  // 매출 분석
  const { data: SalesData, status: salesStatus } = useQuery({
    queryKey: ['GetSalesData', selectedCommercial.code],
    queryFn: () =>
      getSalesData(
        String(selectedCommercial.code),
        selectedService.serviceCode,
      ),
    enabled:
      selectedCommercial.code !== 0 && selectedService.serviceCode !== '', // 상권 코드가 0이거나 업종 코드가 없으면 호출하지 않는 조건
  })

  useEffect(() => {
    if (salesStatus === 'success' && SalesData?.dataHeader.successCode === 0) {
      setSalesDataBody(SalesData.dataBody)
    }
  }, [salesStatus, SalesData]) // eslint-disable-line react-hooks/exhaustive-deps

  // 점포 수
  const { data: StoreCountData, status: storeCountStatus } = useQuery({
    queryKey: ['GetStoreCountData', selectedCommercial.code],
    queryFn: () =>
      getStoreCountData(
        String(selectedCommercial.code),
        selectedService.serviceCode,
      ),
    enabled:
      selectedCommercial.code !== 0 && selectedService.serviceCode !== '', // 상권 코드가 0이거나 업종 코드가 없으면 호출하지 않는 조건
  })

  useEffect(() => {
    if (
      storeCountStatus === 'success' &&
      StoreCountData?.dataHeader.successCode === 0
    ) {
      setStoreCountDataBody(StoreCountData.dataBody)
    }
  }, [storeCountStatus, StoreCountData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <a.Container ref={ref}>
      <ResultIntro />
      <a.Wrap>
        <a.Sidebar>
          <SideBarMenu moveTo={moveTo} />
        </a.Sidebar>
        <a.Main>
          <FlowPopulationAnalysis ref={flowRef} />
          <FacilitiesAnalysis ref={facilitiesRef} />
          <StoreCountAnalysis ref={storeRef} />
          <SalesAnalysis ref={salesRef} />
          <RentalCostAnalysis ref={rentalRef} />
          <ResidentPopulationAnalysis ref={residentRef} />
          <ExpenditureAnalysis ref={expenditureRef} />
        </a.Main>
      </a.Wrap>
    </a.Container>
  )
})

ResultContainer.displayName = 'ResultContainer'
export default ResultContainer
