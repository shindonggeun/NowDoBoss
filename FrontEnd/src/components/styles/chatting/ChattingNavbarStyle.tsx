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
    width: calc(100vw - 40px);
    height: 8vh;
    padding: 5px 20px;
  }

  @media only screen and (max-width: 400px) {
    padding: 5px 10px;
    width: calc(100vw - 20px);
  }
`
export const Chatting = styled.div`
  margin: 0 0 10px 0;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`

export const Group = styled.div`
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
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
    border-color: #f8fafc;
    background-color: #fff;
  }
`

export const InputIcon = styled.svg`
  position: absolute;
  left: 1rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
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
  background-color: ${props => (props.$isChoice ? '#f2f2f2' : 'none')};
  border-radius: ${props => (props.$isChoice ? '5px' : 'none')};
  &:hover {
    cursor: pointer;
    background-color: #fcfcfc;
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

export const Div = styled.div``

export const Modal = styled.div``
