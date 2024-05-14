import styled from 'styled-components'

interface CategoryType {
  $isChoice: boolean
}

export const Container = styled.div`
  //  왼쪽에 띄울 크기
  width: 160px;
  position: absolute;
  height: calc(100vh - 65px);
  padding-top: 30px;

  @media only screen and (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100vw);
    position: fixed;
    left: 0;
    height: 8vh;
    padding: 5px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #dee4ec;
  }

  @media only screen and (max-width: 400px) {
    padding: 5px 10px;
    width: 98vw;
  }
`
export const Community = styled.div`
  margin: 0 0 10px 0;
  width: 200px;
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

export const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  padding: 10px 0 5px;

  @media only screen and (max-width: 992px) {
    padding: 10px 15px;
    font-size: 1.5rem;
  }
  @media only screen and (max-width: 540px) {
    //padding: 10px 1px;
    font-size: 1.2rem;
  }
`

export const Sub = styled.div`
  padding-bottom: 10px;
  font-size: 1.1rem;
  color: #555555;
  font-weight: 500;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`
export const CreateButton = styled.div`
  background-color: #b1c3ff;
  cursor: pointer;
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
  color: #ffffff;
  border-radius: 5px;
  margin: 15px 0;

  b {
    font-weight: 500;
    font-size: 0.9rem;
    margin: 5px 5px 0 0;
  }

  &:hover {
    background-color: #94a9f3;
  }

  @media only screen and (max-width: 992px) {
    display: none;
  }
`

export const CreateIcon = styled.img`
  display: none;

  @media only screen and (max-width: 992px) {
    display: flex;
    cursor: pointer;
    scale: 1.5;
    padding: 0.25rem 0.5rem;
  }

  @media only screen and (max-width: 500px) {
    scale: 1.2;
    padding: 0.25rem;
  }
  @media only screen and (max-width: 455px) {
    scale: 1;
  }
`

// 카테고리 목록으로 재사용
export const Category = styled.div<CategoryType>`
  font-weight: 700;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${props => (props.$isChoice ? '1.2rem' : '1.1rem')};
  color: ${props => (props.$isChoice ? 'black' : 'gray')};
  background-color: ${props => (props.$isChoice ? '#f5f5f5' : 'none')};
  border-radius: ${props => (props.$isChoice ? '5px' : 'none')};

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
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
