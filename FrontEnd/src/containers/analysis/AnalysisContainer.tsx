import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import analysisStore from '@src/stores/analysisStore'
import { getFlowPopulationData } from '@src/api/analysisApi'
import ResultSection from '@src/components/analysis/ResultSection'
import * as a from '@src/containers/analysis/AnalysisContainerStyle'

const AnalysisContainer = () => {
  const { selectedCommercialCode, setFlowPopulationDataBody } = analysisStore()

  const { data: FlowPopulationData, status } = useQuery({
    queryKey: ['GetFlowPopulationData', selectedCommercialCode],
    queryFn: () => getFlowPopulationData(selectedCommercialCode),
  })

  useEffect(() => {
    if (
      status === 'success' &&
      FlowPopulationData?.dataHeader.successCode === 0
    ) {
      setFlowPopulationDataBody(FlowPopulationData.dataBody)
    }
  }, [status, FlowPopulationData]) // eslint-disable-line react-hooks/exhaustive-deps

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
