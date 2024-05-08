import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 8vh;
`
export const Header = styled.div`
  //background-color: #d9d9d9;
  border-bottom: 2px solid #d9d9d9;
  height: 40px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const ChatInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 100%;
`
export const ChatImg = styled.div`
  background-color: #d9d9d9;
  border-radius: 100%;
  width: 36px;
  height: 36px;
`
export const ChatDiv = styled.div`
  padding-left: 10px;
`
export const ChatTitle = styled.div`
  margin-bottom: -5px;
  font-size: 1.3rem;
  font-weight: 600;
`
export const ChatMembers = styled.div`
  font-size: 0.8rem;
  margin-top: -5px;
`
export const More = styled.div`
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
`
