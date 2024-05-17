import styled from 'styled-components'

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  // 너비 어떻게??
  //width: window.innerWidth;
  width: 100vw;
  height: calc(100vh - 68px);
  overflow: hidden;
  //background-color: #ededef;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Sidebar = styled.div`
  width: 380px;
  height: 475px;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);
  border: 1px solid #dce5f2;
  border-radius: 5px;
  margin: 10px 10px;
  background-color: white;

  @media (max-width: 768px) {
    display: none;
  }
`

export const EmptyContainer = styled.div`
  width: 400px;
`

export const Banner = styled.div`
  margin: 5px -10px;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`

export const Content = styled.div`
  flex: 1;
`
