import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: calc(10vh - 20px);
`

export const Textarea = styled.textarea`
  font-size: 1.2rem;
  resize: none;
  width: calc(100% - 375px);
  height: calc(10vh - 20px);
  font-weight: 600;
  border: 2px solid #d9d9d9;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  margin: 20px;
  padding: 20px 60px 20px 20px;
  color: #626262;

  //overflow-y: auto; // 내용이 넘칠 경우 스크롤바 생성
  &:hover {
    cursor: text;
  }
  &:focus {
    outline: none;
    //border: none;
  }

  @media only screen and (max-width: 992px) {
    width: calc(100vw - 125px);
    //margin: 20px 10px -5px 10px;
  }
`

export const SubmitButton = styled.div<{ $isActive: boolean }>`
  z-index: 10;
  position: absolute;
  bottom: 32px;
  right: 34px;
  border-radius: 10px;
  background-color: #94abff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $isActive }) =>
    $isActive &&
    `
    &:hover {
      background-color: #7795ff;
      cursor: pointer;
    }
  `};

  @media only screen and (max-width: 992px) {
    bottom: 32px;
    right: 35px;
  }
`
export const SubmitImg = styled.img`
  scale: 1.25;
  margin-top: -5px;
`
