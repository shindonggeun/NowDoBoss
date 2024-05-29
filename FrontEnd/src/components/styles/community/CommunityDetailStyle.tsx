import styled from 'styled-components'

// MainContent
export const Container = styled.div`
  //padding-top: 2vh;

  @media only screen and (max-width: 820px) {
    padding: 3vh 5%;
  }

  @media only screen and (max-width: 550px) {
    padding: 2vh 5%;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  position: relative;
  margin: 10px 0;
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
  font-size: 2rem;
  font-weight: 600;
  @media only screen and (max-width: 550px) {
    //width: 50%;
  }
`
export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 550px) {
    flex-direction: column;
  }
`
export const Category = styled.div`
  //padding: 1vh 0;
  margin-top: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  width: 6rem;
  height: 1.6rem;
  border: 2px solid rgb(253, 149, 73);
  border-radius: 10px;
  //background-color: rgb(253, 149, 73);
  //color: #ffffff;

  @media only screen and (max-width: 550px) {
    margin: 5px;
  }
`
export const TimeAndCounting = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: end;
  align-items: center;
  @media only screen and (max-width: 550px) {
    justify-content: start;
  }
`

export const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 3vh 0;
`
export const CommunityImage = styled.img`
  width: 80%;
`

export const Content = styled.div`
  padding: 3vh 0;
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
  margin: 50px 0 0 0;

  @media only screen and (max-width: 550px) {
    margin-top: 20px;
  }
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
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0.5rem;
`
export const SameCategoryList = styled.div`
  padding: 20px 0;
`
export const SubContent = styled.div`
  color: #707882;
  display: flex;
  font-weight: 500;
  margin: -2px 0 0 5px;
  font-size: 0.9rem;

  @media only screen and (max-width: 992px) {
    flex-direction: row;
    align-items: center;
    margin: -2px 0 0 0;
  }
`
export const Icon = styled.img`
  //padding: 0 8px 0 0;
  scale: 0.8;
`
export const AnotherCard = styled.div`
  padding: 5px 10px;
  margin: 10px 0;
  border-bottom: 2px solid #f3f3f3;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`
export const SubCardContent = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const SubCardTitle = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  width: 70%;
  -webkit-box-orient: vertical; /* 내용을 세로 방향으로 정렬 */
  overflow: hidden; /* 넘치는 내용 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용을 ...으로 표시 */

  @media only screen and (max-width: 600px) {
    width: 60%;
    font-size: 1.2rem;
  }
  @media only screen and (max-width: 450px) {
    width: 40%;
    font-size: 1.2rem;
  }
`
export const Div = styled.div`
  margin-left: 5px;
  align-items: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 992px) {
    scale: 1.1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`

export const GotoCard = styled.div`
  color: #707882;
  padding-top: 5px;

  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`
