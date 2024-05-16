import styled from 'styled-components'

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 5px 10px 5px 0;
  white-space: nowrap; /* 내용을 한 줄로 표시 */
  overflow: hidden; /* 내용이 너비를 넘어가면 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용을 ...으로 표시 */
  min-height: 30px;
  @media only screen and (max-width: 520px) {
    font-size: 1.2rem;
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #696d6e;
  margin: 5px 5px 5px 0;
`

export const Div = styled.div`
  display: flex;
  flex-direction: row;
`
