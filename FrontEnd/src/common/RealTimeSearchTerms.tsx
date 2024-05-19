import React, { useEffect, useState } from 'react'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 30px;
  width: 280px; // 원하는 너비로 설정
  padding: 0 15px;
`

const SearchTerm = styled(animated.div)`
  position: absolute;
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  font-weight: bold;
`

// 실시간 검색어 순위 데이터 정의
interface RankingData {
  name: string
  count: number
}

interface RankingSaveData {
  districtRankings: RankingData[]
  administrationRankings: RankingData[]
  commercialRankings: RankingData[]
  serviceRankings: RankingData[]
}
interface RankingsResponse {
  dataHeader: {
    resultCode: null
    resultMessage: number
    successCode: number
  }
  dataBody: {
    districtRankings: RankingData[]
    administrationRankings: RankingData[]
    commercialRankings: RankingData[]
    serviceRankings: RankingData[]
  }
}

const RealTimeSearchTerms: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [realTimeData, setRealTimeData] = useState<
    RankingSaveData | undefined
  >()

  useEffect(() => {
    // 1. 초기 백엔드 서버로부터 SSE 스트림에 연결을 하기 위한 초기 설정
    const eventSource: EventSource = new EventSource(
      'http://localhost:8080/api/v1/sse/subscribe',
    )

    // 2. 초기 데이터 받기 용도 (SSE 연결되면 바로 보내주는 데이터)
    eventSource.onmessage = (event: MessageEvent) => {
      const data: RankingsResponse = JSON.parse(event.data)
      if (data) {
        setRealTimeData(data.dataBody)
      }
      // 데이터 아예 없을 때 더미 만들어서 넣으면 될 것 같습니다
      // console.log('Received general update:', data)
    }

    // 3. 그 이후로 실시간 검색어 순위가 10분마다 갱신된 데이터 보내줌
    // 'ranking-update' 이벤트 이름으로 백엔드 서버에서 발송한 순위 업데이트 이벤트 처리
    eventSource.addEventListener('ranking-update', (event: MessageEvent) => {
      const data: RankingsResponse = JSON.parse(event.data)
      if (data) {
        setRealTimeData(data.dataBody)
      }
      // console.log('Specific ranking update:', data)
    })
    // 4. 예외 처리 및 연결 종료
    // 클라이언트가 페이지를 나가거나 새로고침할 경우, 연결은 자동으로 종료
    eventSource.onerror = (error: Event) => {
      console.error('EventSource failed:', error)
      eventSource.close()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (realTimeData && realTimeData.commercialRankings.length > 0) {
        setIndex(
          prevIndex => (prevIndex + 1) % realTimeData.commercialRankings.length,
        )
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [realTimeData])

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0, transform: 'translate3d(0,20px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-20px,0)' },
    config: { duration: 500 },
  })

  return (
    <div>
      {realTimeData ? (
        <Container>
          {transitions((style, i) => (
            <SearchTerm
              style={style}
            >{`${i + 1}. ${realTimeData.commercialRankings[i].name}`}</SearchTerm>
          ))}
        </Container>
      ) : null}
    </div>
  )
}

export default RealTimeSearchTerms
