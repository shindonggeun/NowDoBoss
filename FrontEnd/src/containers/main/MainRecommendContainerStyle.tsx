import styled from 'styled-components'

// 페이지 별 기본 컨테이너 div
export const Container = styled.div`
  width: calc(100vw - 5px);
  //height: calc(100vh - 70px);
  height: calc(300vh);
  display: flex;

  margin: auto;
  @media only screen and (max-width: 992px) {
    //height: calc(400vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

// 내용이 들어갈 div
export const Content = styled.div`
  height: 100%;
  //background-color: #d9d9d9;
  width: 100%;
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
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0 40px;
  position: sticky;
  top: 0;
  left: 10%;
  @media only screen and (max-width: 992px) {
    position: unset;
    width: calc(100vw - 5px);
    height: 80vh;
    margin: 4rem 0;
    padding: 0;
    align-items: center;
  }
`

// 카드 들어가는 div
export const CardList = styled.div`
  height: 300vh;
  width: 50vw;
  margin-right: 10%;

  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;

  @media only screen and (max-width: 992px) {
    width: calc(100vw - 5px);
    height: 200vh;
    margin: 0;
    padding: 0;
    align-items: center;
  }
`

// overflow-y 적용 할 스크롤 div
export const Page = styled.div`
  height: 100vh;
`

// 이미지 넣을 card
export const Card = styled.div`
  width: 400px;
  height: 450px;
  cursor: pointer;
  background-color: white;
  border-radius: 20px;
  color: #f0f5ff;
  box-shadow: 0 0 30px 20px;
  margin: calc((100vh - 35vw) / 2) 0;
  padding: 50px 40px;
  font-weight: 600;

  @media only screen and (max-width: 992px) {
    margin: 0;
    width: 100%;
    height: auto;
  }
`
export const CardImg = styled.img`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 120px;
`

export const HeaderText = styled.div`
  color: #1f67fd;
  font-size: 15px;
`

export const TitleText = styled.div`
  color: #404040;
  font-weight: 700;
  font-size: 18px;
  padding: 4px 0;
`

export const SubTitleText = styled.div`
  color: #606d85;
  font-size: 15px;
`

export const Icon = styled.img<{ $width: number }>`
  width: ${props => `${props.$width}px`};
`

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Degree = styled.div`
  width: 300px;
  height: 500px;

  @media only screen and (max-width: 992px) {
    margin: 0;
    width: 100%;
    height: auto;
  }
`
