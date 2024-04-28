import FlowPopulationAnalysis from '@src/components/analysis/FlowPopulationAnalysis'
import FacilitiesAnalysis from '@src/components/analysis/FacilitiesAnalysis'
import StoreCountAnalysis from '@src/components/analysis/StoreCountAnalysis'
import SalesAnalysis from '@src/components/analysis/SalesAnalysis'
import RentalCostAnalysis from '@src/components/analysis/RentalCostAnalysis'
import ResidentPopulationAnalysis from '@src/components/analysis/ResidentPopulationAnalysis'
import ExpenditureAnalysis from '@src/components/analysis/ExpenditureAnalysis'
import SidebarMenu from '@src/components/analysis/SidebarMenu'
import * as r from '@src/components/styles/analysis/ResultSectionStyle'

const ResultSection = () => {
  return (
    <r.Container>
      <SidebarMenu />
      <>
        <FlowPopulationAnalysis />
        <FacilitiesAnalysis />
        <StoreCountAnalysis />
        <SalesAnalysis />
        <RentalCostAnalysis />
        <ResidentPopulationAnalysis />
        <ExpenditureAnalysis />
      </>
    </r.Container>
  )
}

export default ResultSection
