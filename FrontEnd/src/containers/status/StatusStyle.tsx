import styled from 'styled-components'

export const AnalysisLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Sidebar = styled.div`
  flex: 1;
  background-color: lightyellow;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Content = styled.div`
  flex: 3;
  //background-color: blue;

  @media (max-width: 768px) {
    display: none;
  }
`
