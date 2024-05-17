import * as c from '@src/containers/main/MainStausContainerStyle'
import ContainerBox from '@src/common/ContainerBox'
import * as d3 from 'd3'
import { useState } from 'react'
import seoul from '../../../datas/sig_seoul_geojson.json'

const MainCard3 = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const mapData = seoul.features // 서울시 행정구역 json data
  // 데카르트 투영법을 이용하여 만든 프로젝션
  const projection = d3
    .geoMercator()
    .center([127.023136826325427, 37.57196080977203])
    .scale(33000)
    .translate([170, 100])

  // projection을 이용하여 만든 경로 생성 함수
  const pathGenerator = d3.geoPath().projection(projection)

  const countries = mapData.map((d: any, i) => {
    const style = {
      fill: hoveredRegion === d.properties.SIG_KOR_NM ? '#BAD1FF' : '#236CFF',
      stroke: 'white',
      strokeWidth: '2px',
      transition: 'transform 0.5s ease-out, fill 0.3s ease-out',
      cursor: 'pointer',
      opacity: 0.8,
    }

    return (
      <path
        key={`path${i}`}
        d={pathGenerator(d)!}
        style={style}
        onMouseEnter={() => setHoveredRegion(d.properties.SIG_KOR_NM)}
        onMouseLeave={() => setHoveredRegion(null)}
      />
    )
  })

  return (
    <div>
      <c.SlideList>
        <c.Card>
          <c.HeaderText>서울시 폴리곤</c.HeaderText>
          <c.TitleText>서울시 폴리곤</c.TitleText>
          <c.SubTitleText>서울시 폴리곤</c.SubTitleText>
          <ContainerBox height={30} />
          <svg width={300} height={210}>
            {countries}
          </svg>
        </c.Card>
      </c.SlideList>
    </div>
  )
}

export default MainCard3
