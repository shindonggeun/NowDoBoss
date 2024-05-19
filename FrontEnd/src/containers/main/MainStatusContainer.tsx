import * as m from '@src/containers/main/MainContainerStyle'
import * as c from '@src/containers/main/MainStausContainerStyle'
import { useState } from 'react'
import MainCard1 from '@src/components/main/status/MainCard1'
import MainCard2 from '@src/components/main/status/MainCard2'
import MainCard3 from '@src/components/main/status/MainCard3'

const MainStatusContainer = () => {
  const [animate, setAnimate] = useState(true)
  const onStop = () => setAnimate(false)
  const onRun = () => setAnimate(true)

  return (
    <m.Container>
      <m.Content>
        <c.CardList>
          <c.SlideWrapper onMouseEnter={onStop} onMouseLeave={onRun}>
            <c.SlideOriginal $animate={animate}>
              <MainCard1 />
              <MainCard2 />
              <MainCard3 />
            </c.SlideOriginal>
            <c.SlideClone $animate={animate}>
              <MainCard1 />
              <MainCard2 />
              <MainCard3 />
            </c.SlideClone>
          </c.SlideWrapper>
        </c.CardList>
        <m.Text>
          <m.BlueText>District Status Report</m.BlueText>
          <m.Title>구별 상권 분석</m.Title>
          <m.TextContent>
            지도에서 원하는 지역을 선택, <br />
            창업 조건에 유리한 상권을 <br />
            지금 바로 추천받아 보세요 <br />
          </m.TextContent>
        </m.Text>
      </m.Content>
    </m.Container>
  )
}
export default MainStatusContainer
