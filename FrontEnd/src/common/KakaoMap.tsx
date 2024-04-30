import useKakaoLoader from '@src/hooks/useKakaoLoader'
import { CustomOverlayMap, Map, Polygon } from 'react-kakao-maps-sdk'
import { useRef, useState } from 'react'
import {
  DataBodyType,
  LatLng,
  LatLngDataType,
  PromiseDataType,
} from '@src/types/MapType'
import {
  fetchAdministration,
  fetchCommercial,
  fetchDistrict,
} from '@src/api/mapApi'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

// 마우스 호버 시 뜨는 지역 명
const PlaceBox = styled.div`
  position: absolute;
  background: #236eff;
  color: #ffffff;
  //border: 1px solid #888;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
  top: -5px;
  left: 15px;
  padding: 5px;
`

const KakaoMap = () => {
  // 카카오 지도 호출 코드
  useKakaoLoader()

  const mapRef = useRef<kakao.maps.Map>(null)

  // 마우스 올렸을 때 해당 동네 이름 저장
  const [isMouseOver, setIsMouseOver] = useState<string>('')

  // 마우스 올렸을 때 해당 동네 좌표 저장
  const [mouseOverLatLng, setMouseOverLatLng] = useState<LatLng>({
    lat: 37.57023786206844,
    lng: 126.94665085220238,
  })

  // 현재 지도 level 저장한 값
  const [level, setLevel] = useState<number>(8)

  // 지도의 중심 좌표
  const [centerLatLng, setCenterLatLng] = useState<LatLng>({
    lat: 37.57023786206844,
    lng: 126.94665085220238,
  })

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
      if (level > 6) {
        return fetchDistrict(latLngData)
      }
      if (level > 4) {
        return fetchAdministration(latLngData)
      }
      return fetchCommercial(latLngData)
    },
  })

  // 호출받은 데이터 재가공
  const parsePolygonData = (dataBody: DataBodyType) => {
    return Object.keys(dataBody.coords)
      .map(key => {
        // codes에서 key에 해당하는 중심 좌표 데이터가 존재하는지 확인
        const centerCoords = dataBody.names[key]

        return {
          name: key,
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

  // // store에 저장된 구 데이터와 선택한 구, 동, 상권 값 가져올 store
  // const {
  //   districtData,
  //   selectedDistrict,
  //   setSelectedDistrict,
  //   selectedAdministration,
  //   setSelectedAdministration,
  //   setSelectedCommercial,
  // } = useSelectPlaceStore(state => ({
  //   districtData: state.districtData,
  //   selectedDistrict: state.selectedDistrict,
  //   setSelectedDistrict: state.setSelectedDistrict,
  //   selectedAdministration: state.selectedAdministration,
  //   setSelectedAdministration: state.setSelectedAdministration,
  //   setSelectedCommercial: state.setSelectedCommercial,
  // }))
  //
  // useEffect(() => {
  //   if (data) {
  //     parsePolygonData(data.dataBody).map(code => {
  //       return <div key={code.name} />
  //     })
  //   }
  // }, [data, selectedDistrict])

  return (
    <div>
      <div>
        <Map
          center={centerLatLng}
          style={{ width: '100%', height: 'calc(100vh - 75px)' }}
          ref={mapRef}
          level={level}
          onDragEnd={map => updateMapBounds(map)}
          onZoomChanged={map => updateMapBounds(map)}
          onClick={map => {
            updateMapBounds(map)
          }}
          minLevel={9}
          // 마우스가 움직일 때 위치를 위경도로 저장
          onMouseMove={(_map, mouseEvent) =>
            setMouseOverLatLng({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            })
          }
        >
          {!isLoading && data
            ? parsePolygonData(data.dataBody).map((code, index) => {
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
                    key={code.name}
                    path={code.path}
                    strokeWeight={3} // 선의 두께입니다
                    strokeColor={fillColor} // 선의 색깔입니다
                    strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle="longdash" // 선의 스타일입니다
                    // strokeColor="#39DE2A" // 선의 색깔입니다
                    // fillColor={isMouseOver ? '#70ff5c' : '#A2FF99'} // 채우기 색깔입니다
                    fillColor={fillColor} // 채우기 색깔입니다
                    zIndex={100}
                    fillOpacity={isMouseOver === code.name ? 0.8 : 0.6} // 채우기 불투명도입니다
                    onMouseover={() => {
                      // setMouseOverLatLng(code.center)
                      return setIsMouseOver(code.name)
                    }}
                    onMouseout={() => setIsMouseOver('')}
                    onMousedown={() => {}}
                    onClick={() => {
                      if (level > 4) {
                        setLevel(level - 1)
                      }
                      setCenterLatLng(code.center)
                    }}
                  />
                )
              })
            : ''}
          {isMouseOver && (
            <CustomOverlayMap
              position={{
                // 인포윈도우가 표시될 위치입니다
                lat: mouseOverLatLng.lat,
                lng: mouseOverLatLng.lng,
              }}
            >
              <PlaceBox>{isMouseOver}</PlaceBox>
            </CustomOverlayMap>
          )}
        </Map>
      </div>
    </div>
  )
}

export default KakaoMap
