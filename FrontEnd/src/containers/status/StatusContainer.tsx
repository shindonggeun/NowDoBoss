import * as h from '@src/containers/status/StatusStyle.tsx'
import StatusPolygonContainer from '@src/components/status/StatusPolygonContainer.tsx'
import StatusSidebarTopComponent from '@src/components/status/StatusSidebarTopComponent.tsx'
import AnalysisSidebarBottomComponent from '@src/components/status/StatusSidebarBottomComponent.tsx'

const StatusContainer = () => {
  return (
    <h.AnalysisLayout>
      <h.Sidebar>
        <StatusSidebarTopComponent />
        <AnalysisSidebarBottomComponent />
      </h.Sidebar>
      <h.Content>
        <StatusPolygonContainer />
      </h.Content>
    </h.AnalysisLayout>
  )
}

export default StatusContainer
