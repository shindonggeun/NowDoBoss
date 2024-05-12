import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding: 5% 10%;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 576px) {
    padding: 2% 0;
  }
`

export const LeftWrap = styled.div`
  flex: 1;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
`

export const RightWrap = styled.div`
  flex: 3;
  width: 100%;
  padding: 12px 24px;
  box-sizing: border-box;
`
