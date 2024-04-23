import styled from 'styled-components'

export const AnalysisLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 91vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Sidebar = styled.div`
  flex: 1;
  border-right: 1px solid #dce5f2;
  //background-color: lightyellow;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const SeparateLine = styled.div`
  background-color: #dce5f2;
  height: 0.2rem;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Content = styled.div`
  flex: 4;
  //background-color: blue;

  @media (max-width: 768px) {
    display: none;
  }
`
