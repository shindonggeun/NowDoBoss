import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding: 7% 13%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const LeftWrap = styled.div`
  flex: 1;
  width: 100%;
`

export const RightWrap = styled.div`
  flex: 3;
  width: 100%;
  margin-left: 15px;
  background-color: #d9d9d9;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
  }
`
