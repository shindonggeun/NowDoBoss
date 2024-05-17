import styled from 'styled-components'

export const MainContainer = styled.div`
  scroll-behavior: smooth;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
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

  @media only screen and (max-width: 992px) {
    flex-direction: column;
    justify-content: center;
  }
`

// 글로 소개하는 부분
export const Text = styled.div`
  width: 50%;
  //background-color: #ff7070;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;

  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`

// 파란색 부가 설명
export const BlueText = styled.div`
  color: #336dd3;
  margin-bottom: 12px;
  font-size: 1.25rem;
`

// 제목
export const Title = styled.div`
  color: #191f28;
  margin-bottom: 16px;
  font-size: 2.5rem;
  font-weight: 700;
  word-break: keep-all;
  line-height: 140%;
`

// 설명
export const TextContent = styled.div`
  color: #606d85;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 160%;
  margin-bottom: 40px;
`

// 바로가기 버튼
export const BannerArrow = styled.div``

// 바로가기 버튼
export const GoButton = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: #333;
  display: flex;

  &:hover {
    cursor: pointer;
    // BannerArrow에만 호버 효과 적용

    ${BannerArrow} {
      transform: translateX(15px);
      transition: transform 0.3s ease;
    }
  }
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
  scroll-behavior: smooth;
  -ms-overflow-style: none; /*IE, Edge*/
  scrollbar-width: none; /*Firefox*/

  ::-webkit-scrollbar {
    display: none; /*Chrome, Safari, Opera*/
    width: 0;
  }
`

// 이미지 넣을 card
export const Card = styled.div`
  width: 35vw;
  height: auto;
  //margin: calc((100vh - 70px - 450px) / 2) 0;
  margin: calc((100vh - 400px) / 2) 0;

  @media only screen and (max-width: 992px) {
    margin: 0;
    width: 100%;
  }
`
export const CardImg = styled.img`
  width: 100%;
  border: 2px solid #d9d9d9;
  border-radius: 5px;
`

export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 2rem;
  margin: 5px 0;
  color: #4a4a4a;
`
