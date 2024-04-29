import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ResultContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
`

export const SidebarContainer = styled.div`
  flex: 1;

  @media (max-width: 992px) {
    display: none;
  }
`

export const MainContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
`
