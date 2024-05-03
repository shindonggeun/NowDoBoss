import styled from 'styled-components'

interface CategoryType {
  $isChoice: boolean
}

export const Container = styled.div`
  background-color: #f1f1f1;
  //  왼쪽에 띄울 크기
  width: 250px;
  position: absolute;
  height: calc(100vh - 65px);

  @media only screen and (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100vw - 40px);
    height: 8vh;
    padding: 5px 20px;
  }

  @media only screen and (max-width: 400px) {
    padding: 5px 10px;
    width: calc(100vw - 20px);
  }
`
export const Community = styled.div`
  margin: 0 0 10px 0;

  @media only screen and (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 95vw;
    height: 10vh;
    margin: 0;
  }
  @media only screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 10vh;
    margin: 0;
  }
`
export const Chatting = styled.div`
  margin: 0 0 10px 0;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`

export const ChatButton = styled.img`
  display: none;

  @media only screen and (max-width: 992px) {
    display: flow;
    cursor: pointer;
  }
  @media only screen and (max-width: 800px) {
    display: flow;
    cursor: pointer;
  }
  @media only screen and (max-width: 586px) {
    scale: 0.8;
  }
  @media only screen and (max-width: 500px) {
    scale: 0.6;
    margin-right: -10px;
  }
`

export const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  padding: 10px 17px 5px;

  @media only screen and (max-width: 992px) {
    padding: 10px 15px;
    font-size: 1.5rem;
  }
  @media only screen and (max-width: 540px) {
    //padding: 10px 1px;
    font-size: 1.2rem;
  }
`

// 카테고리 및 채팅 목록으로 재사용
export const Category = styled.div<CategoryType>`
  font-weight: 700;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  font-size: ${props => (props.$isChoice ? '1.2rem' : '1.1rem')};
  color: ${props => (props.$isChoice ? 'black' : 'gray')};
  background-color: ${props => (props.$isChoice ? '#D9D9D9' : 'none')};
  border-radius: ${props => (props.$isChoice ? '5px' : 'none')};
  &:hover {
    cursor: pointer;
    background-color: #d9d9d9;
    border-radius: 5px;
  }
  @media only screen and (max-width: 992px) {
    padding: 7px 5px;
    margin: 0 5px;
  }
  //@media only screen and (max-width: 768px) {
  //  padding: 5px;
  //}
  @media only screen and (max-width: 540px) {
    padding: 3px;
  }
`
export const Icon = styled.img`
  @media only screen and (max-width: 830px) {
    scale: 1.5;
    padding: 0.25rem 0.5rem;
  }
  @media only screen and (max-width: 500px) {
    scale: 1.2;
    padding: 0.25rem;
  }
  @media only screen and (max-width: 455px) {
    scale: 1;
    padding: 0;
  }
`

export const Text = styled.div`
  margin: 0 0 0 5px;

  @media only screen and (max-width: 992px) {
    margin: 0 0 0 2px;
  }
  @media only screen and (max-width: 830px) {
    //font-size: 0.8rem;
    display: none;
  }
`

export const ProfileImg = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #888888;
`
