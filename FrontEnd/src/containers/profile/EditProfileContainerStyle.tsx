import styled from 'styled-components'

interface ProfileImageContainerStylePropsType {
  image: string
}

export const Form = styled.form`
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 425px) {
    gap: 10px;
  }
`
export const InfoWrap = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const ProfileImageContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
`

export const ProfileImage = styled.div<ProfileImageContainerStylePropsType>`
  width: 100px;
  height: 100px;

  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  display: flex;
`

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;

  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 20px;
  }
`

export const EmailDiv = styled.div`
  display: flex;
  align-items: center;
`

export const Email = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #333;
`

export const Provider = styled.img`
  margin-left: 5px;
  width: 18px;
  height: 18px;
  border-radius: 100%;
`

export const Name = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
`

export const UpdateWrap = styled.div`
  margin-top: 15px;
  display: flex;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;

  @media (max-width: 992px) {
    width: 100%;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: start;
  }
`

export const UpdateTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-right: 15px;

  @media (max-width: 992px) {
    width: 20%;
    margin-right: 0;
  }

  @media (max-width: 576px) {
    width: 50%;
  }
`

export const NameInput = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #e1e4e6;
  border-radius: 4px;
  font-size: 1.1rem;
  color: #333;

  @media (max-width: 992px) {
    width: 80%;
  }

  @media (max-width: 576px) {
    width: 91%;
  }

  &:focus {
    border-color: #4a90e2; // 포커스 됐을 때 테두리 색상 변경
    outline: none; // 기본 아웃라인 제거
  }

  &:disabled {
    background-color: #f5f5f5; // 배경 색상 변경
    cursor: not-allowed; // 커서 변경
  }
`

export const SubmitButton = styled.button`
  margin: 5px 0 5px 5px;
  border: none;
  box-sizing: border-box;
  outline: none;
  align-items: center;
  background-color: #007bff;
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  justify-content: center;
  padding: 0 14px;
  height: 40px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 992px) {
    margin: 5px 0;
  }
`
