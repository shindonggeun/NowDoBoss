import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const BookmarksDiv = styled.div`
  padding: 10px 0;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(102, 102, 102, 0.6); /* 호버 시 배경색 변경 */
  }

  @media (max-width: 768px) {
    padding: 5px 0;
  }
`

export const BookmarkText = styled.div`
  display: block;
  color: #ffffff;
  font-size: 1rem;
  text-align: center;

  &:hover {
    color: #cccccc; /* 호버 시 텍스트 색상 변경 */
  }

  @media (max-width: 425px) {
    font-size: 0.9rem;
  }
`
