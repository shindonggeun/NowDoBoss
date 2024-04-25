import styled from 'styled-components'

// MainContent
export const Container = styled.div`
  padding: 3vh 10% 0;

  @media only screen and (min-width: 768px) {
    padding: 3vh 10%;
    border-right: 2px solid #d9d9d9;
  }
  @media only screen and (min-width: 992px) {
    padding: 3vh 12%;
    border-right: 2px solid #d9d9d9;
  }
  @media only screen and (min-width: 1200px) {
    padding: 3vh 15%;
    border-right: 2px solid #d9d9d9;
  }
`
export const BackButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0 2vh;
  cursor: pointer;
`
export const BackIcon = styled.img`
  scale: 0.8;
`
export const BackText = styled.div`
  font-weight: 500;
`
export const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
`
export const Category = styled.div`
  padding: 1vh 0;
`
export const TimeAndCounting = styled.div`
  padding: 0 0 2vh;
  font-weight: 600;
`
export const ContentImg = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #d9d9d9;
`
export const Content = styled.div`
  padding: 2vh 0;
`

// SubContent

export const SubContainer = styled.div`
  padding: 3vh 10%;

  @media only screen and (min-width: 1200px) {
    max-width: 400px;
  }
`
export const TabName = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 10px 0;
`

export const WriterProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
`

export const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

export const UserProfileImg = styled.div`
  background-color: #cacaca;
  width: 32px;
  height: 32px;
  border-radius: 100%;
`
export const UserName = styled.div`
  font-weight: 600;
  margin: 0 0.5rem;
`
export const ChatButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #236cff;
  color: white;
  border-radius: 10px;
  padding: 0 0.5rem;
  height: 34px;

  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #1a53ff;
  }
`
export const ChatImg = styled.img`
  margin-top: -4px;
`
export const SameCategoryList = styled.div`
  padding: 20px 0;
`
export const SubContent = styled.div`
  color: #707882;
  display: flex;
`
export const Icon = styled.img`
  padding: 0 2px;
`
export const AnotherCard = styled.div`
  padding: 5px 0;
`
export const SubCardContent = styled.div`
  margin: 5px 0 5px 40px;
`
export const SubCardTitle = styled.div`
  font-weight: 500;
`
export const GotoCard = styled.div`
  color: #707882;
  padding-top: 5px;

  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`
