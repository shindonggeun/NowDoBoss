import styled from 'styled-components'

// MainContent
export const Container = styled.div`
  padding: 3vh 5vw;
  border-right: 2px solid #d9d9d9;
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
export const Time = styled.div`
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
// 댓글 관련 style

// 댓글 입력 Box
export const CommentBox = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //width: 80%;
  //font-size: 1rem;
  padding: 1.2rem;
  margin: 0 0 2vh;
`

// 댓글 input창
export const CommentInput = styled.textarea`
  width: 80%;
  font-size: 1rem;
  border: none;
  color: #a9a9a9;
  resize: none;
  border-radius: 5px;

  overflow-y: auto; // 내용이 넘칠 경우 스크롤바 생성
  &:hover {
    cursor: text;
  }
  &:focus {
    outline: none;
    border: none;
  }
`

// 댓글 작성 버튼
export const CommentSubmit = styled.div`
  background-color: #b5c4f8;
  padding: 5px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 600;
`
export const CommentTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 2vh;
`
export const CommentCard = styled.div`
  margin: 2rem 0;
`

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const CommentUser = styled.div``

export const CommentProfile = styled.div`
  border-radius: 100%;
  background-color: #acacac;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
`
export const CommentName = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  margin-top: -2px;
`
export const CommentTime = styled.div`
  color: #acacac;
  margin-top: -3px;
  margin-bottom: 5px;
`
export const CommentContent = styled.div`
  margin-left: 4rem;
`
