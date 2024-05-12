import * as h from '@src/components/styles/status/StatusSidebarTopStyle'
import { TopList, TopListItem } from '@src/types/StatusType'
import up from 'src/assets/top_arrow_up.svg'
import down from 'src/assets/top_arrow_down.svg'

export type ArticleListPropsType = {
  TopLists: TopList
  Tab: number
  onClickSetTab: (data: number) => void
  onClickRegionHandler: (data: string | null) => void
  onClickRegionCodeHandler: (data: number) => void
}

const StatusSidebarTopComponent = ({
  TopLists,
  Tab,
  onClickSetTab,
  onClickRegionHandler,
  onClickRegionCodeHandler,
}: ArticleListPropsType) => {
  const options = ['유동인구', '평균매출', '개업률', '폐업률']

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

  const TopBarListInfos = [
    { title: '유동인구', data: footTrafficTop },
    { title: '평균매출', data: salesTop },
    { title: '개업률', data: openedRateTop },
    { title: '폐업률', data: closedRateTop },
  ]

  return (
    <h.Container>
      <h.HeaderContainer>
        <h.HeaderTitle>구별 상권 현황</h.HeaderTitle>
        <div>아래의 구분을 선택하여 현황을 파악해보세요</div>
      </h.HeaderContainer>
      <h.TabContainer>
        {TopBarListInfos.map((item, i) => (
          <h.TabLists key={i} onClick={() => onClickSetTab(i)}>
            <h.TabList selected={options[Tab] === item.title}>
              {item.title}
            </h.TabList>
          </h.TabLists>
        ))}
      </h.TabContainer>
      <h.SeparateLine />
      <h.TopListContainer>
        {TopBarListInfos[Tab].data.map((item, i) => {
          const name = item.districtCodeName
          const code = Number(item.districtCode)
          const total = item.total.toLocaleString()
          const totalRate = item.totalRate.toFixed(2)
          const isUp = item.totalRate >= 0
          const isLast = TopBarListInfos[Tab].data.length === i + 1
          return (
            <h.HoverItem
              key={i}
              onClick={() => {
                onClickRegionHandler(name)
                onClickRegionCodeHandler(code)
              }}
            >
              <h.Item islast={isLast} index={i}>
                <h.ItemLeft>
                  <h.Rank>{i + 1}.</h.Rank>
                  <h.Name>{name}</h.Name>
                </h.ItemLeft>
                <h.ItemRight>
                  <h.Traffic>
                    {(() => {
                      switch (Tab) {
                        case 0:
                          return `${total.slice(0, -4)} 만명`
                        case 1:
                          return `${item.total.toString().slice(0, 1)} 조 ${item.total.toString().slice(2, 6)} 억`
                        case 2:
                          return `${total.slice(0, 4)} 개`
                        case 3:
                          return `${total.slice(0, 4)} 개`
                        default:
                          return `${total} 개`
                      }
                    })()}
                  </h.Traffic>
                  <h.Percent isUp={isUp}>
                    {totalRate}%
                    {isUp ? (
                      <h.UpIcon src={up} alt="up" />
                    ) : (
                      <h.DownIcon src={down} alt="down" />
                    )}
                  </h.Percent>
                </h.ItemRight>
              </h.Item>
            </h.HoverItem>
          )
        })}
      </h.TopListContainer>
    </h.Container>
  )
}

export default StatusSidebarTopComponent
