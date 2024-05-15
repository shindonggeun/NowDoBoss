import * as m from '@src/containers/main/MainContainerStyle'

const MainStatusContainer = () => {
  return (
    <m.Container>
      <m.Content>
        <m.Text>
          <m.BlueText>District Status Report</m.BlueText>
          <m.Title>구별 상권 분석</m.Title>
          <m.TextContent>
            지도에서 원하는 지역을 선택, <br />
            창업 조건에 유리한 상권을 <br />
            지금 바로 추천받아 보세요 <br />
          </m.TextContent>
        </m.Text>
        <m.CardList>
          <m.Card>카드</m.Card>
        </m.CardList>
      </m.Content>
    </m.Container>
  )
}
export default MainStatusContainer
