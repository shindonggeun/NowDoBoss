import styled from 'styled-components'

interface CategoryType {
  $isChoice: boolean
}

export const Container = styled.div`
  width: 240px;
  position: absolute;
  height: calc(100vh - 65px);
  //border-right: 1px solid #d9d9d9;
  padding-top: 30px;

  @media only screen and (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: 0;
    width: 100vw;
    position: fixed;
    height: 8vh;
    padding: 5px 2vw;
  }
`
export const SmallLeft = styled.div`
  @media only screen and (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: left;
  }
`
export const SmallRight = styled.div`
  @media only screen and (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: right;
  }
`
export const Chatting = styled.div<{ $isTransparent: boolean }>`
  margin: 0 0 10px 0;

  @media only screen and (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 10vh;
    margin: 0;
    background-color: #ffffff;
    border-bottom: 1px solid #dee4ec;
    opacity: ${props => (props.$isTransparent ? 1 : 0)};
    pointer-events: ${props => (props.$isTransparent ? 'auto' : 'none')};
    transition:
      opacity 0.3s,
      background-color 0.3s;
  }
`

export const Group = styled.div`
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
  width: 100%;

  @media only screen and (max-width: 992px) {
    width: 220px;
    margin: 0 10px 0 0;
  }
  @media only screen and (max-width: 540px) {
    width: 160px;
  }
  @media only screen and (max-width: 400px) {
    width: 140px;
  }
`

export const Input = styled.input`
  width: 100%;
  height: 40px;
  line-height: 28px;
  padding: 0 1rem 0 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  outline: none;
  background-color: #fff;
  color: #0d0c22;
  transition: 0.3s ease;

  &::placeholder {
    color: #9e9ea7;
  }

  &:focus,
  &:hover {
    outline: none;
    background-color: #fff;
  }

  @media only screen and (max-width: 540px) {
    height: 35px;
  }
`

export const InputIcon = styled.svg`
  position: absolute;
  left: 1rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
`
export const RightArrow = styled.img`
  margin-left: 20px;
`

// 카테고리 및 채팅 목록으로 재사용
export const ChatCard = styled.div<CategoryType>`
  font-weight: 600;
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.3rem;
  color: ${props => (props.$isChoice ? 'black' : 'gray')};
  background-color: ${props => (props.$isChoice ? '#F5F5F5' : 'none')};
  border-radius: ${props => (props.$isChoice ? '5px' : 'none')};

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
    border-radius: 5px;

    // BannerArrow에만 호버 효과 적용
    ${RightArrow} {
      transform: translateX(10px);
      transition: transform 0.3s ease;
    }
  }

  @media only screen and (max-width: 992px) {
    padding: 7px 5px;
    margin: 0 5px;
  }
  @media only screen and (max-width: 540px) {
    padding: 3px;
  }
`

export const Text = styled.div`
  margin: 0 0 0 5px;

  @media only screen and (max-width: 992px) {
    font-size: 0.8rem;
  }
`

export const Div = styled.div``
export const ChatListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: auto;
  background-color: #fff; // 배경색은 원하는 대로 조정 가능
  position: absolute; // 전체 화면을 덮기 위해 absolute 사용
  top: 60px; // 네비게이션 바 아래에 위치하도록 설정
  z-index: 10; // 다른 요소들 위에 표시
  overflow-y: auto; // 내용이 많을 경우 스크롤
  padding: 10px; // 패딩으로 내용과 경계 간 여백 제공
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // 살짝 그림자 효과 추가

  @media only screen and (max-width: 480px) {
    width: 140px;
  }
  @media only screen and (max-width: 480px) {
    width: 120px;
  }
`

// 반응형 992px 이하에서 가로로 설정
export const RowDiv = styled.div`
  @media only screen and (max-width: 992px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

export const Modal = styled.div``

export const Big = styled.div`
  display: flex;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`
export const Small = styled.div`
  display: none;

  @media only screen and (max-width: 992px) {
    display: flex;
  }

  @media only screen and (max-width: 540px) {
    scale: 0.9;
  }
`

export const CreateIcon = styled.img<{ $isTransparent: boolean }>`
  display: none;

  @media only screen and (max-width: 992px) {
    display: flex;
    cursor: pointer;
    scale: 1.5;
    padding: 0.25rem 0.5rem;
    opacity: ${props => (props.$isTransparent ? 1 : 0)};
    pointer-events: ${props => (props.$isTransparent ? 'auto' : 'none')};
  }
  @media only screen and (max-width: 540px) {
    display: flex;
    scale: 1.2;
  }
`

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`
