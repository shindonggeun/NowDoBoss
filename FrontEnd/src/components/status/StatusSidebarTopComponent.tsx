import * as h from '@src/components/styles/status/StatusSidebarTopStyle'
import { TopList, TopListItem } from '@src/types/StatusType'
import left from 'src/assets/angle_left.svg'
import right from 'src/assets/angle_right.svg'
import up from 'src/assets/top_arrow_up.svg'
import down from 'src/assets/top_arrow_down.svg'
import { useState } from 'react'

export type ArticleListPropsType = {
  TopLists: TopList
}

// <Todo> Top 10으로 수정하기~~
const StatusSidebarTopComponent = ({ TopLists }: ArticleListPropsType) => {
  const footTrafficTop: TopListItem[] = TopLists.footTrafficTopTenList.slice(
    0,
    10,
  )
  const salesTop: TopListItem[] = TopLists.salesTopTenList.slice(0, 10)
  const openedRateTop: TopListItem[] = TopLists.openedRateTopTenList.slice(
    0,
    10,
  )
  const closedRateTop: TopListItem[] = TopLists.closedRateTopTenList.slice(
    0,
    10,
  )

  const [infosTab, setInfosTab] = useState(0)
  const TopBarListInfos = [
    { title: '유동인구 높은 동네 Top10', data: footTrafficTop },
    { title: '평균매출 높은 동네 Top10', data: salesTop },
    { title: '개업률 높은 동네 Top10', data: openedRateTop },
    { title: '폐업률 높은 동네 Top10', data: closedRateTop },
  ]

  const handleTabChange = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setInfosTab(prevTab =>
        prevTab === 0 ? TopBarListInfos.length - 1 : prevTab - 1,
      )
    } else {
      setInfosTab(prevTab =>
        prevTab === TopBarListInfos.length - 1 ? 0 : prevTab + 1,
      )
    }
  }

  return (
    <>
      <h.Container>
        <h.NarrowIcon
          src={left}
          alt="left"
          onClick={() => handleTabChange('left')}
        />
        {TopBarListInfos[infosTab].title}
        <h.NarrowIcon
          src={right}
          alt="right"
          onClick={() => handleTabChange('right')}
        />
      </h.Container>
      <h.TopListContainer>
        {TopBarListInfos[infosTab].data.map((item, i) => {
          const name = item.districtCodeName
          const traffic = item.totalFootTraffic.toLocaleString().slice(0, -4)
          const rate = item.totalFootTrafficChangeRate.toFixed(2)
          const isUp = item.totalFootTrafficChangeRate >= 0
          const isLast = TopBarListInfos[infosTab].data.length - 1 === i
          return (
            <h.Item key={i} isLast={isLast}>
              <h.ItemLeft>
                <h.Rank>{i + 1}.</h.Rank>
                <h.Name>{name}</h.Name>
              </h.ItemLeft>
              <h.ItemRight>
                <h.Traffic>{traffic} 천</h.Traffic>
                <h.Percent isUp={isUp}>
                  {rate}%
                  {isUp ? (
                    <h.UpIcon src={up} alt="up" />
                  ) : (
                    <h.DownIcon src={down} alt="down" />
                  )}
                </h.Percent>
              </h.ItemRight>
            </h.Item>
          )
        })}
      </h.TopListContainer>
    </>
  )
}

export default StatusSidebarTopComponent
