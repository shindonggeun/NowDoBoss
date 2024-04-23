import * as c from '@src/components/styles/status/StatusDetailbarStyle'
import NavScroll from '@src/common/NavScroll'
import { useRef } from 'react'

type StatusDetailbarProps = {
  regionCode: number | null
}

const StatusDetailbarComponent = ({ regionCode }: StatusDetailbarProps) => {
  console.log(`선택한 지역구 코드: ${regionCode}`)
  const scrollRef = useRef([])
  return (
    <c.Container>
      <NavScroll scrollRef={scrollRef} />
      <h1>사이드바 테스트</h1>
      <p>선택한 지역구 코드: {regionCode}</p>
    </c.Container>
  )
}

export default StatusDetailbarComponent
