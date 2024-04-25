import * as c from '@src/containers/status/StatusStyle'
import StatusPolygonComponent from '@src/components/status/StatusPolygonComponent.tsx'
import StatusSidebarTopComponent from '@src/components/status/StatusSidebarTopComponent.tsx'
import StatusDetailbarComponent from '@src/components/status/StatusDetailbarComponent'
import { useState } from 'react'

const StatusContainer = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null) // 지역 선택
  const [regionCode, setRegionCode] = useState<number | null>(null) // 지역 선택
  const [selectedOption, setSelectedOption] = useState<string | null>(null) // 옵션 선택
  const [tab, setTab] = useState<number | null>(null)
  const options = ['유동인구', '매출평균', '입점률', '폐점률']
  const optionList = options.map((e: string, i: number) => ({
    name: e,
    onClick: () => {
      setTab(i)
      setSelectedOption(e)
    },
  }))

  const onClickRegionHandler = (region: string) => {
    setSelectedRegion(region)
  }

  const onClickRegionCodeHandler = (code: number) => {
    setRegionCode(code)
  }

  return (
    <c.StatusContainer>
      {selectedRegion && (
        <StatusDetailbarComponent
          selectedRegion={selectedRegion}
          onClickRegionHandler={onClickRegionHandler}
          regionCode={regionCode}
        />
      )}
      <c.Sidebar>
        <StatusSidebarTopComponent />
        <c.SeparateLine />
        <c.Container>
          <c.Title>구별 상권 현황</c.Title>
          <c.Subtitle>아래의 구분을 선택하여 현황을 파악해 보세요</c.Subtitle>
          <c.OptionsContainer>
            {optionList.map(option => (
              <c.Option
                key={option.name}
                selected={selectedOption === option.name}
                onClick={option.onClick}
              >
                {option.name}
              </c.Option>
            ))}
          </c.OptionsContainer>
        </c.Container>
      </c.Sidebar>
      <c.Content>
        <StatusPolygonComponent
          tab={tab}
          selectedRegion={selectedRegion}
          onClickRegionHandler={onClickRegionHandler}
          onClickRegionCodeHandler={onClickRegionCodeHandler}
        />
      </c.Content>
    </c.StatusContainer>
  )
}

export default StatusContainer
