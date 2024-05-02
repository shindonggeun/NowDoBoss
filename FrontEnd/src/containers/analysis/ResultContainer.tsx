import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import analysisStore from '@src/stores/analysisStore'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import {
  getFlowPopulationData,
  getResidentPopulationData,
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

const ResultContainer = () => {
  const { setFlowPopulationDataBody, setResidentPopulationDataBody } =
    analysisStore()
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  // 유동인구
  const { data: FlowPopulationData, status: flowPopulationStatus } = useQuery({
    queryKey: ['GetFlowPopulationData', selectedCommercial.code],
    queryFn: () => getFlowPopulationData(String(selectedCommercial.code)),
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
    })

  useEffect(() => {
    if (
      residentPopulationStatus === 'success' &&
      ResidentPopulationData?.dataHeader.successCode === 0
    ) {
      setResidentPopulationDataBody(ResidentPopulationData.dataBody)
    }
  }, [residentPopulationStatus, ResidentPopulationData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <a.Container>
      <ResultIntro />
      <a.Wrap>
        <a.Sidebar>
          <SideBarMenu />
        </a.Sidebar>
        <a.Main>
          <FlowPopulationAnalysis />
          <FacilitiesAnalysis />
          <StoreCountAnalysis />
          <SalesAnalysis />
          <RentalCostAnalysis />
          <ResidentPopulationAnalysis />
          <ExpenditureAnalysis />
        </a.Main>
      </a.Wrap>
    </a.Container>
  )
}

export default ResultContainer
