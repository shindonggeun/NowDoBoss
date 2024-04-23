import { useEffect, useRef } from 'react'
// import seoul from '@src/components/status/sig_seoul_topo.json'
import seoul from '@src/components/status/sig_seoul_geojson.json'
// import * as topojson from 'topojson'
import * as d3 from 'd3'

const StatusPolygonComponent = () => {
  const svgRef = useRef(null) // SVG 요소를 참조하기 위한 ref

  useEffect(() => {
    // TopoJSON을 GeoJSON으로 변환
    // const geoJson = topojson.feature(seoul, seoul.objects.sig_seoul)

    const geoJson = seoul

    // D3를 사용하여 지도의 projection 설정
    const projection = d3
      .geoMercator()
      .center([126.980886, 37.524502]) // 지도 중심 위경도 (서울 용산구)
      .scale(55000) // 지도의 스케일 조정
      .translate([400 / 2, 400 / 2]) // SVG 영역 내에서 지도의 위치 조정

    const path = d3.geoPath().projection(projection)

    // D3를 사용하여 SVG에 지도 그리기
    const svg = d3.select(svgRef.current)
    svg
      .selectAll('path')
      .data(geoJson.features)
      .enter()
      .append('path')
      .attr('d', path) // D3의 geoPath를 사용하여 path 데이터 설정
      .attr('fill', 'lightgray') // 폴리곤의 색상 설정
      .attr('stroke', 'white') // 폴리곤의 테두리 색상 설정
  }, []) // useEffect Hook은 컴포넌트 마운트 시에만 실행됩니다.

  return (
    <svg
      ref={svgRef}
      width="400"
      height="400"
      style={{ backgroundColor: 'red' }}
    >
      지도 폴리곤입니다.
    </svg>
  )
}

export default StatusPolygonComponent
