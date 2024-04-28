import * as h from '@src/components/styles/status/StatusSidebarTopStyle'
import { TopList, TopListItem } from '@src/types/StatusType'
import left from 'src/assets/angle_left.svg'
import right from 'src/assets/angle_right.svg'

export type ArticleListPropsType = {
  TopLists: TopList
}

// <Todo> Top 10으로 수정하기~~
const StatusSidebarTopComponent = ({ TopLists }: ArticleListPropsType) => {
  const footTrafficTop: TopListItem[] = TopLists.footTrafficTopTenList.slice(
    0,
    8,
  )

  // const openedRateTop: TopListItem[] = TopLists.openedRateTopTenList.slice(
  //   0,
  //   10,
  // )
  // const salesTop: TopListItem[] = TopLists.salesTopTenList.slice(0, 10)
  //
  // const closedRateTop: TopListItem[] = TopLists.closedRateTopTenList.slice(
  //   0,
  //   10,
  // )

  return (
    <>
      <h.Container>
        <h.NarrowIcon src={left} alt="left" onClick={() => {}} />
        매출 높은 동네 Top10
        <h.NarrowIcon src={right} alt="right" onClick={() => {}} />
      </h.Container>
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
