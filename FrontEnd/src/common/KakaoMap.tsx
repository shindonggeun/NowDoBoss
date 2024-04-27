import useKakaoLoader from '@src/hooks/useKakaoLoader'
import { Map, Polygon } from 'react-kakao-maps-sdk'
import { useState } from 'react'

const KakaoMap = () => {
  useKakaoLoader()
  const [isMouseOver, setIsMouseOver] = useState(false)
  return (
    <div>
      <Map
        center={{ lat: 35.204342820549066, lng: 126.80835860434433 }}
        style={{ width: '100%', height: '91.5vh' }}
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
