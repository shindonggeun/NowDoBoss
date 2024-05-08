import styled from 'styled-components'

export const Container = styled.div`
  margin: 0 0 40px;
`
export const Context = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const LeftGrid = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
`
export const Modal = styled.div``
export const Title = styled.div`
  font-weight: 600;
  font-size: 1.7rem;
`
export const Sub = styled.div`
  font-weight: 500;

  @media only screen and (max-width: 576px) {
    padding: 15px 0 10px;
  }
`

// 생성하기 버튼
export const CreateButton = styled.div`
  background-color: #94a3b8;
  color: #f1f5f9;
  font-weight: 600;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  cursor: pointer;

  &:hover {
    background-color: #707d8d;
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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  //-3px -3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  width: auto;
  height: auto;
  padding: 20px 30px;
  margin: 10px 4px;
  min-height: 175px;
  overflow: hidden;
`

export const CategoryBadge = styled.div`
  background-color: #f1f5f9;
  color: #94a3b8;
  border-radius: 5px;
  font-weight: 600;
  font-size: 13px;
  width: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CardTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 5px 0;
  white-space: nowrap; /* 내용을 한 줄로 표시 */
  overflow: hidden; /* 내용이 너비를 넘어가면 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용을 ...으로 표시 */
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
  border-top: 2px solid #d9d9d9;
  padding: 30px;
  &:hover {
    background-color: #d9d9d9;
    cursor: pointer;
  }
`
