import * as c from '@src/components/styles/status/StatusPolygonStyle'
import seoul from '@src/components/status/sig_seoul_geojson.json'
import * as d3 from 'd3'
import { TopList, TopListItem } from '@src/types/StatusType'

type StatusPolygonProps = {
  tab: number | null
  selectedRegion: string | null
  TopLists: TopList
  onClickRegionHandler: any
  onClickRegionCodeHandler: any
}

const StatusPolygonComponent = ({
  tab,
  selectedRegion,
  TopLists,
  onClickRegionHandler,
  onClickRegionCodeHandler,
}: StatusPolygonProps) => {
  console.log(`선택된 탭 index : ${tab}`)

  // 폴리곤 그리기
  const mapData = seoul.features // 서울시 행정구역 json data
  const width = 660
  const height = 550
  const scale = 90000

  // 데카르트 투영법을 이용하여 만든 프로젝션
  const projection = d3
    .geoMercator()
    .center([127.023136826325427, 37.57196080977203])
    .scale(scale)
    .translate([width / 2 + 75, height / 2 - 10])

  // projection을 이용하여 만든 경로 생성 함수
  const pathGenerator = d3.geoPath().projection(projection)

  // <todo> 색 변경하기!
  const mapColor = [
    ['#E7E0F9', '#D3C0F7', '#A78DED', '#8C63E5', '#5E28C9'], // 유동인구
    ['#D8EEFF', '#A4D7FC', '#60AEEE', '#0095E5', '#007ECE'], // 매출평균
    ['#FDEAEC', '#FFCCD1', '#F3A6AF', '#E97F8D', '#CC4E5D'], // 입점률
    ['#C3FFEA', '#92ECCD', '#5DD0A7', '#00BF7A', '#009E65'], // 폐점률
    ['#F3FFDA', '#FAF0C3', '#F8DB6D', '#FFDE3C', '#E8C500'],
    ['#D6FFFD', '#BBFBF7', '#68E1D9', '#10C1CC', '#009FA9'],
  ]
  const handleRegionClick = (regionName: string) => {
    if (selectedRegion === regionName) {
      onClickRegionHandler(null)
    } else {
      onClickRegionHandler(regionName)
    }
  }

  // 받아온 데이터 탭별 정리
  const footTrafficTop: TopListItem[] = TopLists.footTrafficTopTenList
  const openedRateTop: TopListItem[] = TopLists.openedRateTopTenList
  const salesTop: TopListItem[] = TopLists.salesTopTenList
  const closedRateTop: TopListItem[] = TopLists.closedRateTopTenList
  const StatusTopData = [footTrafficTop, openedRateTop, salesTop, closedRateTop]

  // 행정구 폴리곤
  const countries = mapData.map((d: any, i) => {
    const isSelected = selectedRegion === d.properties.SIG_KOR_NM
    const tempItem =
      tab != null
        ? StatusTopData[tab].find(
            sig => sig.districtCode === d.properties.SIG_CD,
          )
        : null
    const colorIndex = tempItem ? tempItem.level - 1 : 0

    const style = isSelected
      ? {
          fill: '#FFC940',
          stroke: 'white',
          strokeWidth: '2px',
          transition: 'transform 0.5s ease-out, fill 0.3s ease-out',
          transform: 'scale(1)',
          transformOrigin: 'center',
          cursor: 'pointer',
        }
      : {
          fill: tab === null ? '#009FA9' : mapColor[tab][colorIndex],
          stroke: 'white',
          strokeWidth: '2px',
          transition: 'transform 0.5s ease-out, fill 0.3s ease-out',
          cursor: 'pointer',
        }

    return (
      <path
        key={`path${i}`}
        d={pathGenerator(d)!}
        onClick={() => {
          // console.log(`${d.properties.SIG_KOR_NM}를 선택함!`)
          handleRegionClick(d.properties.SIG_KOR_NM)
          onClickRegionCodeHandler(d.properties.SIG_CD)
        }}
        style={style}
      />
    )
  })

  // 행정구 Text
  const countryTexts = mapData.map((d: any, i) => (
    <text
      key={`path${i}text`}
      transform={`translate(${pathGenerator.centroid(d)})`}
      style={{
        textAnchor: 'middle',
        top: '10px',
        position: 'relative',
        cursor: 'pointer',
      }}
      x={d.properties.x_offset ? d.properties.x_offset : ''}
      y={d.properties.y_offset ? d.properties.y_offset : ''}
      onClick={() => {
        handleRegionClick(d.properties.SIG_KOR_NM)
        onClickRegionCodeHandler(d.properties.SIG_CD)
      }}
    >
      {d.properties.SIG_KOR_NM}
    </text>
  ))

  return (
    <c.PolygonContainer>
      <svg width={width} height={height}>
        {countries}
        {countryTexts}
      </svg>
    </c.PolygonContainer>
  )
}

export default StatusPolygonComponent
