import styled from 'styled-components'
// 댓글 관련 style
export const Container = styled.div`
  padding: 3vh 0;
  @media only screen and (max-width: 820px) {
    padding: 3vh 5%;
  }
`

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
  height: auto;

  @media only screen and (max-width: 500px) {
    padding: 1rem;
  }
`

export const CommentMod = styled.div`
  padding: 1rem 0;
  margin: 0 0 2vh;
`
// 댓글 input창
export const CommentInput = styled.textarea<{ $isActive?: boolean }>`
  width: 80%;
  font-size: 1rem;
  border: none;
  color: ${props => (props.$isActive ? '#626262' : '#a9a9a9')};
  resize: none;
  border-radius: 5px;
  height: 100%;

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
export const CommentSubmit = styled.div<{ $isActive?: boolean }>`
  background-color: ${props => (props.$isActive ? '#4f75ff' : '#b5c4f8')};
  cursor: ${props => (props.$isActive ? 'pointer' : 'default')};
  pointer-events: ${props => (props.$isActive ? '' : 'none')};
  padding: 5px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 600;
  width: auto;

  @media only screen and (max-width: 700px) {
    font-size: 0.9rem;
    width: 8%;
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
    width: 10%;
  }
`
export const CommentTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 0 2vh;
`
export const CommentCard = styled.div`
  margin: 2rem 0;
`

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const CommentUser = styled.div``

export const ModDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  color: #646464;
`
export const ModButton = styled.div`
  padding: 0 5px;
  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`

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
