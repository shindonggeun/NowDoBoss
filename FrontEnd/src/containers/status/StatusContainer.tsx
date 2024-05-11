import * as c from '@src/containers/status/StatusStyle'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchTopList } from '@src/api/statusApi'
import { DataBody } from '@src/types/StatusType'
import StatusPolygonComponent from '@src/components/status/StatusPolygonComponent'
import StatusSidebarTopComponent from '@src/components/status/StatusSidebarTopComponent'
import StatusDetailbarComponent from '@src/components/status/StatusDetailbarComponent'
import useStateStore from '@src/stores/statusStore'

const StatusContainer = () => {
  const { selectedRegion, setSelectedRegion } = useStateStore()
  // const [selectedRegion, setSelectedRegion] = useState<string | null>(null) // 지역 선택
  const [regionCode, setRegionCode] = useState<number | null>(null) // 지역 선택
  const [tab, setTab] = useState<number>(0)

  const onClickSetTab = (data: number) => {
    setTab(data)
  }

  const onClickRegionHandler = (region: string | null) => {
    setSelectedRegion(region)
  }

  const onClickRegionCodeHandler = (code: number) => {
    setRegionCode(code)
  }

  const { data, isLoading, refetch } = useQuery<DataBody>({
    queryKey: ['StatusTopList'],
    queryFn: () => fetchTopList(),
  })
  useEffect(() => {
    refetch()
  }, [refetch, tab])

  return (
    <div>
      {!isLoading && data ? (
        <c.StatusContainer>
          {selectedRegion && (
            <StatusDetailbarComponent
              selectedRegion={selectedRegion}
              onClickRegionHandler={onClickRegionHandler}
              regionCode={regionCode}
            />
          )}

          <c.Sidebar>
            <StatusSidebarTopComponent
              TopLists={data.dataBody}
              Tab={tab}
              onClickSetTab={onClickSetTab}
              onClickRegionHandler={onClickRegionHandler}
              onClickRegionCodeHandler={onClickRegionCodeHandler}
            />
          </c.Sidebar>

          <c.Content>
            <StatusPolygonComponent
              tab={tab}
              selectedRegion={selectedRegion}
              TopLists={data.dataBody}
              onClickRegionHandler={onClickRegionHandler}
              onClickRegionCodeHandler={onClickRegionCodeHandler}
            />
          </c.Content>
        </c.StatusContainer>
      ) : (
        <div />
      )}
    </div>
  )
}

export default StatusContainer
