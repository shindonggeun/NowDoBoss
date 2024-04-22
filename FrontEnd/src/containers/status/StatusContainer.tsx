import * as h from '@src/containers/status/StatusStyle.tsx'
import { SeparateLine } from '@src/containers/status/StatusStyle.tsx'
import StatusPolygonComponent from '@src/components/status/StatusPolygonComponent.tsx'
import StatusSidebarTopComponent from '@src/components/status/StatusSidebarTopComponent.tsx'
import AnalysisSidebarBottomComponent from '@src/components/status/StatusSidebarBottomComponent.tsx'

const StatusContainer = () => {
  return (
    <h.AnalysisLayout>
      <h.Sidebar>
        <StatusSidebarTopComponent />
        <SeparateLine />
        <AnalysisSidebarBottomComponent />
      </h.Sidebar>
      <h.Content>
        <StatusPolygonComponent />
      </h.Content>
    </h.AnalysisLayout>
  )
}

export default StatusContainer
