import * as m from '@src/containers/main/MainContainerStyle'
import MoreCard1 from '@src/components/main/service/MoreCard1'
import MoreCard2 from '@src/components/main/service/MoreCard2'
import MoreCard3 from '@src/components/main/service/MoreCard3'

const MainMoreContainer = () => {
  return (
    <m.EctContainer>
      <m.EctContent>
        <m.EctText>
          <m.BlueText>More Service</m.BlueText>
          <m.Title>NowDoBoss만의 든든한 서비스</m.Title>
          <m.EctTextContent>
            관심 분야가 같은 사람들과 함께 고민을 나누고 소통할 수 있는 커뮤니티
            및 채팅, <br /> 상권분석과 업종추천에 대한 분석 리포트와 결과
            공유까지! <br />
            지금 바로 함께 하세요.
            <br />
          </m.EctTextContent>
        </m.EctText>
      </m.EctContent>
      <m.EctCardContainer>
        <m.EctCard $isup={false}>
          <MoreCard1 />
        </m.EctCard>
        <m.EctCard $isup>
          <MoreCard2 />
        </m.EctCard>
        <m.EctCard $isup={false}>
          <MoreCard3 />
        </m.EctCard>
      </m.EctCardContainer>
    </m.EctContainer>
  )
}
export default MainMoreContainer
