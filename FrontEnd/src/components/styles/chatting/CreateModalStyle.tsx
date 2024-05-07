import styled from 'styled-components'

export const CreateModal = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
`

export const Title = styled.div`
  margin: 15px 0;
  font-weight: 500;
`

export const TitleInput = styled.textarea<{ $isActive?: boolean }>`
  font-weight: 500;
  font-size: 1rem;
  width: 95%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  resize: none;
  border: 0.15rem solid #d9d9d9;
  border-radius: 5px;
  padding: 10px 0 0 20px;
  color: #5f5f5f;
  &:hover {
    cursor: text;
  }
  &:focus {
    outline: none;
  }
`

export const ContentInput = styled.textarea<{ $isActive?: boolean }>`
  font-weight: 500;
  font-size: 1rem;
  width: 95%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  resize: none;
  border: 0.15rem solid #d9d9d9;
  border-radius: 5px;
  padding: 10px 0 0 20px;
  color: #5f5f5f;
  &:hover {
    cursor: text;
  }
  &:focus {
    outline: none;
  }
`

export const Dropdown = styled.div`
  position: relative; // 이 요소를 상대적 위치 컨테이너로 설정
  width: 100%; // 너비를 부모 요소에 맞춤
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
  background-color: white;
  width: 100%;
  border: 0.15rem solid #d9d9d9;

  border-radius: 5px;
  padding: 5px 0;
  position: absolute; // 절대 위치
  top: 100%; // 버튼의 바로 아래에 위치하도록
  left: 0; // 왼쪽 정렬
  z-index: 10; // 다른 요소들 위에 표시
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
export const SubmitButton = styled.button`
  color: #5f5f5f;
  font-family: inherit;
  display: inline-block;
  width: 48%;
  height: 2.6em;
  line-height: 2.5em;
  overflow: hidden;
  cursor: pointer;
  margin: 20px 0;
  font-size: 17px;
  z-index: 1;
  border: 2px solid #d9d9d9;
  border-radius: 6px;
  position: relative;
  background-color: white;
  font-weight: 500;

  &::before {
    position: absolute;
    content: '';
    background: #5f5f5f;
    width: 300px;
    height: 150px;
    z-index: -1;
    border-radius: 50%;
    top: 100%;
    left: 100%;
    transition: 0.3s all;
  }

  &:hover {
    color: white;

    &::before {
      top: -30px;
      left: -30px;
    }
  }
`

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`
