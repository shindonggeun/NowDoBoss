import styled from 'styled-components'

export const Container = styled.div`
  padding: 3vh 10vw;
  @media only screen and (min-width: 768px) {
    padding: 3vh 12vw;
  }
  @media only screen and (min-width: 992px) {
    padding: 3vh 15vw;
  }
  @media only screen and (min-width: 1200px) {
    padding: 3vh 20vw;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3vh 0;
`
export const SubmitButton = styled.div<{ $isValid: boolean }>`
  pointer-events: ${props => (props.$isValid ? '' : 'none')};
  background-color: ${props => (props.$isValid ? '#236cff' : '#699bff')};
  color: #ffffff;
  font-weight: 500;
  border-radius: 5px;
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  width: 30px;
  cursor: pointer;
`
export const TitleInput = styled.textarea<{ $isActive?: boolean }>`
  font-weight: 600;
  font-size: 2rem;
  color: #626262;
  border: none;
  width: 100%;
  height: auto;
  resize: none;
  &:hover {
    cursor: text;
  }
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 500px) {
    font-size: 1.7rem;
  }
`
export const ContentCount = styled.div`
  display: flex;
  justify-content: right;
`

export const DropdownTitle = styled.div`
  margin: 10px 0;
  font-weight: 500;
`
export const Dropdown = styled.div`
  margin: 10px 0;
`
export const DropdownButton = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.15rem solid #d9d9d9;
  border-radius: 5px;
`
export const SelectedContent = styled.div`
  padding-left: 20px;
  color: #5f5f5f;
`
export const DropdownIcon = styled.img`
  padding-right: 20px;
  color: #5f5f5f;
`

export const DropdownBox = styled.div`
  //background-color: #e9e9e9;
  width: 100%;
  border: 0.15rem solid #d9d9d9;
  border-radius: 5px;
  padding: 5px 0;
`
export const DropdownContent = styled.div`
  width: 97%;
  height: 40px;
  padding-left: 3%;
  display: flex;
  align-items: center;
  color: #5f5f5f;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 5px;
  }
`
export const ContentInput = styled.textarea<{ $isActive?: boolean }>`
  font-size: 1.2rem;
  border: none;
  resize: none;
  width: 100%;
  height: 30vh;
  font-weight: 600;
  // color: ${props => (props.$isActive ? '#626262' : 'red')};

  //overflow-y: auto; // 내용이 넘칠 경우 스크롤바 생성
  &:hover {
    cursor: text;
  }
  &:focus {
    outline: none;
    border: none;
  }
`
// 이미지

export const Images = styled.div`
  display: flex;
  div {
    margin: 10px 10px 0 0;
  }
`
export const PreviewImage = styled.div`
  border-radius: 5px;
  width: 100px;
  height: 100px;
  border: 2px solid #bababa;
`
export const AddImage = styled.div`
  border: 2px solid #bababa;
  border-radius: 5px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bababa;
  font-weight: 600;
`
