import useKakaoLoader from '@src/hooks/useKakaoLoader'
import { Map, Polygon } from 'react-kakao-maps-sdk'
import { useRef, useState } from 'react'
import {
  DataBodyType,
  LatLngDataType,
  PromiseDataType,
} from '@src/types/MapType'
import {
  fetchAdministration,
  fetchCommercial,
  fetchDistrict,
} from '@src/api/mapApi'
import { useQuery } from '@tanstack/react-query'

const KakaoMap = () => {
  // 카카오 지도 호출 코드
  useKakaoLoader()
  const mapRef = useRef<kakao.maps.Map>(null)

  // 마우스 올렸을 때
  const [isMouseOver, setIsMouseOver] = useState<string>('')
  // const [mouseOverLatLng, setMouseOverLatLng] = useState<LatLng>({
  //   lat: 0,
  //   lng: 0,
  // })

  // 현재 지도 level 저장한 값
  const [level, setLevel] = useState<number>(9)

  // 현재 화면 우상단, 좌하단 좌표 값
  const [latLngData, setLatLngData] = useState<LatLngDataType>({
    lngNE: 127.32720115811232,
    latNE: 37.76084867208698,
    lngSW: 126.56752739824054,
    latSW: 37.377625138871835,
  })

  // 지도 움직일 때 좌표 갱신하는 코드
  const updateMapBounds = (map: kakao.maps.Map) => {
    const bounds = map.getBounds()
    const swLatLng = bounds.getSouthWest()
    const neLatLng = bounds.getNorthEast()
    setLevel(map.getLevel())

    setLatLngData({
      lngNE: neLatLng.getLng(),
      latNE: neLatLng.getLat(),
      lngSW: swLatLng.getLng(),
      latSW: swLatLng.getLat(),
    })
  }

  // 좌표 갱신될 때마다 get 요청 보내는 코드
  const { data, isLoading } = useQuery<PromiseDataType>({
    queryKey: ['fetchPoligonPath', latLngData],
    queryFn: async () => {
      console.log(`level : ${level}`)
      if (level > 7) {
        return fetchDistrict(latLngData)
      }
      if (level > 4) {
        return fetchAdministration(latLngData)
      }
      return fetchCommercial(latLngData)
    },
  })

  // 데이터를 폴리곤 path 형식으로 변환하는 함수
  // const parsePolygonData = (dataBody: DataBodyType) => {
  //   return Object.keys(dataBody.coords).map(key => ({
  //     code: key,
  //     center: dataBody.codes[key]
  //       ? {
  //           // 중심 좌표 추가
  //           lng: dataBody.codes[key][0],
  //           lat: dataBody.codes[key][1],
  //         }
  //       : undefined,
  //     path: dataBody.coords[key].map(([lng, lat]) => ({
  //       lng,
  //       lat,
  //     })),
  //   }))
  // }
  if (data) {
    console.log(data.dataBody)
  }
  const parsePolygonData = (dataBody: DataBodyType) => {
    return Object.keys(dataBody.coords)
      .map(key => {
        // codes에서 key에 해당하는 중심 좌표 데이터가 존재하는지 확인
        const centerCoords = dataBody.names[key]

        return {
          code: key,
          center: {
            lng: centerCoords[0],
            lat: centerCoords[1],
          },
          path: dataBody.coords[key].map(([lng, lat]) => ({
            lng,
            lat,
          })),
        }
      })
      .filter(item => item !== null) // 중심 좌표가 없어서 null로 처리된 항목들을 제거
  }

  return (
    <div>
      <div>
        <Map
          center={{ lat: 37.57023786206844, lng: 126.94665085220238 }}
          style={{ width: '100%', height: 'calc(100vh - 75px)' }}
          ref={mapRef}
          level={level}
          onDragEnd={map => updateMapBounds(map)}
          onZoomChanged={map => updateMapBounds(map)}
          // minLevel={9}
        >
          {!isLoading && data
            ? parsePolygonData(data.dataBody).map((code, index) => {
                console.log(code)
                // 색상 배열 정의
                const colors = [
                  '#FF6347',
                  '#4682B4',
                  '#32CD32',
                  '#FFD700',
                  '#6A5ACD',
                  '#FF69B4',
                  '#20B2AA',
                ]
                // index에 따라 색상을 순환시키기 위한 계산
                const colorIndex = index % colors.length
                // 현재 폴리곤의 색상
                const fillColor = colors[colorIndex]

                return (
                  <Polygon
                    key={index}
                    path={code.path}
                    strokeWeight={3} // 선의 두께입니다
                    // strokeColor="#39DE2A" // 선의 색깔입니다
                    strokeColor={fillColor} // 선의 색깔입니다
                    strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle="longdash" // 선의 스타일입니다
                    // fillColor={isMouseOver ? '#70ff5c' : '#A2FF99'} // 채우기 색깔입니다
                    fillColor={fillColor} // 채우기 색깔입니다
                    fillOpacity={isMouseOver === code.code ? 0.8 : 0.6} // 채우기 불투명도입니다
                    onMouseover={() => {
                      // if (code.center) {
                      //   setMouseOverLatLng(code.center)
                      // }
                      return setIsMouseOver(code.code)
                    }}
                    onMouseout={() => setIsMouseOver('')}
                    onMousedown={() => {
                      console.log(code.code)
                    }}
                  />
                )
              })
            : ''}
          {/* {mouseOverLatLng ? ( */}
          {/*  <MapInfoWindow // 인포윈도우를 생성하고 지도에 표시합니다 */}
          {/*    position={{ */}
          {/*      // 인포윈도우가 표시될 위치입니다 */}
          {/*      lat: mouseOverLatLng.lat, */}
          {/*      lng: mouseOverLatLng.lng, */}
          {/*    }} */}
          {/*    removable // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다 */}
          {/*  > */}
          {/*    <div style={{ padding: '5px', color: '#000' }}>Hello World!</div> */}
          {/*  </MapInfoWindow> */}
          {/* ) : ( */}
          {/*  '' */}
          {/* )} */}
        </Map>
      </div>
    </div>
  )
}

export default KakaoMap
