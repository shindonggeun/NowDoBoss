import * as h from '@src/containers/styles/AnalysisStyle'
import AnalysisSidebarContainer from '@src/containers/AnalysisSidebarContainer'
import AnalysisPolygonContainer from '@src/containers/AnalysisPolygonContainer'

const AnalysisContainer = () => {
  return (
    <h.AnalysisLayout>
      <h.Sidebar>
        <AnalysisSidebarContainer />
      </h.Sidebar>
      <h.Content>
        <AnalysisPolygonContainer />
      </h.Content>
    </h.AnalysisLayout>
  )
}

export default AnalysisContainer
