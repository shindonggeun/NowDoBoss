import useKakaoLoader from '@src/hooks/useKakaoLoader'
import { Map, Polygon } from 'react-kakao-maps-sdk'
import { useEffect, useRef, useState } from 'react'
import { LatLngDataType } from '@src/types/MapType.tsx'
import { fetchDistrict } from '@src/api/mapApi.tsx'
import { useQuery } from '@tanstack/react-query'

const KakaoMap = () => {
  useKakaoLoader()
  const mapRef = useRef<kakao.maps.Map>(null)
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
  const [latLngData, setLatLngData] = useState<LatLngDataType>({
    lngNE: 0,
    latNE: 0,
    lngSW: 0,
    latSW: 0,
  })

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // const center = map.getCenter()
    //
    // // 지도의 현재 레벨을 얻어옵니다
    // const level = map.getLevel()

    // 지도의 현재 영역을 얻어옵니다
    const bounds = map.getBounds()
    // 영역의 남서쪽 좌표를 얻어옵니다
    const swLatLng: kakao.maps.LatLng = bounds.getSouthWest()
    // 영역의 북동쪽 좌표를 얻어옵니다
    const neLatLng: kakao.maps.LatLng = bounds.getNorthEast()
    // 북서쪽
    setLatLngData({
      lngNE: Object.values(neLatLng)[0],
      latNE: Object.values(neLatLng)[1],
      lngSW: Object.values(swLatLng)[0],
      latSW: Object.values(swLatLng)[1],
    })
  }, [])

  const { data } = useQuery({
    queryKey: ['fetchPoligonPath', latLngData],
    queryFn: () => fetchDistrict(latLngData),
  })
  console.log(data)
  return (
    <div>
      <Map
        center={{ lat: 37.57023786206844, lng: 126.94665085220238 }}
        style={{ width: '100%', height: 'calc(100vh - 75px)' }}
        ref={mapRef}
        level={9}
      >
        <Polygon
          path={[
            { lat: 35.206063423761435, lng: 126.81350507492236 },
            { lat: 35.202516316361475, lng: 126.81041642183014 },
            { lat: 35.202421136259495, lng: 126.80722105178819 },
            { lat: 35.20609861830582, lng: 126.80720137893576 },
          ]}
          strokeWeight={3} // 선의 두께입니다
          strokeColor="#39DE2A" // 선의 색깔입니다
          strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle="longdash" // 선의 스타일입니다
          fillColor={isMouseOver ? '#70ff5c' : '#A2FF99'} // 채우기 색깔입니다
          fillOpacity={isMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
          onMouseover={() => setIsMouseOver(true)}
          onMouseout={() => setIsMouseOver(false)}
          onMousedown={() => {
            console.log('클릭')
          }}
        />
      </Map>
    </div>
  )
}

export default KakaoMap
