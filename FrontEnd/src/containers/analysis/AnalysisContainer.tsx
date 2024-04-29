import ResultSection from '@src/components/analysis/ResultSection'
import * as a from '@src/containers/analysis/AnalysisContainerStyle'

const AnalysisContainer = () => {
  return (
    <a.Container>
      <a.SelectLocationContainer>
        {/* <SelectLocationSection /> */}
      </a.SelectLocationContainer>
      <a.ResultSectionContainer>
        <ResultSection />
      </a.ResultSectionContainer>
    </a.Container>
  )
}

export default AnalysisContainer
