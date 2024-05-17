import * as c from '@src/containers/status/StatusStyle'
// import * as r from '@src/containers/recommend/RecommendContainerStyle'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchTopList } from '@src/api/statusApi'
import { DataBody } from '@src/types/StatusType'
import StatusPolygonComponent from '@src/components/status/StatusPolygonComponent'
import StatusSidebarTopComponent from '@src/components/status/StatusSidebarTopComponent'
import StatusDetailbarComponent from '@src/components/status/StatusDetailbarComponent'
import useStateStore from '@src/stores/statusStore'
import Banner from '@src/common/Banner'

const StatusContainer = () => {
  const { selectedRegion, setRegionCode } = useStateStore()
  const [tab, setTab] = useState<number>(0)

  const onClickSetTab = (data: number) => {
    setTab(data)
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
          {selectedRegion && <StatusDetailbarComponent />}

          {selectedRegion ? (
            <c.EmptyContainer />
          ) : (
            <c.Sidebar>
              <StatusSidebarTopComponent
                TopLists={data.dataBody}
                Tab={tab}
                onClickSetTab={onClickSetTab}
                onClickRegionCodeHandler={onClickRegionCodeHandler}
              />
              <c.Banner>
                <Banner />
              </c.Banner>
            </c.Sidebar>
          )}

          <c.Content>
            <StatusPolygonComponent
              tab={tab}
              TopLists={data.dataBody}
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
