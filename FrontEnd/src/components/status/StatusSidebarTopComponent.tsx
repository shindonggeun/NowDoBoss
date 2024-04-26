import * as h from '@src/components/styles/status/StatusSidebarTopStyle'
import { TopList, TopListItem } from '@src/types/StatusType'

export type ArticleListPropsType = {
  TopLists: TopList
}

// <Todo> Top 10으로 수정하기~~
const StatusSidebarTopComponent = ({ TopLists }: ArticleListPropsType) => {
  const footTrafficTop: TopListItem[] = TopLists.footTrafficTopTenList.slice(
    0,
    5,
  )

  // const openedRateTop: TopListItem[] = TopLists.openedRateTopTenList.slice(
  //   0,
  //   10,
  // )
  // const salesTop: TopListItem[] = TopLists.salesTopTenList.slice(0, 10)
  // const closedRateTop: TopListItem[] = TopLists.closedRateTopTenList.slice(
  //   0,
  //   10,
  // )

  return (
    <>
      <h.Container>매출 높은 동네 Top10</h.Container>
      {footTrafficTop.map((item, i) => {
        const name = item.districtCodeName
        const traffic = item.totalFootTraffic.toLocaleString().slice(0, -4)
        const rate = item.totalFootTrafficChangeRate.toFixed(2)
        // const isUp = item.totalFootTrafficChangeRate.slice(0, -4)
        return (
          <h.Item key={i}>
            <span>{i + 1}.</span>
            <h.Name>{name}</h.Name>
            <h.Traffic>{traffic} 천</h.Traffic>
            <h.Percent>{rate}%</h.Percent>
          </h.Item>
        )
      })}
    </>
  )
}

export default StatusSidebarTopComponent
