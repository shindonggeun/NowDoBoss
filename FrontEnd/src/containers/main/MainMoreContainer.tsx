import * as m from '@src/containers/main/MainContainerStyle'

const MainMoreContainer = () => {
  return (
    <m.Container>
      <m.Content>
        <m.Text>
          <m.BlueText>More Service</m.BlueText>
          <m.Title>추가 서비스</m.Title>
          <m.TextContent>
            관심 분야가 같은 사람들과 함께 <br />
            고민을 나누고 소통할 수 있는 <br />
            커뮤니티 및 채팅 <br />
          </m.TextContent>
        </m.Text>
        <m.CardList>
          <m.Card>임시</m.Card>
        </m.CardList>
      </m.Content>
    </m.Container>
  )
}
export default MainMoreContainer
