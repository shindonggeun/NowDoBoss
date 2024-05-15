import * as m from '@src/containers/main/MainContainerStyle'
import * as c from '@src/containers/main/MainStausContainerStyle'

const MainStatusContainer = () => {
  // 동기화 함수
  // function syncScroll() {
  //   const cardList = document.querySelector('.cardList')
  //   const scrollTop = window.scrollY || document.documentElement.scrollTop
  //   const scrollAmount = scrollTop
  //
  //   // 가로 스크롤 컨테이너의 스크롤 위치를 조정합니다.
  //   cardList.scrollLeft = scrollAmount
  // }
  //
  // window.addEventListener('scroll', syncScroll)

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
        <c.CardList>
          <div>
            <c.Card>
              <c.CardContainer>내용</c.CardContainer>
            </c.Card>
            <c.Card>dd</c.Card>
            <c.Card>dd</c.Card>
            <c.Card>dd</c.Card>
            <c.Card>dd</c.Card>
          </div>
        </c.CardList>
      </m.Content>
    </m.Container>
  )
}
export default MainStatusContainer
