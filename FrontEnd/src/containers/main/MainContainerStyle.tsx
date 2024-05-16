import styled from 'styled-components'

export const MainContainer = styled.div`
  @media only screen and (max-width: 992px) {
    //
  }
`
// 페이지 별 기본 컨테이너 div
export const Container = styled.div`
  width: calc(100vw - 5px);
  //height: calc(100vh - 70px);
  height: calc(100vh);

  margin: auto;
  @media only screen and (max-width: 992px) {
    //
  }
`

// 내용이 들어갈 div
export const Content = styled.div`
  height: 100%;
  margin: 0 10%;
  //background-color: #d9d9d9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

// 글로 소개하는 부분
export const Text = styled.div`
  width: 50%;
  //background-color: #ff7070;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
`

// 파란색 부가 설명
export const BlueText = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  color: #336cd1;
`

// 제목
export const Title = styled.div`
  font-weight: 700;
  font-size: 3.2rem;
  margin: 10px 0 15px 0;
`

// 설명
export const TextContent = styled.div`
  font-weight: 600;
  font-size: 2rem;
  color: #5f6c84;
`

// 카드 들어가는 div
export const CardList = styled.div`
  width: 50%;
  //background-color: #96ff89;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// overflow-y 적용 할 스크롤 div
export const CardScroll = styled.div`
  max-height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /*IE, Edge*/
  scrollbar-width: none; /*Firefox*/
  ::-webkit-scrollbar {
    display: none; /*Chrome, Safari, Opera*/
    width: 0;
  }
`

// 이미지 넣을 card
export const Card = styled.div`
  width: 620px;
  height: 400px;
  //margin: calc((100vh - 70px - 450px) / 2) 0;
  margin: calc((100vh - 400px) / 2) 0;
  border: 4px solid #d9d9d9;
  //background-color: #d9d9d9;
  border-radius: 5px;
`
export const CardImg = styled.img`
  width: 612px;
`
