import * as c from '@src/containers/status/StatusStyle'
import * as h from '@src/components/styles/status/AnalysisSidebarBottomStyle.tsx'
import { SeparateLine } from '@src/containers/status/StatusStyle.tsx'
import StatusPolygonComponent from '@src/components/status/StatusPolygonComponent.tsx'
import StatusSidebarTopComponent from '@src/components/status/StatusSidebarTopComponent.tsx'
// import StatusSidebarBottomComponent from '@src/components/status/StatusSidebarBottomComponent.tsx'
import { useState } from 'react'

const StatusContainer = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [tab, setTab] = useState<number>(0)
  const options = ['유동인구', '매출평균', '입점률', '폐점률']
  const optionList = options.map((e: string, i: number) => ({
    name: e,
    onClick: () => {
      setTab(i)
      setSelectedOption(e)
    },
  }))

  return (
    <c.AnalysisLayout>
      <c.Sidebar>
        <StatusSidebarTopComponent />
        <SeparateLine />
        <h.Container>
          <h.Title>구별 상권 현황</h.Title>
          <h.Subtitle>아래의 구분을 선택하여 현황을 파악해 보세요</h.Subtitle>
          <h.OptionsContainer>
            {optionList.map(option => (
              <h.Option
                key={option.name}
                selected={selectedOption === option.name}
                onClick={option.onClick}
              >
                {option.name}
              </h.Option>
            ))}
          </h.OptionsContainer>
        </h.Container>
      </c.Sidebar>
      <c.Content>
        <StatusPolygonComponent tab={tab} />
      </c.Content>
    </c.AnalysisLayout>
  )
}

export default StatusContainer
