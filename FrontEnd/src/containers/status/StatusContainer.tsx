import * as c from '@src/containers/status/StatusStyle'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchTopList } from '@src/api/statusApi'
import { DataBody } from '@src/types/StatusType'
import StatusPolygonComponent from '@src/components/status/StatusPolygonComponent'
import StatusSidebarTopComponent from '@src/components/status/StatusSidebarTopComponent'
import StatusDetailbarComponent from '@src/components/status/StatusDetailbarComponent'

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
            <StatusSidebarTopComponent TopLists={data.dataBody} />
            <c.SeparateLine />
            <c.Container>
              <c.Title>구별 상권 현황</c.Title>
              <c.Subtitle>
                아래의 구분을 선택하여 현황을 파악해 보세요
              </c.Subtitle>
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
      ) : (
        <div>데이터 로딩중</div>
      )}
    </div>
  )
}

export default StatusContainer
