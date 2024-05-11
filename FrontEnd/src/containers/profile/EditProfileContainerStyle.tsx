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
  justify-content: center;

  @media (max-width: 425px) {
    gap: 10px;
  }
`

export const ProfileImageContainer = styled.div<ProfileImageContainerStylePropsType>`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`
