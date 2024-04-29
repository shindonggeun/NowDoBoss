import FlowPopulationAnalysis from '@src/components/analysis/FlowPopulationAnalysis'
import FacilitiesAnalysis from '@src/components/analysis/FacilitiesAnalysis'
import StoreCountAnalysis from '@src/components/analysis/StoreCountAnalysis'
import SalesAnalysis from '@src/components/analysis/SalesAnalysis'
import RentalCostAnalysis from '@src/components/analysis/RentalCostAnalysis'
import ResidentPopulationAnalysis from '@src/components/analysis/ResidentPopulationAnalysis'
import ExpenditureAnalysis from '@src/components/analysis/ExpenditureAnalysis'
import SideBarMenu from '@src/components/analysis/SideBarMenu'
import ResultIntro from '@src/components/analysis/ResultIntro'
import * as r from '@src/components/styles/analysis/ResultSectionStyle'

const ResultSection = () => {
  return (
    <r.Container>
      <ResultIntro />
      <r.ResultContainer>
        <r.SidebarContainer>
          <SideBarMenu />
        </r.SidebarContainer>
        <r.MainContainer>
          <FlowPopulationAnalysis />
          <FacilitiesAnalysis />
          <StoreCountAnalysis />
          <SalesAnalysis />
          <RentalCostAnalysis />
          <ResidentPopulationAnalysis />
          <ExpenditureAnalysis />
        </r.MainContainer>
      </r.ResultContainer>
    </r.Container>
  )
}

export default ResultSection
