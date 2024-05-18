import styled from 'styled-components'

export const Container = styled.div`
  margin: 40px 0 0;
  min-height: 340px;
  width: 100%;

  @media only screen and (max-width: 550px) {
    margin: 0;
  }
`

export const Context = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.6rem;

  b {
    color: #ff0000;
  }

  @media only screen and (max-width: 456px) {
    font-size: 1.4rem;
  }
`
export const Sub = styled.div`
  font-weight: 500;

  @media only screen and (max-width: 456px) {
    font-size: 0.9rem;
  }
`

export const ArrowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
  margin: 10px 0;
`
export const ArrowButton = styled.img`
  cursor: pointer;
`

// 인기 채팅방 관련 style

export const Slick = styled.div``
export const SlickChild = styled.div`
  &:hover {
    margin: -10px 0 0 0;
    cursor: pointer;
  }
`
export const ChatCard = styled.div`
  border: 2px solid #d9d9d9;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
  //-3px -3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  width: auto;
  height: 200px;
  padding: 15px 30px;
  margin: 10px 4px;
  min-height: 155px;
  overflow: hidden;
`

export const CardTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 5px 0;
  white-space: nowrap; /* 내용을 한 줄로 표시 */
  overflow: hidden; /* 내용이 너비를 넘어가면 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용을 ...으로 표시 */
  min-height: 30px;
  min-width: 60px;
  @media only screen and (max-width: 520px) {
    font-size: 1.2rem;
  }
`

export const CardContent = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin: 5px 0;
  display: -webkit-box; /* 박스 형태로 표시 */
  -webkit-line-clamp: 2; /* 표시할 줄의 수를 2줄로 제한 */
  -webkit-box-orient: vertical; /* 내용을 세로 방향으로 정렬 */
  overflow: hidden; /* 넘치는 내용 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용을 ...으로 표시 */
  height: auto; /* 높이 자동 조절 */
  max-height: 48px; /* 최대 높이를 48px로 제한 */
  min-height: 40px;
  line-height: 24px; /* 줄 높이를 24px로 설정 */
`

export const CardCategory = styled.div`
  font-weight: 600;
  color: #696d6e;
  display: flex;
  margin: 5px 0 0 -5px;
`

export const Icon = styled.img`
  scale: 80%;
`

export const VisibleName = styled.div`
  margin-right: 2px;
  @media only screen and (max-width: 550px) {
    display: none;
  }
`

export const Div = styled.div``

export const CardSubContent = styled.div`
  font-weight: 500;
  color: #696d6e;
  margin: 5px 0;
`

// 커뮤니티 목록 style
export const ArticlesContainer = styled.div`
  margin: 20px 0 0;
`

export const ArticleContainer = styled.div`
  border-top: 0.08rem solid #e0e6ee;
  padding: 20px 30px;

  &:hover {
    background-color: #fbfbfb;
    cursor: pointer;
  }

  @media only screen and (max-width: 992px) {
    padding: 20px 10px;
  }
  @media only screen and (max-width: 456px) {
    padding: 20px 0;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //align-items: center;
`
export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
`
export const AvatarDiv = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
`
export const ProfileContent = styled.div``
export const Name = styled.div`
  margin: -1px 0 -5px;
`
export const Category = styled.div`
  scale: 0.9;
  font-weight: 600;
  color: #696d6e;
  display: flex;
  margin-left: -7px;
  width: auto;
`
export const Body = styled.div`
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const BodyContent = styled.div`
  width: 70%;
  margin-right: 5px;

  @media only screen and (max-width: 992px) {
    width: 70%;
    margin-right: 5px;
  }
  @media only screen and (max-width: 700px) {
    width: 65%;
  }
  @media only screen and (max-width: 550px) {
    width: 60%;
    margin-right: 30px;
  }
`
export const Img = styled.img`
  border: 1px solid #e0e6ee;
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;

  @media only screen and (max-width: 550px) {
    width: 30%;
  }
`
