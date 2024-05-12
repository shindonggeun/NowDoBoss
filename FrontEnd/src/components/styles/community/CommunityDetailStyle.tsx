import styled from 'styled-components'

// MainContent
export const Container = styled.div`
  padding: 3vh 0;

  @media only screen and (max-width: 820px) {
    padding: 3vh 5%;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  position: relative;
`
export const MoreModal = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: flex-end;
`
export const More = styled.div`
  padding: 2px 3px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #f3f3f3;
  }
  &:active {
    background-color: #f3f3f3;
  }
`
export const ModalTriangle = styled.div`
  width: 15px;
  height: 15px;
  background-color: #f3f3f3;
  border-radius: 2px;
  transform: rotate(135deg);
  z-index: 0;
  margin: 0 6px 0 0;
`

export const ModalDiv = styled.div`
  border-radius: 5px;
  border: 2px solid #f3f3f3;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -10px 0 0 0;
  z-index: 2;
`

export const ModalContent = styled.div`
  padding: 5px 15px;
  cursor: pointer;
  z-index: 2;
  &:hover {
    font-weight: 600;
  }
  &:active {
    font-weight: 700;
  }
`
export const Title = styled.div`
  margin-top: 2vh;
  font-size: 2rem;
  font-weight: 600;
`
export const Category = styled.div`
  padding: 1vh 0;
  display: flex;
  font-weight: 500;
`
export const TimeAndCounting = styled.div`
  padding: 0 0 2vh;
  font-weight: 600;
`

export const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
`
export const CommunityImage = styled.img`
  max-height: 400px;
`

export const Content = styled.div`
  padding: 2vh 0;
`

// SubContent

export const SubContainer = styled.div`
  padding: 3vh 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: 825px) {
    flex-direction: column;
    justify-content: center;
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

export const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`
export const UserImgDefault = styled.div`
  background-color: #cacaca;
  width: 40px;
  height: 40px;
  border-radius: 100%;
`
export const UserName = styled.div`
  font-size: 20px;
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
  font-weight: 500;
`
export const Icon = styled.img`
  padding: 0 2px 0 6px;
  scale: 0.9;
`
export const AnotherCard = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
`
export const SubCardContent = styled.div`
  margin: 5px 0 5px 40px;
`
export const SubCardTitle = styled.div`
  font-weight: 500;
`
export const SubCardDetail = styled.div``
export const Div = styled.div``

export const GotoCard = styled.div`
  color: #707882;
  padding-top: 5px;

  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`
